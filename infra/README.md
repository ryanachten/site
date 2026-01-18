# site - infrastructure

The following Terraform scaffolds a Amplify app for hosting the statically generated Nuxt website.

**Prerequisites**
- Install Terraform (using `v1.1.4` at the time of writing)
- Set environment variables:

```bash
$env:TF_VAR_aws_access_key="key created in AWS"
$env:TF_VAR_aws_secret_access_key="secret key created in AWS"
$env:TF_VAR_github_access_token="key created in GitHub"
```

Once these have been set, we can proceed with infrastructure changes
```bash
# initialise Terraform backend
$ terraform init

# run Terraform plan to ensure resource changes are as expected
$ terraform plan

# execute Terraform changes against remote infrastructure
$ terraform apply
```
