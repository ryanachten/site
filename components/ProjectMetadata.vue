<template>
  <aside class="project-metadata">
    <ProjectMetadataSection
      v-if="homepage.length"
      external
      title="Homepage"
      :options="homepage"
      class="project-metadata__section"
    />
    <ProjectMetadataSection
      v-if="repository.length"
      external
      title="Repository"
      :options="repository"
      class="project-metadata__section"
    />
    <ProjectMetadataSection
      v-if="year.length"
      title="Year"
      :options="year"
      class="project-metadata__section"
    />
    <ProjectMetadataSection
      v-if="topics.length"
      title="Topics"
      :options="topics"
      class="project-metadata__section"
    />
    <ProjectMetadataSection
      v-if="languages.length"
      title="Languages"
      :options="languages"
      class="project-metadata__section"
    />
    <ProjectMetadataSection
      v-if="tools.length"
      title="Tools"
      :options="tools"
      class="project-metadata__section"
    />
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MetaLink } from './ProjectMetadataSection.vue'

const projectPageUrl = '/projects?'

const props = defineProps<{
  project: any
}>()

const languages = computed((): MetaLink[] => 
  props.project.languages.map(
    (x: string): MetaLink => ({
      name: x,
      href: `${projectPageUrl}languages=${x}`,
    })
  )
)

const topics = computed((): MetaLink[] => 
  props.project.topics?.map(
    (x: string): MetaLink => ({
      name: x,
      href: `${projectPageUrl}topics=${x}`,
    })
  ) ?? []
)

const tools = computed((): MetaLink[] => 
  props.project.tools.map(
    (x: string): MetaLink => ({
      name: x,
      href: `${projectPageUrl}tools=${x}`,
    })
  )
)

const year = computed((): MetaLink[] => {
  const yearValue = props.project.year
  return [
    {
      name: yearValue,
      href: `${projectPageUrl}years=${yearValue}`,
    },
  ]
})

const repository = computed((): MetaLink[] => [
  {
    name: props.project.name,
    href: props.project.githubUrl,
  },
])

const homepage = computed((): MetaLink[] => 
  props.project.homepage
    ? [
        {
          name: props.project.homepage,
          href: props.project.homepage,
        },
      ]
    : []
)
</script>

<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
@use '../styles/mixins.scss' as *;
.project-metadata {
  width: 100%;
}

.project-metadata__section {
  &:not(:last-child) {
    @include divider;
    margin-bottom: $m;
    padding-bottom: $m;
  }
}
</style>
