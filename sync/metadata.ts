import { Octokit } from '@octokit/core'

const octokit = new Octokit({
  auth: process.env.TF_VAR_github_access_token,
})

export const getProjectLanguages = async (repo: string) => {
  try {
    const res = await octokit.request('GET /repos/{owner}/{repo}/languages', {
      owner: 'ryanachten',
      repo,
    })
    if (res.status === 200) {
      return Object.keys(res.data)
    }
  } catch (error) {
    console.log('Error fetching languages for project', repo, error)
  }
}
