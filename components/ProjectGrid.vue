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

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Project } from '~/constants/interfaces'

export default Vue.extend({
  props: {
    projects: {
      type: Array as PropType<Array<Project>>,
      required: true,
    },
  },
  data() {
    return {
      cellsPerRow: 0,
      imagesLoaded: false,
    }
  },
  computed: {
    isSingleRow(): boolean {
      return this.projects.length <= this.cellsPerRow
    },
  },
  mounted() {
    this.calculateRows()
    window.addEventListener('resize', this.calculateRows)
  },
  methods: {
    calculateRows() {
      const grid = this.$refs.grid as HTMLDivElement | null
      if (!grid) return false

      const cellWidth = 240 // must align with SCSS below
      this.cellsPerRow = Math.floor(grid.clientWidth / cellWidth)
    },
  },
})
</script>

<style lang="scss" scoped>
.project-grid__wrapper {
  column-gap: $m;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-template-rows: 200px;
  row-gap: $m;
}
</style>
