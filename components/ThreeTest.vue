<template>
  <canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  DoubleSide,
  LinearFilter,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector4,
  WebGLRenderer,
} from 'three'
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'

import { isWebGLAvailable } from '~/helpers'
export default Vue.extend({
  mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement
    this.init(canvas)
  },

  methods: {
    // Useful references:
    // - https://github.com/akella/webGLImageTransitions/blob/master/js/sketch.js
    // - https://tympanus.net/codrops/2019/11/05/creative-webgl-image-transitions/
    init: async (canvas: HTMLCanvasElement) => {
      console.log('vertextShaderTest', vertexShader)

      const hasWebGl = isWebGLAvailable(canvas)
      if (!hasWebGl) console.error('no webgl support')

      const renderer = new WebGLRenderer({ canvas })
      const imageTexture1 = await new TextureLoader().loadAsync(
        'hero-images/whosagoodboy.gif'
      )
      const imageTexture2 = await new TextureLoader().loadAsync(
        'hero-images/robic.jpg'
      )
      imageTexture1.minFilter = LinearFilter
      imageTexture2.minFilter = LinearFilter

      // const material = new MeshBasicMaterial({
      //   map: imageTexture1,
      // })
      const material = new ShaderMaterial({
        // extensions: {
        //   derivatives: "#extension GL_OES_standard_derivatives : enable"
        // },
        side: DoubleSide,
        uniforms: {
          time: { value: 0 },
          progress: { value: 0 },
          border: { value: 0 },
          intensity: { value: 0 },
          scaleX: { value: 40 },
          scaleY: { value: 40 },
          transition: { value: 40 },
          swipe: { value: 0 },
          width: { value: 0 },
          radius: { value: 0 },
          texture1: { value: imageTexture1 },
          texture2: { value: imageTexture2 },
          // displacement: { value: new TextureLoader().load('img/disp1.jpg') },
          resolution: { value: new Vector4() },
        },
        // wireframe: true,
        vertexShader,
        fragmentShader,
      })

      const height = canvas.height
      const width = canvas.width
      renderer.setSize(width, height)

      const camera = new PerspectiveCamera(45, width / height, 0.001, 1000)
      camera.position.set(0, 0, 500)
      camera.lookAt(0, 0, 0)

      const scene = new Scene()

      const geometry = new PlaneGeometry(
        imageTexture1.image.width,
        imageTexture1.image.height,
        2,
        2
      )

      const mesh = new Mesh(geometry, material)

      scene.add(mesh)
      renderer.render(scene, camera)
    },
  },
})
</script>
