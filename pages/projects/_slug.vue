<template>
  <div>
    <h1>{{ page.title }}</h1>
    <p>{{ page.description }}</p>
    <nuxt-content :document="page"/>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const slug = params.slug;
    const page = await $content("projects", slug)
      .fetch()
      // TODO: handle this properly
      // eslint-disable-next-line node/handle-callback-err
      .catch((_) => {
        error({ statusCode: 404, message: "Page not found" });
      });

    return {
      page
    };
  }
};
</script>
