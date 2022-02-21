<template>
  <div class="project-featured">
    <ul class="project-featured__list">
      <li
        v-for="project in projects"
        :key="project.name"
        :class="{
          'project-featured__list-item': true,
          selected: project.name === selectedProject.name,
        }"
        @click="selectedProject = project"
      >
        {{ project.name }}
      </li>
    </ul>
    <div
      :style="{ backgroundImage: `url(${selectedProject.heroImage})` }"
      class="project-featured__banner"
    ></div>
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

  data(): {
    selectedProject: Project
  } {
    return {
      selectedProject: this.projects[0],
    }
  },
})
</script>

<style lang="scss" scoped>
.project-featured {
  display: flex;
}

.project-featured__list {
  @include list-reset;
  flex-grow: 1;
  margin-right: $l;
  text-align: right;
}

.project-featured__list-item {
  cursor: pointer;
  font-size: $l;
  font-family: $font-title;
  opacity: 50%;

  &.selected {
    opacity: 100%;
  }
}

.project-featured__banner {
  @include responsive-background;
  min-height: 100%;
  height: 400px;
  width: 70%;
}
</style>
