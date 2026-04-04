output "frontend_bucket_name" {
  value = module.static_frontend_s3.bucket_name
}

output "frontend_bucket_arn" {
  value = module.static_frontend_s3.bucket_arn
}

output "frontend_website_endpoint" {
  value = module.static_frontend_s3.website_endpoint
}
