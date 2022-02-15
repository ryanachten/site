import * as fs from 'fs'
import * as yaml from 'js-yaml'

import { Project, ProjectIndex } from '../constants/interfaces'
import { CONTENT_DIR } from './constants'
import { getProjectLanguages } from './metadata'
import { downloadReadMe } from './readme'

let projects: Project[] = []
let yamlFile: ProjectIndex
try {
  yamlFile = yaml.load(
    fs.readFileSync(`./${CONTENT_DIR}/index.yml`, 'utf8')
  ) as ProjectIndex
  projects = yamlFile.projects
} catch (error) {
  console.error('Error reading projects yaml file', error)
}

projects.forEach(async (project) => {
  await getProjectLanguages(project.name)
  await downloadReadMe(project)

  // // write data back to file with update project information
  const updatedYaml = yaml.dump({ ...yamlFile, projects })
  fs.writeFileSync(`./${CONTENT_DIR}/index.yml`, updatedYaml)
})
