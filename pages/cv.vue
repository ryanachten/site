<template>
  <div class="page">
    <div class="page__container">
      <NavBar />
      <main class="cv__content">
        <LogoImg class="cv__logo" />
        <h1>curriculum vitae</h1>
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
.cv__logo {
  display: block;
  height: fit-content;
  margin: $l auto $m auto;
  min-width: 200px;
  width: 35%;
}
.cv__content {
  margin: 0 auto;
  max-width: 800px;
  text-align: left;

  table {
    td {
      padding: 0;

      &:nth-child(2) {
        padding-left: $m;
        text-align: left;
      }
    }
  }
}
</style>
