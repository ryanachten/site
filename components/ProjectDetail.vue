<template>
  <article class="project-detail">
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
  img {
    border-radius: $border-radius;
    display: block;
    margin: $m auto;
    max-width: 100%;
  }

  a {
    color: $black;
  }
}
</style>
