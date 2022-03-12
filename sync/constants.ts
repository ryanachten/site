import { Octokit } from '@octokit/core'

export const GITHUB_OWNER = 'ryanachten'
export const IMAGE_DIR = 'static/hero-images'
export const PROJECT_DIR = 'content/projects'

export const octokit = new Octokit({
  auth: process.env.TF_VAR_github_access_token,
})
