<template>
  <NuxtLink :to="projectLink" class="project-tile">
    <img
      v-if="project.heroImage"
      :src="project.heroImage"
      :alt="project.name"
      class="project-title__img"
    />
    <span>{{ project.name }}</span>
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
  display: flex;
  flex-flow: column;
}
.project-title__img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
</style>
