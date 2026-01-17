<template>
  <section class="project-featured">
    <div class="project-featured__info">
      <p class="project-featured__header">Featured personal projects</p>
      <ul class="project-featured__list">
        <li
          v-for="(project, index) in projects"
          :key="project.name"
          :class="{
            'project-featured__list-item': true,
            selected: project.name === selectedProject.name,
          }"
          @click="selectProject(index)"
        >
          <span class="project-featured__list-item-name">
            {{ project.name }}
          </span>
          <p class="project-featured__list-item-description">
            {{ project.description }}
          </p>
        </li>
      </ul>
    </div>
    <NuxtLink :to="projectLink" class="project-featured__selected-feature">
      <div class="project-featured__banner">
        <ImageTransition
          :previous-index="previousProjectIndex"
          :current-index="currentProjectIndex"
          :images="projectImages"
          class-name="project-featured__banner-image"
          shader="vertical-warp"
        />
      </div>
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { Project } from '~/constants/interfaces'
import { getProjectLink } from '~/helpers'

const transitionDelay = 4000

const props = defineProps<{
  projects: Project[]
}>()

const previousProjectIndex = ref(props.projects.length - 1)
const currentProjectIndex = ref(0)
const timeout = ref<NodeJS.Timeout | null>(null)

const selectedProject = computed(() => props.projects[currentProjectIndex.value])
const projectLink = computed(() => getProjectLink(selectedProject.value.name))
const projectImages = computed(() => props.projects.map((x) => x.heroImage.local))

function initInterval() {
  timeout.value = setInterval(() => incrementProject(), transitionDelay)
}

function incrementProject() {
  previousProjectIndex.value = currentProjectIndex.value
  if (currentProjectIndex.value + 1 >= props.projects.length) {
    currentProjectIndex.value = 0
  } else {
    currentProjectIndex.value++
  }
}

function selectProject(projectIndex: number) {
  timeout.value !== null && clearInterval(timeout.value)
  previousProjectIndex.value = currentProjectIndex.value
  currentProjectIndex.value = projectIndex
  initInterval()
}

onMounted(() => {
  initInterval()
})

onBeforeUnmount(() => {
  timeout.value !== null && clearInterval(timeout.value)
})
</script>

<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
@use '../styles/mixins.scss' as *;
.project-featured {
  display: flex;

  @media screen and (max-width: $desktop) {
    flex-flow: column-reverse;

    .project-featured__info {
      margin-right: 0;
      text-align: left;
    }

    .project-featured__header {
      margin-top: $m;
    }

    .project-featured__selected-feature {
      width: 100%;
    }
  }
}

.project-featured__info {
  margin-right: $l;
  text-align: right;
}

.project-featured__header {
  @include subheader;
  @include text-background;
  font-size: $font-s;
  margin: 0 0 $m 0;
}

.project-featured__list {
  @include list-reset;
  flex-grow: 1;
}

.project-featured__list-item {
  cursor: pointer;
  transition: 0.5s;
  opacity: 1;

  &:not(.selected) {
    opacity: 0.4;
  }

  &:not(:last-child) {
    margin-bottom: $m;
  }
}

.project-featured__list-item-name {
  display: block;
  font-size: $l;
  font-family: $font-title;
  margin-bottom: $xs;
}

.project-featured__list-item-description {
  margin: 0;
}

.project-featured__selected-feature {
  color: $grey;
  text-decoration: none;
  width: 70%;
}

.project-featured__banner {
  height: 50vh;
}

.project-featured__banner-image {
  border-radius: $border-radius;
}
</style>
