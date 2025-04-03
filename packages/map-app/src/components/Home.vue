<script setup>
import { ref, onMounted } from 'vue'
import 'ol/ol.css'
import { Map, View } from 'ol'
import Tile from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import BingMaps from 'ol/source/BingMaps'
import XYZ from 'ol/source/XYZ'
import { fromLonLat } from 'ol/proj'

let mapInstance
const apiKey = '3e3059b01c5c4199fb64f898f30a9c1c'

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
          tileUrlFunction: function (tileCoord) {
            debugger
            var z = tileCoord[0]
            var x = tileCoord[1]
            var y = tileCoord[2]
            if (y === undefined) return ''
            var y_tms = Math.pow(2, z) - 1 - y
            return (
              'http://t0.tianditu.gov.cn/vec_w/wmts?' +
              'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0' +
              '&LAYER=vec&STYLE=default&TILEMATRIXSET=w' +
              '&FORMAT=image/png' +
              '&TILEMATRIX=' +
              z +
              '&TILEROW=' +
              y +
              '&TILECOL=' +
              x +
              '&tk=' +
              apiKey
            )
          }
        })
      }),
      new Tile({
        source: new XYZ({
          wrapX: false,
          tileUrlFunction: function (tileCoord) {
            const z = tileCoord[0]
            const x = tileCoord[1]
            const y = tileCoord[2]
            if (y === undefined) return ''
            const y_tms = Math.pow(2, z) - 1 - y // TMS行号反转
            return (
              'http://t0.tianditu.gov.cn/cva_w/wmts?' +
              'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0' +
              '&LAYER=cva&STYLE=default&TILEMATRIXSET=w' +
              '&FORMAT=image/png' +
              '&TILEMATRIX=' +
              z +
              '&TILEROW=' +
              y +
              '&TILECOL=' +
              x +
              '&tk=' +
              apiKey
            )
          }
        })
      })
    ],
    view: new View({
      center: fromLonLat([116.4, 39.9]), // 北京市中心
      zoom: 2,
      projection: 'EPSG:3857'
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
