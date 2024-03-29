<template>
  <div
    class="project-tile"
    :class="{
      'project-tile--active': imageLoaded,
    }"
  >
    <NuxtLink
      :to="projectLink"
      :style="{
        backgroundImage: imageLoaded
          ? `url(${project.heroImage.remote})`
          : 'unset',
      }"
      :class="{
        'project-tile__link--double-height': doubleHeight,
      }"
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
    doubleHeight: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return { imageLoaded: false }
  },
  computed: {
    projectLink(): string {
      return getProjectLink(this.project.name)
    },
  },
  mounted() {
    this.loadImage()
  },
  methods: {
    loadImage() {
      const image = new Image()
      image.src = this.project.heroImage.remote
      image.onload = () => {
        this.imageLoaded = true
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.project-tile {
  filter: blur($s);
  border-radius: $border-radius;
  opacity: 0;
  transition: 0.5s;
}
.project-tile--active {
  filter: blur(0);
  opacity: 1;
}
.project-tile__link {
  @include responsive-background;
  border-radius: $border-radius;
  display: block;
  height: 200px;
  text-decoration: none;
  width: 100%;

  &--double-height {
    height: 400px;
  }
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
