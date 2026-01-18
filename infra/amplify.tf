resource "aws_amplify_app" "ryanachten" {
  name         = "ryanachten"
  repository   = "https://github.com/ryanachten/site"
  access_token = var.github_access_token
  platform     = "WEB_COMPUTE"

  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - node --version
            - yarn --version
            - yarn config set registry https://registry.npmjs.org/
            - yarn install --frozen-lockfile
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
