<template>
  <div class="project-tile">
    <NuxtLink
      :to="projectLink"
      :style="{ backgroundImage: `url(${project.heroImage.remote})` }"
      class="project-tile__link"
    >
      <div class="project-tile__content">
        <span class="project-tile__title">{{ project.name }}</span>
        <p class="project-tile__description">{{ project.description }}</p>
      </div>
    </NuxtLink>
  </div>
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
  border-radius: $border-radius;
}
.project-tile__link {
  @include responsive-background;
  border-radius: $border-radius;
  display: block;
  height: 200px;
  text-decoration: none;
  width: 100%;
}
.project-tile__content {
  @include blurred-background(0.5);
  align-content: center;
  display: flex;
  flex-flow: row wrap;
  height: 100%;
  justify-content: center;
  opacity: 0;
  text-align: center;
  transition: 0.3s;
  width: 100%;

  &:hover {
    opacity: 1;
  }
}
.project-tile__title {
  font-family: $font-title;
  font-size: $font-m;
  margin-bottom: $s;
  pointer-events: none;
  text-transform: lowercase;
}
.project-tile__description {
  font-size: $font-xs;
  margin: 0 $s;
  pointer-events: none;
  width: 100%;
}
</style>
