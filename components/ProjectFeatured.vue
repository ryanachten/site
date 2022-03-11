<template>
  <section class="project-featured">
    <div>
      <p class="project-featured__header">Selected projects</p>
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
          {{ project.name }}
        </li>
      </ul>
    </div>
    <NuxtLink :to="projectLink" class="project-featured__selected-feature">
      <ImageTransition
        :previous-index="previousProjectIndex"
        :current-index="currentProjectIndex"
        :images="projectImages"
        class="project-featured__banner"
      />
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
      previousProjectIndex: 0,
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

  @media screen and (max-width: 800px) {
    flex-flow: column;

    .project-featured__list {
      margin-bottom: $m;
      text-align: left;
    }

    .project-featured__selected-feature {
      width: 100%;
    }
  }
}

.project-featured__header {
  @include subheader;
  font-size: $font-s;
  margin: 0 0 $m 0;
}

.project-featured__list {
  @include list-reset;
  flex-grow: 1;
  margin-right: $font-xl;
  text-align: right;
}

.project-featured__list-item {
  cursor: pointer;
  font-size: $l;
  font-family: $font-title;
  transition: 0.3s;

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
  border-radius: 2px;
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
