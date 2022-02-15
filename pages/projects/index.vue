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
    <label for="tools">Tool</label>
    <select id="tools" v-model="selectedTool" name="tools">
      <option selected value="">All</option>
      <option v-for="(count, tool) in tools" :key="tool" :value="tool">
        {{ `${tool} (${count})` }}
      </option>
    </select>
    <ProjectGrid :projects="filteredProjects" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Project, ProjectIndex } from '~/constants/interfaces'
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
    selectedLanguage: string
    selectedTool: string
  } {
    return {
      projects: [],
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
  },
})
</script>
