<template>
  <div
    class="project-tile"
    @mouseover="isHovering = true"
    @mouseout="isHovering = false"
  >
    <NuxtLink
      :to="projectLink"
      :style="{ backgroundImage: `url(${project.heroImage.remote})` }"
      class="project-tile__link"
    >
      <div v-if="isHovering" class="project-tile__content">
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
  data() {
    return {
      isHovering: false,
    }
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
  pointer-events: none;
  text-align: center;
  width: 100%;
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
