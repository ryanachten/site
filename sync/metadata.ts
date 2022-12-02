import { GITHUB_OWNER, octokit } from './constants'

export const getProjectRepo = async (repo: string) => {
  try {
    const res = await octokit.request('GET /repos/{owner}/{repo}', {
      owner: GITHUB_OWNER,
      repo,
    })
    if (res.status === 200) {
      const {
        archived,
        topics,
        html_url: url,
        default_branch: branch,
        description,
      } = res.data

      // TODO: remove one we're migrated off Heroku
      let homepage = res.data.homepage
      if (homepage?.includes('herokuapp')) homepage = null

      return { homepage, archived, topics, url, branch, description }
    }
  } catch (error) {
    console.error('Error fetching project repo', repo, error)
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
    console.error('Error fetching languages for project', repo, error)
  }
  return []
}
