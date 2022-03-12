import * as fs from 'fs'
import * as yaml from 'js-yaml'

import { Project } from '../constants/interfaces'
import { PROJECT_DIR, GITHUB_OWNER, octokit } from './constants'

const getGithubUrl = (project: string, branch: string, path: string) =>
  `https://github.com/ryanachten/${project}/blob/${branch}/${path}`

const cleanReadMe = (
  rawReadMe: string,
  projectName: string,
  branch: string
) => {
  // Replace all local file instances in the markdown,
  // and replace them with the versions hosted remotely
  // regex looks for md links and files like: ](./abc.ext
  const localFileRegExp = /\]\(\.\/[\w/-]+.[\w]+/g
  let updatedReadMe = rawReadMe.replaceAll(localFileRegExp, (str) => {
    const path = str.replace('](./', '')
    // const extension = path.substring(path.length - 3, path.length)
    // const isMarkdown = extension === '.md'
    const newPath = getGithubUrl(projectName, branch, path)
    return `${']('}${newPath}`
  })

  // Replace images sitting in blob with raw to avoid CORS issues
  updatedReadMe = updatedReadMe.replaceAll('/blob/', '/raw/')
  return updatedReadMe
}

// Add "Front Matter" metadata block for filtering and searching
const addMetadataHeader = (readMe: string, project: Project) => {
  let header = '---\n'
  const headerYaml = yaml.dump(project)
  header += headerYaml
  header += '---\n'
  header += readMe
  return header
}

export const downloadReadMe = async (project: Project, branch: string) => {
  try {
    const res = await octokit.request('GET /repos/{owner}/{repo}/readme', {
      owner: GITHUB_OWNER,
      repo: project.name,
    })
    const rawReadMe = Buffer.from(res.data.content, 'base64').toString()
    let updatedReadMe = cleanReadMe(rawReadMe, project.name, branch)
    updatedReadMe = addMetadataHeader(updatedReadMe, project)

    // Once we're done postprocessing, we can write the file to disk
    fs.writeFile(
      `${PROJECT_DIR}/${project.name.toLowerCase()}.md`,
      updatedReadMe,
      (error) => {
        if (error) {
          console.error(`Error writing file for ${project.name}`, error)
        } else {
          console.log('Completed writing', project.name, '\n')
          console.log('******\n')
        }
      }
    )
  } catch (error) {
    console.error(`Error retrieving ${project.name}`, error)
  }
}
