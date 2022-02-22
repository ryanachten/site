<template>
  <nav :class="{ navbar: true, 'navbar--inverted': invertColors }">
    <NuxtLink to="/" aria-label="home page">
      <LogoText />
    </NuxtLink>
    <div>
      <NuxtLink to="/projects">Projects</NuxtLink>
      <NuxtLink to="/cv">CV</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    invertColors: {
      type: Boolean,
    },
  },
})
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: $l;

  a {
    @include subheader;
    &:not(:last-child) {
      margin-right: $m;
    }

    &.nuxt-link-active {
      font-weight: bold;
    }
  }

  &.navbar--inverted {
    a {
      @include inverted-colors;
    }
  }
}
</style>
