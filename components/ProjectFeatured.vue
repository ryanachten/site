<template>
  <section class="project-featured">
    <div>
      <p class="project-featured__header">Selected projects</p>
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
    </div>
    <NuxtLink :to="projectLink" class="project-featured__selected-feature">
      <div
        :style="{ backgroundImage: `url(${selectedProject.heroImage})` }"
        class="project-featured__banner"
      ></div>
      <p class="project-featured__description">
        <strong>{{ selectedProject.name }}</strong
        ><span class="project-featured__description-divider">-</span>
        {{ selectedProject.description }} ({{ selectedProject.year }})
      </p>
    </NuxtLink>
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Project } from '~/constants/interfaces'
import { getProjectLink } from '~/helpers'
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

  computed: {
    projectLink(): string {
      return getProjectLink(this.selectedProject.name)
    },
  },
})
</script>

<style lang="scss" scoped>
.project-featured {
  display: flex;
}

.project-featured__header {
  @include subheader;
  font-size: $font-s;
  margin: 0 0 $m 0;
}

.project-featured__list {
  @include list-reset;
  flex-grow: 1;
  margin-right: $font-l;
  text-align: right;
}

.project-featured__list-item {
  cursor: pointer;
  font-size: $l;
  font-family: $font-title;

  &:not(.selected) {
    color: darken($grey, 25%);
  }

  &:not(:last-child) {
    margin-bottom: $s;
  }
}

.project-featured__selected-feature {
  color: $grey;
  text-decoration: none;
  width: 70%;
}

.project-featured__banner {
  @include responsive-background;
  margin-bottom: $m;
  height: 50vh;
}

.project-featured__description {
  text-align: center;
}

.project-featured__description-divider {
  margin: 0 $s;
}
</style>
