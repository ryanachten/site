/* eslint-disable no-console */
import * as fs from 'fs'
import * as yaml from 'js-yaml'

import type { Project, ProjectIndex } from '../constants/interfaces'
import { PROJECT_DIR } from './constants'
import { cleanImageDirectory, downloadHeroImage } from './images'
import { getProjectLanguages, getProjectRepo } from './metadata'
import { downloadReadMe } from './readme'

let projects: Project[] = []
let yamlFile: ProjectIndex
try {
  yamlFile = yaml.load(
    fs.readFileSync(`./${PROJECT_DIR}/index.yml`, 'utf8')
  ) as ProjectIndex
  projects = yamlFile.projects
} catch (error) {
  console.error('Error reading projects yaml file', error)
}

cleanImageDirectory()

projects.forEach(async (project, index) => {
  // TODO: these should probably be consolidated into a single getMetadata function
  const repoMetadata = await getProjectRepo(project.name)
  if (!repoMetadata) return

  const languages = await getProjectLanguages(project.name)
  const heroImage = await downloadHeroImage(project)

  const {
    homepage,
    topics: tools = [],
    archived,
    url,
    branch,
    description,
  } = repoMetadata

  // Update project with metadata from GitHub
  projects[index] = {
    ...projects[index],
    archived,
    languages,
    heroImage,
    description: description ?? undefined,
    homepage: homepage ?? undefined,
    githubUrl: url,
    tools,
  }

  await downloadReadMe(project, branch)

  // write data back to file with update project information
  const updatedYaml = yaml.dump({ ...yamlFile, projects })
  fs.writeFileSync(`./${PROJECT_DIR}/index.yml`, updatedYaml)
})
