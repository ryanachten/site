# Agent instructions
- Read the [README](./README.md) for context about how this application is structured and built
- Infrastructure changes are managed using infrastructure-as-code via Terraform. See here for [instructions](./infra/README.md)
- Content is synchronised from README files in git projects in GitHub. See here for [instructions](./sync/README.md). 

## Common guidelines
- All changes must work for local development and static generation
- Do not modify any markdown files in the `/content/` folder - these are either generated via GitHub or via user