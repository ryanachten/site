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
  Texture,
  TextureLoader,
  Vector4,
  WebGLRenderer,
} from 'three'
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'

import { isWebGLAvailable } from '~/helpers'
export default Vue.extend({
  data(): {
    camera: PerspectiveCamera
    textures: Texture[]
    height: number
    width: number
    material: ShaderMaterial
    renderer: WebGLRenderer | null
    plane: Mesh
    scene: Scene
    progress: number
  } {
    return {
      camera: new PerspectiveCamera(),
      material: new ShaderMaterial(),
      textures: [],
      height: 0,
      width: 0,
      renderer: null,
      plane: new Mesh(),
      scene: new Scene(),
      progress: 0,
    }
  },

  mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement
    this.init(canvas)
  },

  methods: {
    resize() {
      const canvas = this.$refs.canvas as HTMLCanvasElement
      this.width = canvas.width
      this.height = canvas.height
      this.renderer?.setSize(this.width, this.height)
      this.camera.aspect = this.width / this.height

      const imageAspect =
        this.textures[0].image.height / this.textures[0].image.width
      let a1
      let a2
      if (this.height / this.width > imageAspect) {
        a1 = (this.width / this.height) * imageAspect
        a2 = 1
      } else {
        a1 = 1
        a2 = this.height / this.width / imageAspect
      }

      this.material.uniforms.resolution.value.x = this.width
      this.material.uniforms.resolution.value.y = this.height
      this.material.uniforms.resolution.value.z = a1
      this.material.uniforms.resolution.value.w = a2

      const dist = this.camera.position.z
      const height = 1
      this.camera.fov = 2 * (180 / Math.PI) * Math.atan(height / (2 * dist))

      this.plane.scale.x = this.camera.aspect
      this.plane.scale.y = 1

      this.camera.updateProjectionMatrix()
    },

    async loadTextures() {
      const imageTexture1 = await new TextureLoader().loadAsync(
        'hero-images/whosagoodboy.gif'
      )
      const imageTexture2 = await new TextureLoader().loadAsync(
        'hero-images/robic.jpg'
      )
      imageTexture1.minFilter = LinearFilter
      imageTexture2.minFilter = LinearFilter

      this.textures.push(imageTexture1, imageTexture2)
    },

    createMaterial() {
      this.material = new ShaderMaterial({
        // extensions: {
        //   derivatives: "#extension GL_OES_standard_derivatives : enable"
        // },
        side: DoubleSide,
        uniforms: {
          time: { value: 0 },
          progress: { value: 0 },
          border: { value: 0 },
          intensity: { value: 50 },
          scaleX: { value: 40 },
          scaleY: { value: 40 },
          transition: { value: 40 },
          swipe: { value: 0 },
          width: { value: 0 },
          radius: { value: 0 },
          texture1: { value: this.textures[0] },
          texture2: { value: this.textures[1] },
          // displacement: { value: new TextureLoader().load('img/disp1.jpg') },
          resolution: { value: new Vector4() },
        },
        // wireframe: true,
        vertexShader,
        fragmentShader,
      })
    },

    // Useful references:
    // - https://github.com/akella/webGLImageTransitions/blob/master/js/sketch.js
    // - https://github.com/akella/webGLImageTransitions/blob/master/js/demo8.js
    // - https://tympanus.net/codrops/2019/11/05/creative-webgl-image-transitions/
    async init(canvas: HTMLCanvasElement) {
      const hasWebGl = isWebGLAvailable(canvas)
      if (!hasWebGl) console.error('no webgl support')

      this.height = canvas.height
      this.width = canvas.width

      await this.loadTextures()
      this.createMaterial()

      const camera = new PerspectiveCamera(
        70,
        this.width / this.height,
        0.001,
        1000
      )
      camera.position.set(0, 0, 2)
      this.camera = camera

      const geometry = new PlaneGeometry(1, 1, 2, 2)
      this.plane = new Mesh(geometry, this.material)
      this.scene.add(this.plane)

      this.renderer = new WebGLRenderer({ canvas })
      this.renderer.setSize(this.width, this.height)
      this.renderer.setPixelRatio(window.devicePixelRatio)

      this.resize()

      this.renderer.render(this.scene, this.camera)
    },

    animate() {
      const frame = requestAnimationFrame(this.animate)
      this.renderer?.render(this.scene, this.camera)
      this.progress += 0.01
      this.material.uniforms.progress.value = this.progress
      if (this.progress >= 1) {
        cancelAnimationFrame(frame)
        this.progress = 0
      }
    },
  },
})
</script>
