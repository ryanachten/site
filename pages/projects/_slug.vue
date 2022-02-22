<template>
  <div class="page">
    <main class="page__container">
      <NavBar invert-colors />
      <ProjectDetail v-if="page" :content="page" />
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
      // TODO: handle this properly
      // eslint-disable-next-line node/handle-callback-err
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
</style>
