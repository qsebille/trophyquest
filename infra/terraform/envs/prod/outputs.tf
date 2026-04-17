output "frontend_bucket_name" {
  value = module.static_frontend_s3.bucket_name
}

output "frontend_bucket_arn" {
  value = module.static_frontend_s3.bucket_arn
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

output "cloudfront_distribution_id" {
  value = module.frontend_cdn.distribution_id
}

output "cloudfront_domain_name" {
  value = module.frontend_cdn.domain_name
}
