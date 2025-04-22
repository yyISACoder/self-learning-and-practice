<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { onMounted } from 'vue'
import { Button } from 'ant-design-vue'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js'

onMounted(() => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(geometry, material)
  const axisHelper = new THREE.AxesHelper(5)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.screenSpacePanning = false
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load(
    '../../public/v2-292a49c111c34c5aa45e9fbdd8378031_r.jpg'
  )
  texture.colorSpace = THREE.SRGBColorSpace
  const planeGeometry = new THREE.PlaneGeometry(5, 5)
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    map: texture
  })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  const rgbeLoader = new RGBELoader()
  // rgbeLoader.load('../../public/green_point_park_4k.hdr', (texture) => {
  //   texture.mapping = THREE.EquirectangularReflectionMapping
  //   scene.background = texture
  //   scene.environment = texture
  // })
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(3, 3, 3)
  scene.add(directionalLight)

  const gltfLoader = new GLTFLoader()
  gltfLoader.load(
    '../../public/superman 超人 带动画_爱给网_aigei_com/scene.gltf',
    (gltf) => {
      debugger
      const model = gltf.scene
      model.position.set(3, 3, 3)
      scene.add(model)
    }
  )
  const ball1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  )
  ball1.position.set(-2, 0, 0)

  const ball2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
  )
  ball2.position.set(2, 0, 0)

  const ball3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  )
  const tween = new TWEEN.Tween(ball3.position)
  tween.to({ x: 2, y: 2, z: 2 }, 1000)
  tween.start()

  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects([ball1, ball2, ball3])
    if (intersects.length > 0) {
      const object = intersects[0].object
      object.position.set(
        Math.random() * 4 - 2,
        Math.random() * 4 - 2,
        Math.random() * 4 - 2
      )
    }
  })

  //scene.add(ball1, ball2, ball3)

  // scene.add(plane)
  scene.add(axisHelper)
  // scene.add(cube)
  camera.position.z = 5
  camera.position.y = 2
  camera.position.x = 2
  camera.lookAt(0, 0, 0)

  function animate() {
    controls.update()
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)

    tween.update()
  }

  animate()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  const gui = new GUI()
  gui.add(cube.position, 'x').name('立方体x坐标').min(-5).max(5).step(0.1)
  gui.add(cube.position, 'y').name('立方体y坐标').min(-5).max(5).step(0.1)
  gui.add(cube.position, 'z').name('立方体z坐标').min(-5).max(5).step(0.1)
})
const onFullScreen = () => {
  document.body.requestFullscreen()
}
const onExitFullScreen = () => {
  document.exitFullscreen()
}
</script>

<template>
  <Button type="primary" @click="onFullScreen">全屏</Button>
  <Button @click="onExitFullScreen">退出全屏</Button>
</template>

<style scoped></style>
