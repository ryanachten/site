<template>
  <section class="project-metadata-section">
    <div class="project-metadata-section__header">
      <span>{{ title }}</span>
    </div>
    <ul class="project-metadata-section__list">
      <li
        v-for="option in sortedOptions"
        :key="option.name"
        class="project-metadata-section__item"
      >
        <a v-if="external" target="_blank" rel="noopener" :href="option.href">{{
          option.name
        }}</a>
        <NuxtLink v-else :to="option.href">
          {{ option.name }}
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
export interface MetaLink {
  name: string
  href: string
}
export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Array as PropType<Array<MetaLink>>,
      required: true,
    },
    external: {
      type: Boolean,
    },
  },
  computed: {
    sortedOptions() {
      const opts = [...this.options]
      return opts.sort((a, b) => (a.name > b.name ? 1 : -1))
    },
  },
})
</script>

<style lang="scss" scoped>
.project-metadata-section {
  min-width: 150px;

  @media screen and (min-width: $desktop) {
    text-align: right;
  }
}

.project-metadata-section__header {
  font-weight: bold;
  margin-bottom: $s;
  text-transform: lowercase;
}

.project-metadata-section__list {
  @include list-reset;
  font-size: $font-xs;
  margin-bottom: $s;
}

.project-metadata-section__item {
  display: block;

  a {
    color: $black;
    text-decoration: none;
  }

  &:not(:last-child) {
    margin-bottom: $xs;
  }
}
</style>
