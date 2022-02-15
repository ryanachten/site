import { Octokit } from '@octokit/core'
import { GITHUB_OWNER } from './constants'

const octokit = new Octokit({
  auth: process.env.TF_VAR_github_access_token,
})

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

export const getProjectTopics = async (repo: string): Promise<string[]> => {
  try {
    const res = await octokit.request('GET /repos/{owner}/{repo}/topics', {
      owner: GITHUB_OWNER,
      repo,
    } as any) // GitHub type requires media type which seems like a type error
    if (res.status === 200) {
      return res.data.names
    }
  } catch (error) {
    console.log('Error fetching topics for project', repo, error)
  }
  return []
}
