<script setup>
import { ref, onMounted } from 'vue'
import 'ol/ol.css'
import { Map, View, Feature } from 'ol'
import Tile from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import BingMaps from 'ol/source/BingMaps'
import XYZ from 'ol/source/XYZ'
import VectorSource from 'ol/source/Vector'
import { fromLonLat, transform } from 'ol/proj'
import VectorLayer from 'ol/layer/Vector'
import { GeoJSON } from 'ol/format'
import { LineString } from 'ol/geom'
import { Style, Stroke, Circle, Fill } from 'ol/style'
import AMapLoader from '@amap/amap-jsapi-loader'

let mapInstance
let trafficLayer = null
let AMap
const apiKey_td = '3e3059b01c5c4199fb64f898f30a9c1c'
const apiKey_gd_js = '809705cb81ca6b60e5e56f4db505e275'
const apiKey_gd_web = 'b2ea870bf7fbc6c05e8c847114d13ffb'

onMounted(async () => {
  //await initGDMap()
  initMap()
  //loadTrafficData()
})

async function initGDMap() {
  AMap = await AMapLoader.load({
    key: apiKey_gd_js, // 必填
    version: '2.0' // 指定 API 版本，默认 1.4.15
    //plugins: ['AMap.convertFromGCJ02'], // 按需加载插件
  })
}
function initMap() {
  debugger
  mapInstance = new Map({
    target: 'mapContainer',
    layers: [
      // new Tile({
      //   source: new XYZ({
      //     wrapX: false,
      //     projection: 'EPSG:3857',
      //     tileUrlFunction: function (tileCoord) {
      //       const z = tileCoord[0]
      //       const x = tileCoord[1]
      //       const y = tileCoord[2]
      //       if (y === undefined) return ''
      //       const y_tms = Math.pow(2, z) - 1 - y // TMS行号反转
      //       return (
      //         'http://t0.tianditu.gov.cn/ter_w/wmts?' +
      //         'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0' +
      //         '&LAYER=ter&STYLE=default&TILEMATRIXSET=w' +
      //         '&FORMAT=image/png' +
      //         '&TILEMATRIX=' +
      //         z +
      //         '&TILEROW=' +
      //         y +
      //         '&TILECOL=' +
      //         x +
      //         '&tk=' +
      //         apiKey_td
      //       )
      //     }
      //   })
      // }),
      new VectorLayer({
        opacity: 1,
        source: new VectorSource({
          url: '../assets/json/中华人民共和国.json', // GeoJSON文件路径
          format: new GeoJSON()
        })
      })
      // new Tile({
      //   source: new XYZ({
      //     wrapX: false,
      //     projection: 'EPSG:3857',
      //     tileUrlFunction: function (tileCoord) {
      //       const z = tileCoord[0]
      //       const x = tileCoord[1]
      //       const y = tileCoord[2]
      //       if (y === undefined) return ''
      //       const y_tms = Math.pow(2, z) - 1 - y // TMS行号反转
      //       return (
      //         'http://t0.tianditu.gov.cn/ter_w/wmts?' +
      //         'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0' +
      //         '&LAYER=ter&STYLE=default&TILEMATRIXSET=w' +
      //         '&FORMAT=image/png' +
      //         '&TILEMATRIX=' +
      //         z +
      //         '&TILEROW=' +
      //         y +
      //         '&TILECOL=' +
      //         x +
      //         '&tk=' +
      //         apiKey_td
      //       )
      //     }
      //   })
      // }),
      // new Tile({
      //   opacity: 0.7,
      //   source: new XYZ({
      //     wrapX: false,
      //     projection: 'EPSG:3857',
      //     tileUrlFunction: function (tileCoord) {
      //       debugger
      //       var z = tileCoord[0]
      //       var x = tileCoord[1]
      //       var y = tileCoord[2]
      //       if (y === undefined) return ''
      //       var y_tms = Math.pow(2, z) - 1 - y
      //       return (
      //         'http://t0.tianditu.gov.cn/img_w/wmts?' +
      //         'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0' +
      //         '&LAYER=img&STYLE=default&TILEMATRIXSET=w' +
      //         '&FORMAT=image/png' +
      //         '&TILEMATRIX=' +
      //         z +
      //         '&TILEROW=' +
      //         y +
      //         '&TILECOL=' +
      //         x +
      //         '&tk=' +
      //         apiKey_td
      //       )
      //     }
      //   })
      // })
    ],
    view: new View({
      center: transform([116.4, 39.9], 'EPSG:4326', 'EPSG:3857'), // 北京市中心
      zoom: 4
    })
  })
}
// 3. 加载实时交通数据
function loadTrafficData() {
  // 高德实时交通 API（以北京为例，参数需调整）
  const bounds = '116.351147,39.966309;116.357134,39.968727' // 矩形范围（左下经度,左下纬度,右上经度,右上纬度）
  const url = `https://restapi.amap.com/v3/traffic/status/rectangle?key=${apiKey_gd_web}&rectangle=${bounds}`

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === '1') {
        updateTrafficLayer(data.trafficinfo.roads)
      }
    })
    .catch((error) => console.error('交通数据加载失败:', error))
}

// 4. 解析交通数据并渲染为矢量图层
function updateTrafficLayer(roads) {
  // 移除旧图层
  if (trafficLayer) mapInstance.removeLayer(trafficLayer)

  const features = []
  roads.forEach((road) => {
    // 转换坐标（GCJ-02 转 WGS84，再转 EPSG:3857）
    const coords = road.polyline.split(';').map((point) => {
      const [lng, lat] = point.split(',').map(Number)
      const wgs84 = AMap.convertFromGCJ02(lng, lat) // 使用高德坐标转换库
      return fromLonLat([wgs84.lng, wgs84.lat], 'EPSG:3857')
    })

    // 创建线段要素
    const feature = new Feature({
      geometry: new LineString(coords),
      status: road.status // 交通状态（0:畅通，1:缓行，2:拥堵）
    })
    features.push(feature)
  })

  // 创建矢量图层并设置样式
  trafficLayer = new VectorLayer({
    source: new VectorSource({ features }),
    style: (feature) => {
      const status = feature.get('status')
      const color = status === 0 ? 'green' : status === 1 ? 'orange' : 'red'
      return new Style({
        stroke: new Stroke({
          color: color,
          width: 4
        })
      })
    }
  })
  debugger
  mapInstance.addLayer(trafficLayer)
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
