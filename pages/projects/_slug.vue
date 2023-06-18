<template>
  <div class="page">
    <div class="page__container">
      <NavBar invert-colors />
      <main class="project__wrapper">
        <ProjectDetail :content="page" class="project__detail" />
        <ProjectMetadata :project="page" class="project__metadata" />
      </main>
      <FooterNav invert-colors />
    </div>
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
  max-height: 100vh;
  overflow-y: auto;
  position: sticky;
  top: $m;

  @media screen and (min-width: $desktop) {
    margin-top: 0;
    margin-left: $l;
    max-width: 300px;
  }
}
</style>
