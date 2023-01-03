<template>
  <img :src="logoSrcPath" width="374" height="372" alt="Ryan Achten logo" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    isTransparent: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    logoSrcPath(): string {
      const fileName = this.isTransparent ? 'logo-transparent' : 'logo'
      return `/icons/${fileName}.svg`
    },
  },
})
</script>
