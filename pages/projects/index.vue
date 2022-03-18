<template>
  <div class="page">
    <div class="page__container">
      <NavBar />
      <ProjectFeatured
        class="projects__featured"
        :projects="featuredProjects"
      />
      <div>
        <div class="projects__header">
          <p>All projects</p>
          <span
            role="button"
            class="material-icons projects__filter-toggle"
            @click="toggleFilterMenu()"
            >{{ showFilterMenu ? 'filter_alt_off' : 'filter_alt' }}</span
          >
        </div>
        <div v-if="loaded" class="projects__all-projects">
          <ProjectGrid
            class="projects__project-grid"
            :projects="filteredProjects"
          />
          <aside
            class="projects__filters"
            :class="{ 'projects__filters--mobile': showFilterMenu }"
          >
            <ProjectFilter
              v-model="selectedYears"
              class="projects__filter"
              title="Years"
              :options="years"
              :selected-values="selectedYears"
            />
            <ProjectFilter
              v-model="selectedLanguages"
              class="projects__filter"
              title="Languages"
              :options="languages"
              :selected-values="selectedLanguages"
            />
            <ProjectFilter
              v-model="selectedTools"
              class="projects__filter"
              title="Tools"
              :options="tools"
              :selected-values="selectedTools"
            />
          </aside>
        </div>
      </div>
      <FooterNav />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Count, Project, ProjectIndex } from '~/constants/interfaces'
import { getSortedTotals, parseQueryParameters, SortTotal } from '~/helpers'

export default Vue.extend({
  name: 'ProjectPage',

  async asyncData({ $content }) {
    const page = (await $content(
      'projects',
      'index'
    ).fetch<ProjectIndex>()) as ProjectIndex

    const projects = page.projects
    const featuredProjects = page.projects.filter((x) => x.featured)

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
      featuredProjects,
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
    loaded: boolean
    showFilterMenu: boolean
  } {
    return {
      projects: [],
      languages: [],
      tools: [],
      years: [],
      selectedLanguages: [],
      selectedTools: [],
      selectedYears: [],
      loaded: false,
      showFilterMenu: false,
    }
  },

  computed: {
    filteredProjects(): Project[] {
      const hasFilters =
        this.selectedLanguages.length ||
        this.selectedTools.length ||
        this.selectedYears.length
      const filteredProjects = hasFilters
        ? this.projects.filter((x) => {
            if (!hasFilters) {
              return true
            }
            const containsLanguage = this.selectedLanguages.length
              ? x.languages.some((lang) =>
                  this.selectedLanguages.includes(lang)
                )
              : false
            const containsTool = this.selectedTools.length
              ? x.tools.some((tool) => this.selectedTools.includes(tool))
              : false
            const containsYear = this.selectedYears.length
              ? this.selectedYears.includes(x.year.toString())
              : false
            return containsLanguage || containsTool || containsYear
          })
        : this.projects
      return filteredProjects.sort((a, b) => b.year - a.year)
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

  mounted() {
    const queryParams = this.$route.query
    this.selectedYears = parseQueryParameters(queryParams.years)
    this.selectedLanguages = parseQueryParameters(queryParams.languages)
    this.selectedTools = parseQueryParameters(queryParams.tools)
    this.loaded = true
  },

  methods: {
    toggleFilterMenu() {
      this.showFilterMenu = !this.showFilterMenu
    },
  },
})
</script>

<style lang="scss" scoped>
.projects__featured {
  @include divider;
  padding-bottom: $l;
  margin-bottom: $l;
}

.projects__all-projects {
  display: flex;
  position: relative;
}

.projects__header {
  @include subheader;
  align-items: center;
  display: flex;
  font-size: $font-s;
  justify-content: space-between;
}

.projects__filter-toggle {
  @media screen and (min-width: 800px) {
    display: none;
  }
}

.projects__filters {
  margin-left: $l;

  @media screen and (max-width: $desktop) {
    display: none;

    &.projects__filters--mobile {
      background: $black;
      display: block;
      padding: 0 0 $m $m;
      position: absolute;
      right: -1px;
      top: -1px;
    }
  }
}

.projects__filter {
  &:not(:last-child) {
    @include divider;
    margin-bottom: $m;
    padding-bottom: $m;
  }
}

.projects__project-grid {
  flex-grow: 1;
}
</style>
