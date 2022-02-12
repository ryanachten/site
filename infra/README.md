# site - infrastructure

The following Terraform scaffolds a Amplify app for hosting the statically generated Nuxt website.

- Install Terraform (using `v1.1.4` at the time of writing)
- Set environment variables:

```
$env:TF_VAR_aws_access_key="key created in AWS"
$env:TF_VAR_aws_secret_access_key="secret key created in AWS"
$env:TF_VAR_github_access_token="key created in GitHub"
```

- Initialise TF: `terraform init`
- Run TF plan to ensure resources to be created are correct: `terraform plan`
- Execute TF plan to create resources: `terraform apply`
