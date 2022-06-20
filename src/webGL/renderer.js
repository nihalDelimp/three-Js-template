
import { render } from 'react-dom'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {
    getViewport,
    calculateAspectRatioFit
  } from '../utlis/helper'


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

export const scene = new THREE.Scene()  
scene.background = new THREE.Color('0');


export  const  camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 75, 1500)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 150

 



export const renderer = new THREE.WebGL1Renderer({
    
    antialias: true,
})
renderer.plane={}
renderer.setPlaneSize = (camera,position,size)=>{ 
    
   renderer.plane=  getViewport( camera  , position,size)
} 


renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//renderer.outputEncoding = THREE.sRGBEncoding
//renderer.gammaFactor = 2.2

export const controls = new OrbitControls(camera, renderer.domElement)
//controls.enableDamping = false
//controls.enableZoom = false
//controls.enableRotate = false
const resize = ()=>{

  //  console.log('f')
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.updateProjectionMatrix()
    var  aspect  = window.innerWidth * window.innerHeight / 1e6;
    aspect < .5 && ( camera.fov = 75), aspect >= .5 && aspect < .9 && ( camera.fov = 65), aspect >= .9 && aspect < 1.6 && ( camera.fov = 60), aspect >= 1.6 && aspect < 2 && ( camera.fov = 58) ;   
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.updateProjectionMatrix()
    camera.updateMatrixWorld()
    renderer.setPlaneSize(camera,new THREE.Vector3(),sizes);
 ;
 scene.traverse(a=>{ 
     if(a.isMesh && a.name == 'Sliders'  ){  
     a.updateSize();
    }})
 // renderer.render(scene,camera)  
}
resize()
window.addEventListener('resize',  resize);

 