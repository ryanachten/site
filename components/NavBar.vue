<template>
  <nav class="navbar">
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

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: $m;

  a {
    @include subheader;
    &:not(:last-child) {
      margin-right: $m;
    }

    &.nuxt-link-active {
      font-weight: bold;
    }
  }
}
</style>
