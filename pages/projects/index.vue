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
          <span class="projects__header-label">All personal projects</span>
          <span
            role="button"
            class="material-icons projects__filter-toggle"
            @click="toggleFilterMenu()"
            >{{ showFilterMenu ? 'filter_alt_off' : 'filter_alt' }}</span
          >
        </div>
        <div class="projects__all-projects">
          <ProjectGrid
            class="projects__project-grid"
            :projects="filteredProjects"
          />
          <aside
            class="projects__filters"
            :class="{ 'projects__filters--mobile': showFilterMenu }"
          >
            <ProjectFilter
              v-model="selectedTopics"
              class="projects__filter"
              title="Topics"
              :options="topics"
              :selected-values="selectedTopics"
            />
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
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Count, Project, ProjectIndex } from '~/constants/interfaces'
import { getSortedTotals, parseQueryParameters, SortTotal } from '~/helpers'

const route = useRoute()

const { data: page } = await useAsyncData('projects-index', () =>
  queryContent<ProjectIndex>('projects', 'index').findOne()
)

const projects = computed(() => page.value?.projects || [])
const featuredProjects = computed(() => projects.value.filter((x) => x.featured))

const unsortedLanguages = computed(() => projects.value.map((x) => x.languages).flat())
const unsortedTools = computed(() => projects.value.map((x) => x.tools).flat())
const unsortedYears = computed(() => projects.value.map((x) => x.year))
const unsortedTopics = computed(() =>
  projects.value
    .filter((x) => Boolean(x.topics))
    .map((x) => x.topics!)
    .flat()
)

const languages = computed(() => getSortedTotals(unsortedLanguages.value))
const tools = computed(() => getSortedTotals(unsortedTools.value))
const years = computed(() => getSortedTotals(unsortedYears.value, SortTotal.BY_NAME_DESC))
const topics = computed(() => getSortedTotals(unsortedTopics.value))

const selectedTopics = ref<string[]>([])
const selectedLanguages = ref<string[]>([])
const selectedTools = ref<string[]>([])
const selectedYears = ref<string[]>([])
const showFilterMenu = ref(false)

const filteredProjects = computed(() => {
  const hasFilters =
    selectedLanguages.value.length ||
    selectedTools.value.length ||
    selectedYears.value.length ||
    selectedTopics.value.length
  
  const filtered = hasFilters
    ? projects.value.filter((x) => {
        if (!hasFilters) {
          return true
        }
        const containsLanguage = selectedLanguages.value.length
          ? x.languages.some((lang) =>
              selectedLanguages.value.includes(lang)
            )
          : false
        const containsTool = selectedTools.value.length
          ? x.tools.some((tool) => selectedTools.value.includes(tool))
          : false
        const containsYear = selectedYears.value.length
          ? selectedYears.value.includes(x.year.toString())
          : false
        const containsTopic = selectedTopics.value.length
          ? x.topics?.some((topic) => selectedTopics.value.includes(topic))
          : false

        return (
          containsLanguage || containsTool || containsYear || containsTopic
        )
      })
    : projects.value

  return filtered.sort((a, b) => b.year - a.year)
})

function toggleFilterMenu() {
  showFilterMenu.value = !showFilterMenu.value
}

onMounted(() => {
  const queryParams = route.query
  selectedYears.value = parseQueryParameters(queryParams.years)
  selectedLanguages.value = parseQueryParameters(queryParams.languages)
  selectedTools.value = parseQueryParameters(queryParams.tools)
  selectedTopics.value = parseQueryParameters(queryParams.topics)
})
</script>

<style lang="scss" scoped>
@use '../../styles/variables.scss' as *;
@use '../../styles/mixins.scss' as *;
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
  justify-content: flex-end;
  margin-bottom: $m;

  @media screen and (max-width: $desktop) {
    justify-content: space-between;
  }
}

.projects__header-label {
  @include text-background;
}

.projects__filter-toggle {
  @media screen and (min-width: $desktop) {
    display: none;
  }
}

.projects__filters {
  margin-left: $l;

  @media screen and (max-width: $desktop) {
    margin-left: 0;
    max-width: 0;
    overflow: hidden;

    &.projects__filters--mobile {
      @include blurred-background;
      display: block;
      max-width: 300px;
      padding: 0 0 $m $m;
      position: absolute;
      right: -1px;
      top: -1px;
      transition: 1s;
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
