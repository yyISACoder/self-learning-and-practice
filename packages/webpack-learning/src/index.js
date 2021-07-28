import './index.css' 
import me from 'images/25174576.jpg'

const dom = document.createElement('button')
dom.textContent = '点我'
dom.addEventListener('click',()=>{
  import(/* webpackChunkName: "test" */'./test').then(res=>{
    console.log(res.a)
    console.log(res.default)
  })
},false)
document.body.appendChild(dom)

const image = document.createElement('img')
image.src = me
document.body.appendChild(image)