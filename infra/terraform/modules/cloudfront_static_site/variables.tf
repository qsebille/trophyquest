variable "project_name" {
  type = string
}

variable "bucket_name" {
  type = string
}

variable "bucket_arn" {
  type = string
}

variable "bucket_regional_domain_name" {
  type = string
}

variable "backend_origin_domain_name" {
  type = string
}

variable "backend_origin_http_port" {
  type    = number
  default = 8080
}
