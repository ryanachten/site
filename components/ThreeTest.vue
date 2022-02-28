<template>
  <canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from 'three'
import { isWebGLAvailable } from '~/helpers'
export default Vue.extend({
  mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement
    this.init(canvas)
  },

  methods: {
    init: async (canvas: HTMLCanvasElement) => {
      const hasWebGl = isWebGLAvailable(canvas)
      if (!hasWebGl) console.error('no webgl support')

      const renderer = new WebGLRenderer({ canvas })
      const imageTexture = await new TextureLoader().loadAsync(
        'hero-images/whosagoodboy.gif'
      )

      const material = new MeshBasicMaterial({
        map: imageTexture,
      })
      console.log('imageTexture', imageTexture)

      const height = canvas.height
      const width = canvas.width
      renderer.setSize(width, height)

      const camera = new PerspectiveCamera(45, width / height, 1, 1000)
      camera.position.set(0, 0, 400)
      camera.lookAt(0, 0, 0)

      const scene = new Scene()

      const geometry = new BoxGeometry(200, 200, 200)

      const mesh = new Mesh(geometry, material)

      scene.add(mesh)
      renderer.render(scene, camera)
    },
  },
})
</script>
