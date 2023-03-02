import * as THREE from 'three';
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

//scene
const scene = new THREE.Scene();

//geometry
const geometry = new THREE.SphereGeometry(3,64,64)
const material = new THREE.MeshStandardMaterial({color:"#00ff83", roughness:0.5})
const mesh= new THREE.Mesh(geometry, material)
scene.add(mesh);
//sizes
const size={
  with:window.innerWidth,
  height:window.innerHeight
 
}

//light
 const light = new THREE.PointLight(0xffffff,1,100)
 light.position.set(0,10,10)
 light.intensity=1.25
 scene.add(light);

//camera
const camera = new THREE.PerspectiveCamera(45,size.with/size.height,0.1,100)
camera.position.z=20
scene.add(camera)

//renderer
const canvas= document.querySelector('.webgl')
const renderer =new THREE.WebGLRenderer({canvas})
renderer.setSize(size.with,size.height)
renderer.setPixelRatio(2)
renderer.render(scene,camera)

//controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping=true
controls.enablePan=false
controls.enableZoom=false
controls.autoRotate=true
controls.autoRotateSpeed=5
//resize
window.addEventListener('resize',()=>{
size.with=window.innerWidth
size.height=window.innerHeight
camera.aspect=size.with/size.height
renderer.setSize(size.with,size.height)

})

const loop =()=>{
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}
loop()
//timeline magic
const tl=gsap.timeline({defaults:{duration:1}})
tl.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})
tl.fromTo('nav',{y:"-100%"},{y:"0%"})
tl.fromTo('.title',{opacity:0},{opacity:1})

//maose animation color
let mouseDown =false;
let rgb=[]
window.addEventListener('mousedown',()=>{ mouseDown=true})
window.addEventListener('mouseup',()=>{mouseDown=false})
window.addEventListener("mousemove",(e)=>{
  if(mouseDown){
    rgb=[
      Math.round((e.pageX/size.with)*255),
      Math.round((e.pageY/size.height)*255),
      150]
    let newcolor = new THREE.Color(`rgb(${rgb.join(",")})`)
    
    gsap.to(mesh.material.color,{
      r:newcolor.r,
      g:newcolor.g,
      b:newcolor.b
    })
  }
})