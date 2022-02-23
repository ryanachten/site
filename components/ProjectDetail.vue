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

  h1 {
    font-family: $font-title;
    font-size: $font-l;
    text-align: center;
    text-transform: lowercase;
  }

  h2 {
    font-family: $font-title;
    font-size: $font-m;
    text-transform: lowercase;
    margin-top: $l;
  }

  a {
    color: $black;
  }
}
</style>
