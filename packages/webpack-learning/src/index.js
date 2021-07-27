import {a} from './test'

let dom = document.createElement('button')
dom.textContent = '点我'
dom.addEventListener('click',()=>{
  import('./test').then(res=>{
    console.log(res.a)
    console.log(res.default)
  })
},false)
document.body.appendChild(dom)