<template>
  <aside>
    <ProjectMetadataSection
      title="Status"
      :options="[project.archived ? 'Archived' : 'Active']"
      class="project-metadata__section"
    />
    <ProjectMetadataSection
      v-if="project.homepage"
      title="Homepage"
      :options="[project.homepage]"
      class="project-metadata__section"
    />
    <ProjectMetadataSection
      title="Repository"
      :options="[project.githubUrl]"
      class="project-metadata__section"
    />
    <ProjectMetadataSection
      title="Year"
      :options="[project.year]"
      class="project-metadata__section"
    />
    <ProjectMetadataSection
      title="Languages"
      :options="project.languages"
      class="project-metadata__section"
    />
    <ProjectMetadataSection
      title="Tools"
      :options="project.tools"
      class="project-metadata__section"
    />
  </aside>
</template>

<script lang="ts">
import { FetchReturn } from '@nuxt/content/types/query-builder'
import Vue, { PropType } from 'vue'
export default Vue.extend({
  props: {
    project: {
      type: Object as PropType<FetchReturn>,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.project-metadata__section {
  &:not(:last-child) {
    @include divider;
    margin-bottom: $m;
    padding-bottom: $m;
  }
}
</style>
