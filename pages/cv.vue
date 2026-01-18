<template>
  <div class="page">
    <div class="page__container">
      <NavBar />
      <main class="cv__content">
        <LogoImg class="cv__logo" />
        <h1 class="cv__header">Curriculum Vitae</h1>
        <ContentRenderer :value="page" class="content" />
      </main>
      <FooterNav />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData('cv', () =>
  queryContent('cv').findOne()
)

if (!page.value) {
  throw createError({ statusCode: 404, message: 'Page not found' })
}
</script>

<style lang="scss">
@use '../styles/variables.scss' as *;
@use '../styles/mixins.scss' as *;
.cv__logo {
  display: block;
  height: fit-content;
  margin: $m auto 0 auto;
  min-width: 200px;
  width: 40%;
}
.cv__header {
  margin-top: 0;
}
.cv__content {
  @include divider;
  margin: 0 auto $m auto;
  max-width: 800px;
  padding-bottom: $l;
  text-align: left;

  h2 {
    &:not(:first-child) {
      border-top: 1px solid $dark-grey;
      padding-top: $m;
    }
  }

  strong {
    display: inline-block;
    margin-top: $s;
    white-space: pre-wrap;
  }

  li {
    font-size: $font-xs;
  }

  table {
    td {
      padding: 0;
      vertical-align: top;

      p,
      strong {
        margin: 0;
      }

      &:nth-child(2) {
        padding-left: $m;
        text-align: left;
      }
    }

    tr {
      &:not(:last-child) {
        td {
          padding-bottom: $s;
        }
      }
    }
  }
}
</style>
