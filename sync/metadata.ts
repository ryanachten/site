import { GITHUB_OWNER, octokit } from './constants'

export const getProjectRepo = async (repo: string) => {
  try {
    const res = await octokit.request('GET /repos/{owner}/{repo}', {
      owner: GITHUB_OWNER,
      repo,
    })
    if (res.status === 200) {
      const {
        homepage,
        archived,
        topics,
        html_url: url,
        default_branch: branch,
        description,
      } = res.data
      return { homepage, archived, topics, url, branch, description }
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
