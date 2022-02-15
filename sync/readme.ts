import * as fs from 'fs'
import * as yaml from 'js-yaml'
import fetch from 'node-fetch'

import { Project } from '../constants/interfaces'
import { CONTENT_DIR } from './constants'

const GITHUB_URL = 'https://raw.githubusercontent.com/ryanachten'

const getGithubUrl = (
  project: string,
  branch: string,
  path: string,
  markdown = false
) =>
  `https://github.com/ryanachten/${project}/blob/${branch}/${path}${
    markdown ? '' : '?raw=true'
  }`

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
    const extension = path.substring(path.length - 3, path.length)
    const isMarkdown = extension === '.md'
    const newPath = getGithubUrl(projectName, branch, path, isMarkdown)
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

export const downloadReadMe = async (project: Project) => {
  const { name, repo, branch = 'main' } = project
  const projectName = repo ?? name.toLowerCase()
  try {
    const res = await fetch(`${GITHUB_URL}/${projectName}/${branch}/README.md`)
    if (res.ok && res.body !== null) {
      // File data is provided in buffer chunks
      // - we need to wait for all chunks to be loaded before postprocessing
      const body = res.body
      let rawReadMe = ''
      body.on('data', (chunk: Buffer) => {
        const data = chunk.toString()
        rawReadMe += data
      })

      body.on('finish', () => {
        let updatedReadMe = cleanReadMe(rawReadMe, projectName, branch)
        updatedReadMe = addMetadataHeader(updatedReadMe, project)
        // Once we're done postprocessing, we can write the file to disk
        fs.writeFile(
          `${CONTENT_DIR}/${projectName}.md`,
          updatedReadMe,
          (error) => {
            if (error) {
              console.error(`Error writing file for ${projectName}`, error)
            } else {
              console.log('Completed writing', projectName, '\n')
              console.log('******\n')
            }
          }
        )
      })
    } else {
      console.error(`Error retrieving ${name}`, res.status)
    }
  } catch (error) {
    console.error(`Error retrieving ${name}`, error)
  }
}
