variable "aws_region" {
  type = string
}

variable "project_name" {
  type = string
}

variable "frontend_bucket_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "domain_prefix" {
  type = string
}

variable "callback_urls" {
  type = list(string)
}

variable "logout_urls" {
  type = list(string)
}
