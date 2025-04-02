<script setup>
import { ref, onMounted } from 'vue'
import 'ol/ol.css'
import { Map, View } from 'ol'
import Tile from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import BingMaps from 'ol/source/BingMaps'
import XYZ from 'ol/source/XYZ'
import { transform } from 'ol/proj'

let mapInstance

onMounted(() => {
  initMap()
})

function initMap() {
  debugger
  mapInstance = new Map({
    target: 'mapContainer',
    layers: [
      new Tile({
        source: new XYZ({
          wrapX: false,
          url: 'http://t0.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=3e3059b01c5c4199fb64f898f30a9c1c'
        })
      }),
      new Tile({
        source: new XYZ({
          wrapX: false,
          url: 'http://t0.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=3e3059b01c5c4199fb64f898f30a9c1c'
        })
      })
    ],
    view: new View({
      center: [0, 0],
      zoom: 2
    })
  })
}
</script>

<template>
  <div class="wrapper">
    <div id="mapContainer" class="map-container"></div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  width: 100vw;
  height: 100vh;
  .map-container {
    width: 100%;
    height: 100%;
  }
}
</style>
