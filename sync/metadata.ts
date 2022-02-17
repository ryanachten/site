import { Octokit } from '@octokit/core'
import { GITHUB_OWNER } from './constants'

const octokit = new Octokit({
  auth: process.env.TF_VAR_github_access_token,
})

export const getProjectRepo = async (repo: string) => {
  try {
    const res = await octokit.request('GET /repos/{owner}/{repo}', {
      owner: GITHUB_OWNER,
      repo,
    })
    if (res.status === 200) {
      const { homepage, archived, topics, html_url: url } = res.data
      return { homepage, archived, topics, url }
    }
  } catch (error) {
    console.log('Error fetching project repo', repo, error)
  }
}

export const getProjectLanguages = async (repo: string): Promise<string[]> => {
  try {
    const res = await octokit.request('GET /repos/{owner}/{repo}/languages', {
      owner: GITHUB_OWNER,
      repo,
    })
    if (res.status === 200) {
      return Object.keys(res.data)
    }
  } catch (error) {
    console.log('Error fetching languages for project', repo, error)
  }
  return []
}
