<template>
  <img :src="logoSrcPath" width="374" height="372" alt="Ryan Achten logo" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isTransparent?: boolean
}>()

const logoSrcPath = computed(() => {
  const fileName = props.isTransparent ? 'logo-transparent' : 'logo'
  return `/icons/${fileName}.svg`
})
</script>
