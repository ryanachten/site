<template>
  <span class="logo" :class="logoSizeClass" aria-label="Ryan Achten"
    >ryanachten</span
  >
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
export default Vue.extend({
  props: {
    size: {
      type: String as PropType<'medium' | 'large'>,
      default: 'medium',
    },
  },
  computed: {
    logoSizeClass(): string {
      return this.size === 'medium' ? 'logo--medium' : 'logo--large'
    },
  },
})
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
