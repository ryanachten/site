<template>
  <canvas ref="canvas" class="image-transition__canvas"></canvas>
</template>

<script lang="ts">
// Heavily inspired by:
// - https://tympanus.net/codrops/2019/11/05/creative-webgl-image-transitions/
import Vue, { PropType } from 'vue'
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
import fragmentShader from '../shaders/vertical-warp.frag'

import { isWebGLAvailable } from '~/helpers'
export default Vue.extend({
  props: {
    images: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
    previousIndex: {
      type: Number,
      required: true,
    },
    currentIndex: {
      type: Number,
      required: true,
    },
  },

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
    time: number
    frame: number | null
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
      time: 0,
      frame: null,
    }
  },

  watch: {
    currentIndex() {
      this.start()
    },
  },

  mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement
    this.init(canvas)
    window.addEventListener('resize', this.resize)
  },

  methods: {
    resize() {
      const canvas = this.$refs.canvas as HTMLCanvasElement
      this.width = canvas.offsetWidth
      this.height = canvas.offsetHeight
      this.renderer?.setSize(this.width, this.height, false)
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
      const textures = await Promise.all(
        this.images.map(async (uri) => await new TextureLoader().loadAsync(uri))
      )
      textures.forEach((x) => {
        x.minFilter = LinearFilter
      })

      this.textures = textures
    },

    createMaterial() {
      this.material = new ShaderMaterial({
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
          texture1: { value: this.textures[this.previousIndex] },
          texture2: { value: this.textures[this.currentIndex] },
          resolution: { value: new Vector4() },
        },
        vertexShader,
        fragmentShader,
      })
    },

    async init(canvas: HTMLCanvasElement) {
      const hasWebGl = isWebGLAvailable(canvas)
      if (!hasWebGl) console.error('no webgl support')

      this.height = canvas.offsetHeight
      this.width = canvas.offsetWidth

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
      this.renderer.setPixelRatio(window.devicePixelRatio)

      this.resize()
      this.renderer?.render(this.scene, this.camera)
    },

    start() {
      this.stop()
      this.material.uniforms.texture1.value = this.textures[this.previousIndex]
      this.material.uniforms.texture2.value = this.textures[this.currentIndex]
      this.resize()
      this.animate()
    },

    stop() {
      this.frame !== null && cancelAnimationFrame(this.frame)
      this.progress = 0
      this.time = 0
    },

    animate() {
      this.frame = requestAnimationFrame(this.animate)
      this.progress += 0.01
      this.time += 0.05
      this.material.uniforms.progress.value = this.progress
      this.material.uniforms.time.value = this.time
      this.renderer?.render(this.scene, this.camera)

      if (this.progress >= 1) {
        this.stop()
        this.$emit('animation-complete')
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.image-transition__canvas {
  height: 100%;
  width: 100%;
}
</style>
