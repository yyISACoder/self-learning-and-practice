<template>
  <div class="wrapper">
    <button @click="takePhoto">拍照</button>
    <canvas id="canvas"></canvas>
    <video id="localVideo" autoplay playsinline muted></video>
    <div class="img-box">
      <div v-for="(item, index) in imgList" :key="index" class="item">
        <img :src="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const imgList = ref([])

const init = async () => {
  // 获取媒体流
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
  })

  const videoEl = document.getElementById('localVideo')
  videoEl.srcObject = stream
}
const takePhoto = () => {
  const videoEl = document.getElementById('localVideo')!
  const canvas = document.createElement('canvas')!
  canvas.width = videoEl.videoWidth
  canvas.height = videoEl.videoHeight
  const ctx = canvas.getContext('2d')
  ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height)
  imgList.value.push(canvas.toDataURL('image/png'))

  // 添加滤镜
  const filterList = [
    'blur(5px)', // 模糊
    'brightness(0.5)', // 亮度
    'contrast(200%)', // 对比度
    'grayscale(100%)', // 灰度
    'hue-rotate(90deg)', // 色相旋转
    'invert(100%)', // 反色
    'opacity(90%)', // 透明度
    'saturate(200%)', // 饱和度
    'saturate(20%)', // 饱和度
    'sepia(100%)', // 褐色
    'drop-shadow(4px 4px 8px blue)' // 阴影
  ]

  for (let i = 0; i < filterList.length; i++) {
    ctx.filter = filterList[i]
    ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height)
    imgList.value.push(canvas.toDataURL('image/png'))
  }
}

onMounted(() => {
  init()
})
</script>
<style scoped lang="less">
.wrapper {
  .img-box {
    display: flex;
    flex-wrap: wrap;
  }
  .img-box .item {
    width: 200px;
    margin: 15px;
  }
  .img-box .item img {
    width: 100%;
  }
}
</style>
