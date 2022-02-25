<template>
  <div>
    <p class="project-grid__header">All projects</p>
    <div class="project-grid__wrapper">
      <ProjectTile
        v-for="project in projects"
        :key="project.name"
        :project="project"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Project } from '~/constants/interfaces'

export default Vue.extend({
  props: {
    projects: {
      type: Array as PropType<Array<Project>>,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.project-grid__header {
  @include subheader;
  font-size: $font-s;
  margin: 0 0 $m 0;
}

.project-grid__wrapper {
  column-gap: $m;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-template-rows: 200px;
  row-gap: $m;
}
</style>
