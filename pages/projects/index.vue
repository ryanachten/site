<template>
  <div>
    <h1>Projects</h1>
    <NuxtLink to="/">Home</NuxtLink>
    <label for="languages">Language</label>
    <select id="languages" v-model="selectedLanguage" name="languages">
      <option selected value="">All</option>
      <option
        v-for="(count, language) in languages"
        :key="language"
        :value="language"
      >
        {{ `${language} (${count})` }}
      </option>
    </select>
    <ProjectGrid :projects="filteredProjects" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Project, ProjectIndex } from '~/constants/interfaces'

export default Vue.extend({
  name: 'ProjectPage',

  async asyncData({ $content }) {
    const page = (await $content(
      'projects',
      'index'
    ).fetch<ProjectIndex>()) as ProjectIndex
    const projects = page.projects

    // Create dict of all languages and their number of uses
    let languages: Record<string, number> = {}
    projects.forEach((x) =>
      x.languages.forEach((l) => {
        if (Object.keys(languages).includes(l)) {
          languages[l]++
        } else {
          languages[l] = 1
        }
      })
    )
    // Sort languages by count
    languages = Object.fromEntries(
      Object.entries(languages).sort(([, a], [, b]) => b - a)
    )

    return {
      projects,
      languages,
    }
  },

  data(): { projects: Project[]; selectedLanguage: string } {
    return {
      projects: [],
      selectedLanguage: '',
    }
  },

  computed: {
    filteredProjects(): Project[] {
      if (!this.selectedLanguage) return this.projects
      return this.projects.filter((x) =>
        x.languages.includes(this.selectedLanguage)
      )
    },
  },
})
</script>


