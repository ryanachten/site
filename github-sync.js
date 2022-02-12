// Sync project README's data from GitHub repositories
// Warning - will overwrite existing content data!

const fs = require('fs')
const fetch = require('node-fetch')
const yaml = require('js-yaml')

const GITHUB_URL = 'https://raw.githubusercontent.com/ryanachten'
const CONTENT_DIR = 'content/projects'

const getGithubUrl = (project, branch, path, markdown = false) =>
  `https://github.com/ryanachten/${project}/blob/${branch}/${path}${
    markdown ? '' : '?raw=true'
  }`

let projects
try {
  const yamlFile = yaml.load(
    fs.readFileSync(`./${CONTENT_DIR}/index.yml`, 'utf8')
  )
  projects = yamlFile.projects
} catch (error) {
  console.error('Error reading projects yaml file', error)
}

projects.forEach(async ({ name, repo, branch = 'main' }) => {
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
        // Replace all local file instances in the markdown,
        // and replace them with the versions hosted remotely
        // regex looks for md links and files like: ](./abc.ext
        const localFileRegExp = /\]\(\.\/[\w\/]+.[\w]+/g
        let updatedReadMe = rawReadMe.replaceAll(localFileRegExp, (str) => {
          const path = str.replace('](./', '')
          const extension = path.substring(path.length - 3, path.length)
          const isMarkdown = extension === '.md'
          const newPath = getGithubUrl(projectName, branch, path, isMarkdown)
          return `${']('}${newPath}`
        })

        // Replace images sitting in blob with raw to avoid CORS issues
        updatedReadMe = updatedReadMe.replaceAll('/blob/', '/raw/')

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
})
