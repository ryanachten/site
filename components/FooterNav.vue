<template>
  <footer class="footer">
    <NavBar :invert-colors="invertColors" />
  </footer>
</template>

<script setup lang="ts">
defineProps<{
  invertColors?: boolean
}>()
</script>

<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
@use '../styles/mixins.scss' as *;
.footer {
  margin-top: $l;
}
</style>
