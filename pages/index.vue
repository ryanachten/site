<template>
  <main class="landing">
    <div class="page__container landing__container">
      <LogoImg class="landing__logo" />
      <LogoText size="large" class="landing__logo-text" />
      <div class="landing__nav">
        <NuxtLink to="/projects">Projects</NuxtLink>
        <NuxtLink to="/cv">CV</NuxtLink>
      </div>
    </div>
    <div class="landing__canvas">
      <ImageTransition
        :previous-index="previousProjectIndex"
        :current-index="currentProjectIndex"
        :images="heroImages"
        shader="noise-warp"
        @animation-complete="incrementProject()"
      />
    </div>
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import { Project, ProjectIndex } from '~/constants/interfaces'

export default Vue.extend({
  name: 'IndexPage',

  async asyncData({ $content }) {
    const page = (await $content(
      'projects',
      'index'
    ).fetch<ProjectIndex>()) as ProjectIndex

    return {
      projects: page.projects,
    }
  },

  data(): {
    projects: Project[]
    previousProjectIndex: number
    currentProjectIndex: number
  } {
    return {
      projects: [],
      previousProjectIndex: 0,
      currentProjectIndex: 0,
    }
  },

  computed: {
    heroImages(): string[] {
      return this.projects.map((x) => x.heroImage.local)
    },
  },

  mounted() {
    setTimeout(() => this.incrementProject(), 1000)
  },

  methods: {
    incrementProject() {
      this.previousProjectIndex = this.currentProjectIndex
      if (this.currentProjectIndex + 1 >= this.heroImages.length) {
        this.currentProjectIndex = 0
      } else {
        this.currentProjectIndex++
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.landing {
  display: flex;
  justify-content: center;
  position: relative;
}

.landing__container {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100% - $m * 2);
  justify-content: center;
  position: absolute;
  width: calc(100% - $m * 2);
}

.landing__logo {
  height: fit-content;
  margin-bottom: $m;
  min-width: 200px;
  width: 25%;
}

.landing__logo-text {
  margin-bottom: $m;
}

.landing__canvas {
  border-radius: 2px;
  height: 100vh;
  width: 100vw;
}

.landing__nav {
  display: flex;
  justify-content: space-between;
  margin-bottom: $l;

  a {
    @include subheader;
    &:not(:last-child) {
      margin-right: $m;
    }

    &.nuxt-link-active {
      font-weight: bold;
    }
  }
}
</style>
