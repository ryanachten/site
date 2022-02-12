export interface Project {
  name: string
  heroImage?: string // TODO: this shouldn't ne optional
  branch?: 'master' | 'main' // if not set, assume main
  repo?: string // repository name - only set if differs from name
}
