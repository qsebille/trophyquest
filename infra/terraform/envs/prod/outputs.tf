output "frontend_bucket_name" {
  value = module.static_frontend_s3.bucket_name
}

output "frontend_bucket_arn" {
  value = module.static_frontend_s3.bucket_arn
}

output "frontend_website_endpoint" {
  value = module.static_frontend_s3.website_endpoint
}

output "cognito_user_pool_id" {
  value = module.cognito.user_pool_id
}

output "cognito_client_id" {
  value = module.cognito.client_id
}

output "cognito_domain" {
  value = module.cognito.cognito_domain
}

output "cognito_issuer_url" {
  value = module.cognito.issuer_url
}
