<script setup>
import * as THREE from 'three'
import { onMounted } from 'vue'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
onMounted(() => {
  debugger
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 5
  camera.position.y = 2
  camera.position.x = 2
  camera.lookAt(0, 0, 0)
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(geometry, material)
  const axisHelper = new THREE.AxesHelper(5)
  scene.add(cube)
  scene.add(axisHelper)
  renderer.render(scene, camera)
  // const animate = () => {
  //   requestAnimationFrame(animate)
  //   cube.rotation.x += 0.01
  //   cube.rotation.y += 0.01
  //   renderer.render(scene, camera)
  // }
  // animate()
})
</script>

<template></template>

<style scoped></style>
