<template>
  <article class="project-detail">
    <ContentRenderer :value="content" />
  </article>
</template>

<script setup lang="ts">
defineProps<{
  content: any
}>()
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
