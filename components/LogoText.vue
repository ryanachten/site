<template>
  <span class="logo" :class="logoSizeClass" aria-label="Ryan Achten"
    >ryanachten</span
  >
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: 'medium' | 'large'
  }>(),
  {
    size: 'medium',
  }
)

const logoSizeClass = computed(() => 
  props.size === 'medium' ? 'logo--medium' : 'logo--large'
)
</script>

<style lang="scss" scoped>
.logo {
  font-family: $font-title;
  font-size: $font-m;
  font-weight: bold;

  &--large {
    font-size: $font-l;
  }
}
</style>
