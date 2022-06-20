import * as THREE from 'three'
//import Stats from 'three/examples/jsm/libs/stats.module'
import { Slider } from '../Sliders/sliders'
window.THREE = THREE
import {
    scene,
    camera,
    renderer,

} from './renderer.js'

import { scrollSurface } from '../utlis/canvas'

export default function initialize(e) {
    // const stats = Stats()
    //  document.body.appendChild(stats.dom)
    const canvas = document.querySelector('canvas.webgl')

    let slider = new Slider(e, renderer);
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





    var updateId,
        previousDelta = 0,
        fpsLimit = 30;

    function update(currentDelta) {
        updateId = requestAnimationFrame(update);

        var delta = currentDelta - previousDelta;
        slider.updateMesh()
        renderer.render(scene, camera);
        //stats.update(scene, camera);

        // if (fpsLimit && delta < 1000 / fpsLimit) {
        //     return;
        // }




        // slider.updateMesh()


        previousDelta = currentDelta;
    }

    update()

}