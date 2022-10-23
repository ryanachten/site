terraform {
  backend "s3" {
    bucket  = "ryanachten-site-tf-state"
    key     = "terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.30.0"
    }
  }
}

provider "aws" {
  region     = "us-east-1"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_access_key

  default_tags {
    tags = {
      Project = "site"
    }
  }
}
