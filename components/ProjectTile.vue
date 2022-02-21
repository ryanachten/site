<template>
  <NuxtLink
    :to="projectLink"
    :style="{ backgroundImage: `url(${project.heroImage})` }"
    class="project-tile"
  >
  </NuxtLink>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Project } from '~/constants/interfaces'

export default Vue.extend({
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
  computed: {
    projectLink(): string {
      return `/projects/${this.project.name.toLowerCase()}`
    },
  },
})
</script>

<style lang="scss" scoped>
.project-tile {
  @include responsive-background;
  display: block;
  height: 200px;
  width: 100%;
}
</style>
