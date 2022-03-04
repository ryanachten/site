<template>
  <div class="landing">
    <LogoText class="landing__logo" />
    <div class="landing__links">
      <NuxtLink to="/projects">Projects</NuxtLink>
      <NuxtLink to="/cv">CV</NuxtLink>
    </div>
    <button @click="triggerAnimation()">Animate</button>
    <ThreeTest ref="three" @click="triggerAnimation()" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ThreeTest from 'components/ThreeTest.vue'

export default Vue.extend({
  name: 'IndexPage',

  methods: {
    triggerAnimation() {
      const three = this.$refs.three as InstanceType<typeof ThreeTest>
      three.animate()
    },
  },
})
</script>

<style lang="scss" scoped>
.landing {
  align-items: center;
  display: flex;
  flex-flow: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
}

.landing__logo {
  margin-bottom: $s;
}

.landing__links {
  display: flex;
  justify-content: center;
  margin-bottom: $l;

  a {
    @include subheader;
    &:not(:last-child) {
      margin-right: $m;
    }

    &.nuxt-link-active {
      font-weight: bold;
    }
  }
}
</style>
