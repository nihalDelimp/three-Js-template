import { useEffect, useRef }from "react";
import * as THREE from "three";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css'
import { scene,
    camera,
    renderer, } from "./webGL/renderer";
import { loadingScreen, videoPlayer, scrollSurface as scroll } from './utlis/canvas'
videoPlayer
import {Slider} from './Sliders/sliders';
import { scrollSurface } from "./utlis/canvas";
const App = (context) => {
  console.log(context);
    const mountRef = useRef(null);
    
    useEffect(() => {

         
        mountRef.current.appendChild(renderer.domElement);
        renderer.domElement.className = 'webgl'

        let slider = new Slider(context, renderer);
        scene.add(slider) 
        scrollSurface.scrollTop = scrollSurface.scrollHeight / 2
        
        let lastY = 0;
    
        function updateSlider(v) {
        let k = v - lastY;
            if (k < 100 && k > -100) {
                slider.y += k;
             }
             lastY = v
            };
    
         function updateScroll() {
            let scrollOffset = Math.floor(scrollSurface.scrollTop + (scrollSurface.getBoundingClientRect().height));
            (scrollOffset >= this.scrollHeight || !this.scrollTop || !this.startScrolling) ? (this.scrollTop = this.scrollHeight / 2) : updateSlider(scrollSurface.scrollTop - scrollSurface.scrollHeight / 2);
    
    
         }
    
         scrollSurface.addEventListener('scroll', updateScroll)
    
    
    
        
         
         var animate = function() {
            requestAnimationFrame(animate);
           
            slider.updateMesh()
          
            renderer.render(scene, camera);
        };

        animate();

        return () => mountRef.current.removeChild(renderer.domElement);
    }, []);

    return ( <
        div ref = { mountRef } >

        </div>
    );
}

export default App;