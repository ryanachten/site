<template>
  <footer class="footer">
    <NavBar :invert-colors="invertColors" />
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    invertColors: {
      type: Boolean,
    },
  },
})
</script>

<style lang="scss" scoped>
.footer {
  margin-top: $l;
}
</style>
