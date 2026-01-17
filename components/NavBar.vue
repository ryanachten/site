<template>
  <nav :class="{ navbar: true, 'navbar--inverted': invertColors }">
    <NuxtLink to="/" aria-label="home page">
      <LogoText />
    </NuxtLink>
    <div>
      <NuxtLink to="/projects">Projects</NuxtLink>
      <NuxtLink to="/cv">CV</NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  invertColors?: boolean
}>()
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
      color: $black;
    }
  }
}
</style>
