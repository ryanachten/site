import { Octokit } from '@octokit/core'

export const GITHUB_OWNER = 'ryanachten'
export const CONTENT_DIR = 'content/projects'

export const octokit = new Octokit({
  auth: process.env.TF_VAR_github_access_token,
})
