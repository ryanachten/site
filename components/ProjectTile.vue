<template>
  <NuxtLink
    :to="projectLink"
    :style="{ backgroundImage: `url(${project.heroImage.local})` }"
    class="project-tile"
  >
  </NuxtLink>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Project } from '~/constants/interfaces'
import { getProjectLink } from '~/helpers'

export default Vue.extend({
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
  computed: {
    projectLink(): string {
      return getProjectLink(this.project.name)
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
