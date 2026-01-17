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
.footer {
  margin-top: $l;
}
</style>
