<template>
  <div>
    <h1>Projects</h1>
    <NuxtLink to="/">Home</NuxtLink>
    <label for="languages">Language</label>
    <select id="languages" v-model="selectedLanguage" name="languages">
      <option selected value="">All</option>
      <option
        v-for="language in filteredLanguages"
        :key="language.name"
        :value="language.name"
      >
        {{ `${language.name} (${language.count})` }}
      </option>
    </select>
    <label for="tools">Tool</label>
    <select id="tools" v-model="selectedTool" name="tools">
      <option selected value="">All</option>
      <option v-for="tool in filteredTools" :key="tool.name" :value="tool.name">
        {{ `${tool.name} (${tool.count})` }}
      </option>
    </select>
    <ProjectGrid :projects="filteredProjects" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Count, Project, ProjectIndex } from '~/constants/interfaces'
import { getSortedTotals } from '~/helpers'

export default Vue.extend({
  name: 'ProjectPage',

  async asyncData({ $content }) {
    const page = (await $content(
      'projects',
      'index'
    ).fetch<ProjectIndex>()) as ProjectIndex

    const projects = page.projects
    const unsortedLanguages = projects.map((x) => x.languages).flat()
    const unsortedTools = projects.map((x) => x.tools).flat()
    const sortedLanguages = getSortedTotals(unsortedLanguages)
    const sortedTools = getSortedTotals(unsortedTools)

    return {
      projects,
      languages: sortedLanguages,
      tools: sortedTools,
    }
  },

  data(): {
    projects: Project[]
    languages: Count[]
    tools: Count[]
    selectedLanguage: string
    selectedTool: string
  } {
    return {
      projects: [],
      languages: [],
      tools: [],
      selectedLanguage: '',
      selectedTool: '',
    }
  },

  computed: {
    filteredProjects(): Project[] {
      return this.projects.filter((x) => {
        const containsLanguage = this.selectedLanguage
          ? x.languages.includes(this.selectedLanguage)
          : true
        const containsTool = this.selectedTool
          ? x.tools.includes(this.selectedTool)
          : true
        return containsLanguage && containsTool
      })
    },
    filteredLanguages(): Count[] {
      const selectedLanguages = this.filteredProjects
        .map((x) => x.languages)
        .flat()
      return this.languages.filter((x) => selectedLanguages.includes(x.name))
    },
    filteredTools(): Count[] {
      const selectedTools = this.filteredProjects.map((x) => x.tools).flat()
      return this.tools.filter((x) => selectedTools.includes(x.name))
    },
  },
})
</script>
