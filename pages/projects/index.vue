<template>
  <div>
    <h1>Projects</h1>
    <NuxtLink to="/">Home</NuxtLink>
    <ul>
      <li v-for="{name, heroImage} in page.projects" :key="name">
        <NuxtLink :to="`/projects/${name.toLowerCase()}`">
          <img v-if="heroImage" :src="heroImage" :alt="name" />
          <span>{{name}}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "ProjectPage",
  async asyncData({ $content }) {
    const page = await $content("projects", "index")
      .fetch()
    return {
      page
    };
  }
}
</script>
