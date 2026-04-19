resource "aws_amplify_app" "ryanachten" {
  name         = "ryanachten"
  repository   = "https://github.com/ryanachten/site"
  access_token = var.github_access_token
  platform     = "WEB"

  # Pass through Nuxt payload files (must precede the clean URL rewrite)
  custom_rule {
    source = "/projects/_payload.json"
    target = "/projects/_payload.json"
    status = "200"
  }

  # Rewrite project subpages to their index.html
  custom_rule {
    source = "/projects/<name>"
    target = "/projects/<name>/index.html"
    status = "200"
  }

  custom_rule {
    source = "/projects"
    target = "/projects/index.html"
    status = "200"
  }

  custom_rule {
    source = "/projects/"
    target = "/projects/index.html"
    status = "200"
  }

  custom_rule {
    source = "/cv"
    target = "/cv/index.html"
    status = "200"
  }

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
