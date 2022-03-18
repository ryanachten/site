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

<script lang="ts">
import { FetchReturn } from '@nuxt/content/types/query-builder'
import Vue, { PropType } from 'vue'
import { MetaLink } from './ProjectMetadataSection.vue'
const projectPageUrl = '/projects?'
export default Vue.extend({
  props: {
    project: {
      type: Object as PropType<FetchReturn>,
      required: true,
    },
  },
  computed: {
    languages(): MetaLink[] {
      return this.project.languages.map(
        (x: string): MetaLink => ({
          name: x,
          href: `${projectPageUrl}languages=${x}`,
        })
      )
    },
    tools(): MetaLink[] {
      return this.project.tools.map(
        (x: string): MetaLink => ({
          name: x,
          href: `${projectPageUrl}tools=${x}`,
        })
      )
    },
    year(): MetaLink[] {
      const year = this.project.year
      return [
        {
          name: year,
          href: `${projectPageUrl}years=${year}`,
        },
      ]
    },
    repository(): MetaLink[] {
      return [
        {
          name: this.project.name,
          href: this.project.githubUrl,
        },
      ]
    },
    homepage(): MetaLink[] {
      return this.project.homepage
        ? [
            {
              name: this.project.homepage,
              href: this.project.homepage,
            },
          ]
        : []
    },
  },
})
</script>

<style lang="scss" scoped>
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
