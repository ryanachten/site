resource "aws_amplify_app" "ryanachten" {
  name         = "ryanachten"
  repository   = "https://github.com/ryanachten/site"
  access_token = var.github_access_token

  build_spec = <<-EOT
    version: 0.1
    frontend:
      phases:
        preBuild:
          commands:
            - yarn install
        build:
          commands:
            - yarn run generate
      artifacts:
        baseDirectory: dist
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
  EOT
}

# Configures a build setup pointing at the main branch
resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.ryanachten.id
  branch_name = "main"
}
