# site - sync
Sync is used to sync README content, repository metadata and imagery from GitHub and other sources to be used by the site.

## Usage
Sync is built outside of the Nuxt build pipeline.

Sync also relies on the `TF_VAR_github_access_token` environment variable used by the infrastructure pipeline, otherwise GitHub API rate limits will be reached and sync won't complete. Be sure to set this before proceeding with sync:
```bash
$env:TF_VAR_github_access_token="key created in GitHub"

```
After this has been set, we can proceed with sync development and usage
```bash
# install dependencies
$ yarn install

# compile TypeScript source files
$ yarn build:sync

# execute content sync
$ yarn sync
```