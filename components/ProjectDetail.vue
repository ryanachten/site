<template>
  <article class="project-detail">
    <p><strong>Archived:</strong> {{ content.archived }}</p>
    <p v-if="content.homepage">
      <strong>Homepage:</strong> {{ content.homepage }}
    </p>
    <p><strong>Repo:</strong> {{ content.githubUrl }}</p>
    <p>
      <strong>Languages:</strong>
      <span
        v-for="language in content.languages"
        :key="language"
        class="project-detail__list-item"
        >{{ language }}</span
      >
    </p>
    <p>
      <strong>Tools:</strong>
      <span
        v-for="tool in content.tools"
        :key="tool"
        class="project-detail__list-item"
        >{{ tool }}</span
      >
    </p>
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

.project-detail__list-item {
  &:not(:last-child) {
    margin-right: $s;
  }
}
</style>
