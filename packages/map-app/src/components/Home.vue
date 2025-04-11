<script setup>
import { ref, onMounted } from 'vue'
import 'ol/ol.css'
import { Map, View, Feature } from 'ol'
import Tile from 'ol/layer/Tile'
import ScaleLine from 'ol/control/ScaleLine'
import ZoomSlider from 'ol/control/ZoomSlider'
import FullScreen from 'ol/control/FullScreen'
import MousePosition from 'ol/control/MousePosition'
import OverviewMap from 'ol/control/OverviewMap'
import OSM from 'ol/source/OSM'
import BingMaps from 'ol/source/BingMaps'
import XYZ from 'ol/source/XYZ'
import ImageStatic from 'ol/source/ImageStatic'
import ImageLayer from 'ol/layer/Image'
import VectorSource from 'ol/source/Vector'
import { fromLonLat, transform, toLonLat } from 'ol/proj'
import VectorLayer from 'ol/layer/Vector'
import { GeoJSON } from 'ol/format'
import { LineString, Point } from 'ol/geom'
import { Style, Stroke, Circle, Fill } from 'ol/style'
import AMapLoader from '@amap/amap-jsapi-loader'
import { gcj02towgs84 } from 'coordtransform'
import { Button } from 'ant-design-vue'
import Overlay from 'ol/Overlay'

let mapInstance
let trafficLayer = null
let AMap
const apiKey_td = '3e3059b01c5c4199fb64f898f30a9c1c'
const apiKey_gd_js = '809705cb81ca6b60e5e56f4db505e275'
const apiKey_gd_web = 'b2ea870bf7fbc6c05e8c847114d13ffb'
const gaodeTileUrl = `https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}&key=${apiKey_gd_web}`

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
  const vectorLayer = new VectorLayer({
    source: new VectorSource(),
    style: new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({ color: 'blue' }),
        stroke: new Stroke({ color: 'white', width: 2 })
      })
    })
  })
  const layers = [
    new Tile({
      source: new XYZ({
        url: gaodeTileUrl,
        wrapX: false
      })
    }),
    vectorLayer
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
    // new VectorLayer({
    //   opacity: 1,
    //   source: new VectorSource({
    //     url: 'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full', // GeoJSON文件路径
    //     format: new GeoJSON(),
    //     projection: 'EPSG:3857'
    //   })
    // }),
    // new ImageLayer({
    //   visible: true,
    //   source: new ImageStatic({
    //     projection: 'EPSG:4326',
    //     imageExtent: [100, 30, 102, 32],
    //     url: 'https://picsum.photos/200'
    //   })
    // })
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
  ]
  mapInstance = new Map({
    target: 'mapContainer',
    layers,
    view: new View({
      center: transform([116.4, 39.9], 'EPSG:4326', 'EPSG:3857'), // 北京市中心
      zoom: 4,
      projection: 'EPSG:3857'
    }),
    controls: [
      new FullScreen(), // 全屏控件
      // new MousePosition({
      //   coordinateFormat: function (coordinate) {
      //     return `东经${coordinate?.[0]} 北纬${coordinate?.[1]}`
      //   }
      // }), //鼠标位置控件
      new OverviewMap({
        layers
      }),
      new ZoomSlider(), //缩放滑块刻度控件
      new ScaleLine({
        className: 'ol-scale-line custom-zoom-line'
      })
    ]
  })
  // 创建弹窗
  const popup = new Overlay({
    element: document.getElementById('popup'), // HTML弹窗容器
    positioning: 'bottom-center',
    stopEvent: false // 允许事件穿透
  })
  mapInstance.addOverlay(popup)
  // 绑定点击事件
  mapInstance.on('click', (event) => {
    popup.setPosition(event.coordinate)
    console.log(event)
    const coordinate = event.coordinate // 点击坐标（EPSG:3857）
    const lonLat = toLonLat(coordinate) // 转换为 WGS84（EPSG:4326）
    const marker = new Feature({
      geometry: new Point(event.coordinate)
    })
    vectorLayer.getSource().addFeature(marker)
  })
}
function drawUserLocation(lon, lat, accuracy) {
  // 转换经纬度到地图坐标系（EPSG:3857）
  const userCoords = fromLonLat([lon, lat])

  // 创建用户位置标记
  const userMarker = new Feature({
    geometry: new Point(userCoords)
  })
  const markerStyle = new Style({
    image: new Circle({
      radius: 6,
      fill: new Fill({ color: 'rgba(0, 153, 255, 1)' }),
      stroke: new Stroke({ color: 'white', width: 2 })
    })
  })
  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [userMarker]
    }),
    style: [markerStyle]
  })
  mapInstance.addLayer(vectorLayer)
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
function onGetLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      // 成功获取位置
      const lon = position.coords.longitude // 经度（WGS84）
      const lat = position.coords.latitude // 纬度（WGS84）
      const accuracy = position.coords.accuracy // 精度（米）
      // 调用函数将坐标绘制到地图
      drawUserLocation(lon, lat, accuracy)
    },
    (error) => {
      // 处理错误（用户拒绝授权或定位失败）
      console.error('获取位置失败：', error.message)
    },
    {
      //enableHighAccuracy: true, // 高精度模式（GPS）
      //timeout: 5000, // 超时时间（毫秒）
      maximumAge: 0 // 不缓存位置
    }
  )
}
</script>

<template>
  <div class="wrapper">
    <div class="opt-box">
      <Button type="primary" @click="onGetLocation">获取当前位置</Button>
    </div>
    <div id="mapContainer" class="map-container"></div>
    <div id="popup" class="map-popup"></div>
  </div>
</template>

<style scoped lang="less">
.map-popup {
  width: 300px;
  height: 300px;
  background-color: #fff;
}
.wrapper {
  width: 100vw;
  height: 100vh;
  .map-container {
    width: 100%;
    height: 100%;
  }
}
</style>
