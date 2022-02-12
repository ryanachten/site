<template>
  <div class="project-grid">
    <ProjectTile
      v-for="project in projects"
      :key="project.name"
      :project="project"
      class="project-grid__tile"
    />
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
.project-grid {
  display: flex;
  flex-flow: row wrap;
}
.project-grid__tile {
  max-width: 300px;
}
</style>
