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

variable "root_domain_name" {
  type = string
}

variable "additional_domain_names" {
  type    = list(string)
  default = []
}

variable "backend_origin_domain_name" {
  type = string
}

variable "backend_origin_http_port" {
  type    = number
  default = 8080
}
