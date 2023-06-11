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
  heroImage: {
    remote: string
    local: string
  }
  year: number
  featured?: boolean
  topics?: string[]
}

export interface Project extends GitHubRepoMetadata, CustomProjectMetadata {}

export interface ProjectIndex {
  projects: Project[]
}

export interface Count {
  name: string
  count: number
}
