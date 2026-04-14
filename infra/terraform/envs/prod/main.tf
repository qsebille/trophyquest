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
  callback_urls = var.callback_urls
  logout_urls   = var.logout_urls
}
