aws_region           = "eu-west-3"
project_name         = "trophyquest"
frontend_bucket_name = "trophyquest-webapp"

environment   = "prod"
domain_prefix = "trophyquest-prod-auth"

callback_urls = [
  "http://localhost:4200/auth/callback",
]

logout_urls = [
  "http://localhost:4200",
]
