#### SECRETS - Replaced by process environment variables ####
variable "aws_access_key" {
  description = "Access key for authenticating with AWS"
  type        = string
  sensitive   = true
}

variable "aws_secret_access_key" {
  description = "Secret access key for authenticating with AWS"
  type        = string
  sensitive   = true
}

variable "github_access_token" {
  description = "Personal access token to allow AWS to access GitHub repository"
  type        = string
  sensitive   = true
}
