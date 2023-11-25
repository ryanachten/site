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

  pre[class*='language-'] {
    @media screen and (max-width: $desktop) {
      max-width: calc(100vw - 70px); // prevent overflow on mobile
    }
  }

  table {
    display: block;
    overflow-x: auto;
    text-align: left;

    @media screen and (max-width: $desktop) {
      max-width: calc(100vw - 40px); // prevent overflow on mobile
    }

    th,
    td {
      padding: $xs;
      vertical-align: top;
    }
  }
}
</style>
