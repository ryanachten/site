// Sync project README's data from GitHub repositories
// Warning - will overwrite existing content data!

const fs = require('fs')
const fetch = require('node-fetch')
const yaml = require('js-yaml')
const { Octokit } = require('@octokit/core')

const octokit = new Octokit({
  auth: process.env.TF_VAR_github_access_token,
})

const GITHUB_URL = 'https://raw.githubusercontent.com/ryanachten'
const CONTENT_DIR = 'content/projects'

let projects
let yamlFile
try {
  yamlFile = yaml.load(fs.readFileSync(`./${CONTENT_DIR}/index.yml`, 'utf8'))
  projects = yamlFile.projects
} catch (error) {
  console.error('Error reading projects yaml file', error)
}

const cleanReadMe = (rawReadMe, projectName, branch) => {
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
const addMetadataHeader = (readMe, project) => {
  let header = '---\n'
  const headerYaml = yaml.dump(project)
  header += headerYaml
  header += '---\n'
  header += readMe
  return header
}

// projects.forEach(async (project) => {
//   const { name, repo, branch = 'main' } = project
const getGithubUrl = (project, branch, path, markdown = false) =>
  `https://github.com/ryanachten/${project}/blob/${branch}/${path}${
    markdown ? '' : '?raw=true'
  }`

const downloadReadMe = async (project) => {
  const { name, repo, branch = 'main' } = project
  const projectName = repo ?? name.toLowerCase()
  try {
    const res = await fetch(`${GITHUB_URL}/${projectName}/${branch}/README.md`)
    if (res.ok && res.body !== null) {
      // File data is provided in buffer chunks
      // - we need to wait for all chunks to be loaded before postprocessing
      const body = res.body
      let rawReadMe = ''
      body.on('data', (chunk) => {
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

const getProjectLanguages = async (repo) => {
  try {
    const res = await octokit.request('GET /repos/{owner}/{repo}/languages', {
      owner: 'ryanachten',
      repo,
    })
    if (res.status === 200) {
      const index = projects.findIndex((project) => project.name === repo)
      projects[index].languages = Object.keys(res.data)
    }
  } catch (error) {
    console.log('Error fetching languages for project', repo, error)
  }
}

projects.forEach(async (project) => {
  await getProjectLanguages(project.name)
  await downloadReadMe(project)

  // write data back to file with update project information
  const updatedYaml = yaml.dump({ ...yamlFile, projects })
  fs.writeFileSync(`./${CONTENT_DIR}/index.yml`, updatedYaml)
})
