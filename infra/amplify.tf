resource "aws_amplify_app" "ryanachten" {
  name         = "ryanachten"
  repository   = "https://github.com/ryanachten/site"
  access_token = var.github_access_token

  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - yarn install --frozen-lockfile --ignore-optional --network-timeout 600000
        build:
          commands:
            - yarn run generate
      artifacts:
        baseDirectory: .output/public
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
          - .nuxt/**/*
  EOT
}

# Configures a build setup pointing at the main branch
resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.ryanachten.id
  branch_name = "main"
}

resource "aws_amplify_domain_association" "ryanachten" {
  app_id      = aws_amplify_app.ryanachten.id
  domain_name = "ryanachten.com"

  # https://ryanachten.com
  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = ""
  }

  # https://www.ryanachten.com
  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "www"
  }
}
