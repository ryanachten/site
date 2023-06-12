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

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Project } from '~/constants/interfaces'
import { getProjectLink } from '~/helpers'

const transitionDelay = 4000

export default Vue.extend({
  props: {
    projects: {
      type: Array as PropType<Array<Project>>,
      required: true,
    },
  },

  data(): {
    previousProjectIndex: number
    currentProjectIndex: number
    timeout: NodeJS.Timeout | null
  } {
    return {
      previousProjectIndex: this.projects.length - 1,
      currentProjectIndex: 0,
      timeout: null,
    }
  },

  computed: {
    selectedProject(): Project {
      return this.projects[this.currentProjectIndex]
    },
    projectLink(): string {
      return getProjectLink(this.selectedProject.name)
    },
    projectImages(): string[] {
      return this.projects.map((x) => x.heroImage.local)
    },
  },

  mounted() {
    this.initInterval()
  },

  beforeMount() {
    this.timeout !== null && clearInterval(this.timeout)
  },

  methods: {
    initInterval() {
      this.timeout = setInterval(() => this.incrementProject(), transitionDelay)
    },
    incrementProject() {
      this.previousProjectIndex = this.currentProjectIndex
      if (this.currentProjectIndex + 1 >= this.projects.length) {
        this.currentProjectIndex = 0
      } else {
        this.currentProjectIndex++
      }
    },
    selectProject(projectIndex: number) {
      this.timeout !== null && clearInterval(this.timeout)
      this.previousProjectIndex = this.currentProjectIndex
      this.currentProjectIndex = projectIndex
      this.initInterval()
    },
  },
})
</script>

<style lang="scss" scoped>
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
