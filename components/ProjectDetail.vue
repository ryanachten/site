<template>
  <article class="project-detail">
    <div class="project-detail__languages">
      <span
        v-for="language in content.languages"
        :key="language"
        class="project-detail__language-item"
        >{{ language }}</span
      >
    </div>
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

.project-detail__language-item {
  &:not(:last-child) {
    margin-right: $s;
  }
}
</style>
