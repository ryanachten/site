// Sync project README's data from GitHub repositories
// Warning - will overwrite existing content data!

const fs = require('fs')
const fetch = require('node-fetch')
const yaml = require('js-yaml')

const GITHUB_URL = 'https://raw.githubusercontent.com/ryanachten'
const CONTENT_DIR = 'content/projects';

let projects;
try {
  const yamlFile = yaml.load(fs.readFileSync(`./${CONTENT_DIR}/index.yml`, 'utf8'))
  projects = yamlFile.projects;
} catch (error) {
  console.error("Error reading projects yaml file", error);
}

projects.forEach(async ({ name, branch = 'main' }) => {
  const projectName = name.toLowerCase();
  try {
    const res = await fetch(`${GITHUB_URL}/${projectName}/${branch}/README.md`)
    if (res.ok && res.body !== null) {
      const writeStream = fs.createWriteStream(
        `${CONTENT_DIR}/${projectName}.md`
      )
      const body = res.body
      await new Promise((resolve, reject) => {
        body.pipe(writeStream)
        body.on('error', reject)
        writeStream.on('finish', resolve)
      })
    } else {
      console.error(`Error retrieving ${name}`, res.status)
    }
  } catch (error) {
    console.error(`Error retrieving ${name}`, error)
  }
})
