<template>
  <div class="page">
    <div class="page__container">
      <NavBar />
      <main class="cv__content">
        <nuxt-content :document="page" class="content" />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'CvPage',
  async asyncData({ $content, error }) {
    const page = await $content('cv')
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

<style lang="scss">
.cv__content {
  margin: 0 auto;
  text-align: center;
  width: 80%;

  ul {
    @include list-reset;
  }

  table {
    margin: 0 auto;

    td {
      &:nth-child(2) {
        padding-left: $m;
        text-align: left;
      }
    }
  }
}
</style>
