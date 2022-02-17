export interface Project {
  name: string
  githubUrl: string
  homepage?: string
  archived: boolean
  languages: string[]
  tools: string[]
  heroImage?: string // TODO: this shouldn't be optional
}

export interface ProjectIndex {
  projects: Project[]
}

export interface Count {
  name: string
  count: number
}
