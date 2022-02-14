export interface Project {
  name: string
  languages: string[]
  heroImage?: string // TODO: this shouldn't be optional
  branch?: 'master' | 'main' // if not set, assume main
  repo?: string // repository name - only set if differs from name
}
