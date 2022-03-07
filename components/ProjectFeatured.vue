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
      <ImageTransition
        ref="imageTransition"
        :current-index="selectedProjectIndex"
        :next-index="nextProjectIndex"
        :images="projectImages"
        class="project-featured__banner"
        @animationComplete="incrementProject()"
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
import ImageTransition from '~/components/ImageTransition.vue'
export default Vue.extend({
  props: {
    projects: {
      type: Array as PropType<Array<Project>>,
      required: true,
    },
  },

  data(): {
    selectedProjectIndex: number
  } {
    return {
      selectedProjectIndex: 0,
    }
  },

  computed: {
    selectedProject(): Project {
      return this.projects[this.selectedProjectIndex]
    },
    projectLink(): string {
      return getProjectLink(this.selectedProject.name)
    },
    nextProjectIndex(): number {
      return this.selectedProjectIndex + 1 >= this.projects.length
        ? 0
        : this.selectedProjectIndex + 1
    },
    projectImages(): string[] {
      return this.projects.map((x) => x.heroImage.local)
    },
  },

  methods: {
    incrementProject() {
      // Delay before executing next transition
      setTimeout(() => {
        if (this.selectedProjectIndex + 1 >= this.projects.length) {
          this.selectedProjectIndex = 0
        } else {
          this.selectedProjectIndex++
        }

        const transition = this.$refs.imageTransition as InstanceType<
          typeof ImageTransition
        >
        transition.start()
      }, 3000)
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
  margin-right: $font-l;
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
