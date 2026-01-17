<template>
  <canvas
    ref="canvas"
    class="image-transition__canvas"
    :class="{
      'image-transition--loaded': textures.length > 0,
      [className]: Boolean(className),
    }"
  ></canvas>
</template>

<script setup lang="ts">
// Heavily inspired by:
// - https://tympanus.net/codrops/2019/11/05/creative-webgl-image-transitions/
import { ref, shallowRef, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
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

import vertexShader from '../shaders/vertex.glsl?raw'
import noiseWarpFrag from '../shaders/noise-warp.frag?raw'
import verticalWarpFrag from '../shaders/vertical-warp.frag?raw'

import { isWebGLAvailable } from '~/helpers'

type ShaderOptions = 'vertical-warp' | 'noise-warp'

const fps = 30
const fpsInterval = 1000 / fps

const props = defineProps<{
  images: string[]
  shader: ShaderOptions
  previousIndex: number
  currentIndex: number
  className?: string
}>()

const emit = defineEmits<{
  (e: 'animation-complete'): void
}>()

const canvas = ref<HTMLCanvasElement>()
const camera = shallowRef(new PerspectiveCamera())
const textures = shallowRef<Texture[]>([])
const height = ref(0)
const width = ref(0)
const material = shallowRef(new ShaderMaterial())
const renderer = shallowRef<WebGLRenderer | null>(null)
const plane = shallowRef(new Mesh())
const scene = shallowRef(new Scene())
const progress = ref(0)
const time = ref(props.shader === 'vertical-warp' ? 0 : 0.5)
const frame = ref<number | null>(null)
const then = ref(Date.now())

const isVerticalShader = props.shader === 'vertical-warp'
const fragmentShader = isVerticalShader ? verticalWarpFrag : noiseWarpFrag

watch(() => props.currentIndex, () => {
  if (textures.value.length > 0) {
    start()
  }
})

onMounted(() => {
  if (!canvas.value) {
    console.error('Canvas not found')
  } else {
    nextTick(() => init(canvas.value!))
    window.addEventListener('resize', resize)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  if (frame.value !== null) {
    cancelAnimationFrame(frame.value)
  }
  if (renderer.value) {
    renderer.value.dispose()
    renderer.value = null
  }
})

function resize() {
  if (!canvas.value || textures.value.length === 0) return
  
  width.value = canvas.value.offsetWidth
  height.value = canvas.value.offsetHeight
  renderer.value?.setSize(width.value, height.value, false)
  camera.value.aspect = width.value / height.value

  const imageAspect =
    textures.value[0].image.height / textures.value[0].image.width
  let a1
  let a2
  if (height.value / width.value > imageAspect) {
    a1 = (width.value / height.value) * imageAspect
    a2 = 1
  } else {
    a1 = 1
    a2 = height.value / width.value / imageAspect
  }

  material.value.uniforms.resolution.value.x = width.value
  material.value.uniforms.resolution.value.y = height.value
  material.value.uniforms.resolution.value.z = a1
  material.value.uniforms.resolution.value.w = a2

  const dist = camera.value.position.z
  const heightVal = 1
  camera.value.fov = 2 * (180 / Math.PI) * Math.atan(heightVal / (2 * dist))

  plane.value.scale.x = camera.value.aspect
  plane.value.scale.y = 1

  camera.value.updateProjectionMatrix()
}

async function loadTextures() {
  const host = window.location.origin
  const loadedTextures = await Promise.all(
    props.images.map(
      async (uri) => await new TextureLoader().loadAsync(`${host}/${uri}`)
    )
  )
  loadedTextures.forEach((x) => {
    x.minFilter = LinearFilter
  })

  textures.value = loadedTextures
}

function createMaterial() {
  material.value = new ShaderMaterial({
    side: DoubleSide,
    uniforms: {
      time: { value: 0 },
      progress: { value: 0 },
      texture1: { value: textures.value[props.previousIndex] },
      texture2: { value: textures.value[props.currentIndex] },
      resolution: { value: new Vector4() },
    },
    vertexShader,
    fragmentShader,
  })
}

async function init(canvasEl: HTMLCanvasElement) {
  const hasWebGl = isWebGLAvailable()
  if (!hasWebGl) console.error('no webgl support')

  height.value = canvasEl.offsetWidth
  width.value = canvasEl.offsetWidth

  await loadTextures()
  createMaterial()

  const cam = new PerspectiveCamera(
    70,
    width.value / height.value,
    0.001,
    1000
  )
  cam.position.set(0, 0, 2)
  camera.value = cam

  const geometry = new PlaneGeometry(1, 1, 2, 2)
  plane.value = new Mesh(geometry, material.value)
  scene.value.add(plane.value)

  renderer.value = new WebGLRenderer({ canvas: canvasEl })
  renderer.value.setPixelRatio(window.devicePixelRatio)

  resize()
  renderer.value?.render(scene.value, camera.value)
  start()
}

function start() {
  stop()
  material.value.uniforms.texture1.value = textures.value[props.previousIndex]
  material.value.uniforms.texture2.value = textures.value[props.currentIndex]
  resize()
  animate()
}

function stop() {
  frame.value !== null && cancelAnimationFrame(frame.value)
  progress.value = 0
}

function animate() {
  frame.value = requestAnimationFrame(animate)

  const now = Date.now()
  const elapsed = now - then.value
  if (elapsed < fpsInterval) return

  then.value = now - (elapsed % fpsInterval)
  draw()
}

function draw() {
  progress.value += 0.02
  time.value += 0.01
  material.value.uniforms.progress.value = progress.value
  material.value.uniforms.time.value = time.value
  renderer.value?.render(scene.value, camera.value)

  if (progress.value >= 1) {
    stop()
    emit('animation-complete')
  }
}
</script>

<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
.image-transition__canvas {
  opacity: 0;
  height: 100%;
  transition: 0.5s;
  width: 100%;

  &.image-transition--loaded {
    opacity: 1;
  }
}
</style>
