interface GitHubRepoMetadata {
  githubUrl: string
  homepage?: string
  description?: string
  archived: boolean
  languages: string[]
  tools: string[]
}

interface CustomProjectMetadata {
  name: string
  heroImage: string
  year: number
  featured?: boolean
}

export interface Project extends GitHubRepoMetadata, CustomProjectMetadata {}

export interface ProjectIndex {
  projects: Project[]
}

export interface Count {
  name: string
  count: number
}
