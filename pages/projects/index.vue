<template>
  <div>
    <h1>Projects</h1>
    <NuxtLink to="/">Home</NuxtLink>
    <ProjectGrid :projects="page.projects" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ProjectPage',
  async asyncData({ $content }) {
    const page = await $content('projects', 'index').fetch()
    return {
      page,
    }
  },
})
</script>


