terraform {
  required_version = ">= 1.8.0"

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
  source = "../modules/static_frontend_s3"

  bucket_name = var.frontend_bucket_name
  project_name = var.project_name
}