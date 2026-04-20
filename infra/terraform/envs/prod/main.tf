terraform {
  required_version = ">= 1.8.0"

  backend "s3" {
    bucket       = "trophyquest-terraform-state"
    key          = "prod/terraform.tfstate"
    region       = "eu-west-3"
    use_lockfile = true
    encrypt      = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

locals {
  all_domain_names = concat([var.root_domain_name], var.additional_domain_names)

  callback_urls = concat(
    ["http://localhost:4200/auth/callback"],
    [for domain in local.all_domain_names : "https://${domain}/auth/callback"]
  )

  logout_urls = concat(
    ["http://localhost:4200"],
    [for domain in local.all_domain_names : "https://${domain}"]
  )
}

data "aws_route53_zone" "main" {
  name         = var.root_domain_name
  private_zone = false
}

resource "aws_acm_certificate" "frontend" {
  provider                  = aws.us_east_1
  domain_name               = var.root_domain_name
  subject_alternative_names = var.additional_domain_names
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "frontend_certificate_validation" {
  for_each = {
    for dvo in aws_acm_certificate.frontend.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  zone_id         = data.aws_route53_zone.main.zone_id
  name            = each.value.name
  type            = each.value.type
  ttl             = 60
  records         = [each.value.record]
}

resource "aws_acm_certificate_validation" "frontend" {
  provider        = aws.us_east_1
  certificate_arn = aws_acm_certificate.frontend.arn
  validation_record_fqdns = [
    for record in aws_route53_record.frontend_certificate_validation : record.fqdn
  ]
}

module "static_frontend_s3" {
  source = "../../modules/static_frontend_s3"

  bucket_name  = var.frontend_bucket_name
  project_name = var.project_name
}

module "frontend_cdn" {
  source = "../../modules/cloudfront_static_site"

  project_name                = var.project_name
  bucket_name                 = module.static_frontend_s3.bucket_name
  bucket_arn                  = module.static_frontend_s3.bucket_arn
  bucket_regional_domain_name = module.static_frontend_s3.bucket_regional_domain_name
  backend_origin_domain_name  = var.backend_origin_domain_name
  backend_origin_http_port    = var.backend_origin_http_port
  aliases                     = local.all_domain_names
  acm_certificate_arn         = aws_acm_certificate_validation.frontend.certificate_arn
}

module "cognito" {
  source = "../../modules/cognito"

  project_name  = var.project_name
  environment   = var.environment
  aws_region    = var.aws_region
  domain_prefix = var.domain_prefix
  callback_urls = local.callback_urls
  logout_urls   = local.logout_urls
}

resource "aws_route53_record" "frontend_ipv4" {
  for_each = toset(local.all_domain_names)

  zone_id = data.aws_route53_zone.main.zone_id
  name    = each.value
  type    = "A"

  alias {
    name                   = module.frontend_cdn.domain_name
    zone_id                = module.frontend_cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "frontend_ipv6" {
  for_each = toset(local.all_domain_names)

  zone_id = data.aws_route53_zone.main.zone_id
  name    = each.value
  type    = "AAAA"

  alias {
    name                   = module.frontend_cdn.domain_name
    zone_id                = module.frontend_cdn.hosted_zone_id
    evaluate_target_health = false
  }
}
