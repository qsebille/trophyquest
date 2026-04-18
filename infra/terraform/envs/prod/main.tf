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

module "static_frontend_s3" {
  source = "../../modules/static_frontend_s3"

  bucket_name  = var.frontend_bucket_name
  project_name = var.project_name
}

module "cognito" {
  source = "../../modules/cognito"

  project_name  = var.project_name
  environment   = var.environment
  aws_region    = var.aws_region
  domain_prefix = var.domain_prefix

  callback_urls = [
    "http://localhost:4200/auth/callback",
    "https://${module.frontend_cdn.domain_name}/auth/callback"
  ]

  logout_urls = [
    "http://localhost:4200",
    "https://${module.frontend_cdn.domain_name}"
  ]
}

module "frontend_cdn" {
  source = "../../modules/cloudfront_static_site"

  project_name                = var.project_name
  bucket_name                 = module.static_frontend_s3.bucket_name
  bucket_arn                  = module.static_frontend_s3.bucket_arn
  bucket_regional_domain_name = module.static_frontend_s3.bucket_regional_domain_name

  backend_origin_domain_name = var.backend_origin_domain_name
  backend_origin_http_port   = var.backend_origin_http_port
}
