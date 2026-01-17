<template>
  <div ref="grid" class="project-grid__wrapper">
    <ProjectTile
      v-for="project in projects"
      :key="project.name"
      :project="project"
      :double-height="isSingleRow"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Project } from '~/constants/interfaces'

const props = defineProps<{
  projects: Project[]
}>()

const grid = ref<HTMLDivElement>()
const cellsPerRow = ref(0)
const imagesLoaded = ref(false)

const isSingleRow = computed(() => props.projects.length <= cellsPerRow.value)

function calculateRows() {
  if (!grid.value) return false

  const cellWidth = 240 // must align with SCSS below
  cellsPerRow.value = Math.floor(grid.value.clientWidth / cellWidth)
}

onMounted(() => {
  calculateRows()
  window.addEventListener('resize', calculateRows)
})
</script>

<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
@use '../styles/mixins.scss' as *;
.project-grid__wrapper {
  column-gap: $m;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-template-rows: 200px;
  row-gap: $m;
}
</style>
