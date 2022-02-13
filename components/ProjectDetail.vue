<template>
  <article class="project-detail">
    <h1>{{ content.title }}</h1>
    <p>{{ content.description }}</p>
    <nuxt-content :document="content" />
  </article>
</template>

<script lang="ts">
import { FetchReturn } from '@nuxt/content/types/query-builder'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    content: {
      type: Object as PropType<FetchReturn>,
      required: true,
    },
  },
})
</script>

<style lang="scss">
.project-detail {
  margin: 0 $l;

  img {
    width: 100%;
  }
}
</style>
