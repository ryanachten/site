<template>
  <section class="project-metadata-section">
    <div class="project-metadata-section__header">
      <span>{{ title }}</span>
    </div>
    <ul class="project-metadata-section__list">
      <li v-for="option in options" :key="option">
        {{ option }}
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.project-metadata-section {
  min-width: 150px;
  text-align: right;
}

.project-metadata-section__header {
  display: flex;
  flex-flow: row-reverse;
  font-weight: bold;
  justify-content: space-between;
  margin-bottom: $s;
  text-transform: lowercase;
}

.project-metadata-section__list {
  @include list-reset;
  font-size: $font-xs;
  margin-bottom: $s;
}

.project-metadata-section__item {
  cursor: pointer;
  display: block;
  opacity: 100%;

  &:not(:last-child) {
    margin-bottom: $xs;
  }
}
</style>
