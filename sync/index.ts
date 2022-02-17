import * as fs from 'fs'
import * as yaml from 'js-yaml'

import { Project, ProjectIndex } from '../constants/interfaces'
import { CONTENT_DIR } from './constants'
import { getProjectLanguages, getProjectRepo } from './metadata'
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

projects.forEach(async (project, index) => {
  // TODO: these should probably be consolidated into a single getMetadata function
  const repoMetadata = await getProjectRepo(project.name)
  const languages = await getProjectLanguages(project.name)

  if (repoMetadata) {
    const { homepage, topics = [], archived, url } = repoMetadata
    // Update project with metadata from GitHub
    projects[index] = {
      ...projects[index],
      archived,
      languages,
      homepage: homepage ?? undefined,
      githubUrl: url,
      tools: topics,
    }
  }

  await downloadReadMe(project)

  // // write data back to file with update project information
  const updatedYaml = yaml.dump({ ...yamlFile, projects })
  fs.writeFileSync(`./${CONTENT_DIR}/index.yml`, updatedYaml)
})
