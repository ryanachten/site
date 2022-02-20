<template>
  <div>
    <NavBar />
    <div class="all-projects">
      <ProjectGrid :projects="filteredProjects" />
      <aside>
        <ProjectFilter
          v-model="selectedLanguage"
          title="Languages"
          :options="filteredLanguages"
          :selected-value="selectedLanguage"
        />
        <ProjectFilter
          v-model="selectedTool"
          title="Tools"
          :options="filteredTools"
          :selected-value="selectedTool"
        />
      </aside>
    </div>
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

<style lang="scss" scoped>
.all-projects {
  display: flex;
}
</style>
