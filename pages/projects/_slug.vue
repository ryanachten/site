<template>
  <div class="page">
    <main class="page__container">
      <NavBar invert-colors />
      <div class="project__wrapper">
        <ProjectDetail :content="page" class="project__detail" />
        <ProjectMetadata :project="page" class="project__metadata" />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content, params, error }) {
    const slug = params.slug
    const page = await $content('projects', slug)
      .fetch()
      .catch((_) => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    return {
      page,
    }
  },
})
</script>

<style lang="scss" scoped>
.page {
  @include inverted-colors;
}

.project__wrapper {
  display: flex;

  @media screen and (max-width: $desktop) {
    flex-flow: wrap;
  }
}

.project__metadata {
  margin-top: $m;

  @media screen and (min-width: $desktop) {
    margin-top: 0;
    margin-left: $l;
  }
}
</style>
