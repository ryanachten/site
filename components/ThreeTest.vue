<template>
  <canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  BufferGeometry,
  Line,
  LineBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three'
import { isWebGLAvailable } from '~/helpers'
export default Vue.extend({
  mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement

    const hasWebGl = isWebGLAvailable(canvas)
    if (!hasWebGl) console.error('no webgl support')

    const renderer = new WebGLRenderer({ canvas })
    const height = canvas.height
    const width = canvas.width
    renderer.setSize(width, height)

    const camera = new PerspectiveCamera(45, width / height, 1, 500)
    camera.position.set(0, 0, 100)
    camera.lookAt(0, 0, 0)

    const scene = new Scene()
    const material = new LineBasicMaterial({ color: 0x0000ff })
    const points = []
    points.push(new Vector3(-10, 0, 0))
    points.push(new Vector3(0, 10, 0))
    points.push(new Vector3(10, 0, 0))

    const geometry = new BufferGeometry().setFromPoints(points)

    const line = new Line(geometry, material)

    scene.add(line)
    renderer.render(scene, camera)
  },
})
</script>
