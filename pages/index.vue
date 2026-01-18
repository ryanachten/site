<template>
  <main class="landing">
    <div class="page__container landing__container">
      <LogoImg class="landing__logo" is-transparent />
      <LogoText size="large" class="landing__logo-text" />
      <div class="landing__nav">
        <NuxtLink to="/projects">Projects</NuxtLink>
        <NuxtLink to="/cv">CV</NuxtLink>
      </div>
    </div>
    <ClientOnly>
      <div class="landing__canvas">
        <ImageTransition
          :previous-index="previousProjectIndex"
          :current-index="currentProjectIndex"
          :images="heroImages"
          shader="noise-warp"
          @animation-complete="incrementProject()"
        />
      </div>
    </ClientOnly>
  </main>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Project, ProjectIndex } from '~/constants/interfaces'

const { data: page } = await useAsyncData('index', () =>
  queryContent<ProjectIndex>('/projects').findOne()
)

const projects = computed(() => page.value?.projects || [])
const previousProjectIndex = ref(0)
const currentProjectIndex = ref(0)

const heroImages = computed(() => projects.value.map((x) => x.heroImage.local))

function incrementProject() {
  previousProjectIndex.value = currentProjectIndex.value
  if (currentProjectIndex.value + 1 >= heroImages.value.length) {
    currentProjectIndex.value = 0
  } else {
    currentProjectIndex.value++
  }
}

onMounted(() => {
  setTimeout(() => incrementProject(), 1000)
})
</script>

<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
@use '../styles/mixins.scss' as *;

.landing {
  display: flex;
  justify-content: center;
  overflow: hidden;
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
  border-radius: $border-radius;
  height: 100vh;
  width: 100vw;
}

.landing__nav {
  display: flex;
  justify-content: space-between;
  margin-bottom: $l;

  a {
    @include subheader;
    @include text-background;

    &:not(:last-child) {
      margin-right: $m;
    }

    &.nuxt-link-active {
      font-weight: bold;
    }
  }
}
</style>
