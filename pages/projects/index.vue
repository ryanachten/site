<template>
  <div>
    <NavBar />
    <div class="projects__all-projects">
      <ProjectGrid
        class="projects__project-grid"
        :projects="filteredProjects"
      />
      <aside>
        <ProjectFilter
          v-model="selectedYears"
          class="projects__filter"
          title="Years"
          :options="filteredYears"
          :selected-values="selectedYears"
        />
        <ProjectFilter
          v-model="selectedLanguages"
          class="projects__filter"
          title="Languages"
          :options="filteredLanguages"
          :selected-values="selectedLanguages"
        />
        <ProjectFilter
          v-model="selectedTools"
          class="projects__filter"
          title="Tools"
          :options="filteredTools"
          :selected-values="selectedTools"
        />
      </aside>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Count, Project, ProjectIndex } from '~/constants/interfaces'
import { getSortedTotals, SortTotal } from '~/helpers'

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
    const unsortedYears = projects.map((x) => x.year)
    const sortedLanguages = getSortedTotals(unsortedLanguages)
    const sortedTools = getSortedTotals(unsortedTools)
    const sortedYears = getSortedTotals(unsortedYears, SortTotal.BY_NAME_DESC)

    return {
      projects,
      languages: sortedLanguages,
      tools: sortedTools,
      years: sortedYears,
    }
  },

  data(): {
    projects: Project[]
    languages: Count[]
    tools: Count[]
    years: Count[]
    selectedLanguages: string[]
    selectedTools: string[]
    selectedYears: string[]
  } {
    return {
      projects: [],
      languages: [],
      tools: [],
      years: [],
      selectedLanguages: [],
      selectedTools: [],
      selectedYears: [],
    }
  },

  computed: {
    filteredProjects(): Project[] {
      return this.projects
        .filter((x) => {
          const containsLanguage = this.selectedLanguages.length
            ? x.languages.some((lang) => this.selectedLanguages.includes(lang))
            : true
          const containsTool = this.selectedTools.length
            ? x.tools.some((tool) => this.selectedTools.includes(tool))
            : true
          const containsYear = this.selectedYears.length
            ? this.selectedYears.includes(x.year.toString())
            : true
          return containsLanguage && containsTool && containsYear
        })
        .sort((a, b) => b.year - a.year)
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
    filteredYears(): Count[] {
      const selectedYears = this.filteredProjects.map((x) => x.year)
      return this.years.filter((x) => selectedYears.includes(parseInt(x.name)))
    },
  },
})
</script>

<style lang="scss" scoped>
.projects__all-projects {
  display: flex;
}

.projects__filter {
  &:not(:last-child) {
    margin-bottom: $m;
  }
}

.projects__project-grid {
  flex-grow: 1;
}
</style>
