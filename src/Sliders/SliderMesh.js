import * as THREE from 'three'

import {
    getViewport,
    calculateAspectRatioFit
} from '../utlis/helper'


import {
    camera,
    renderer
} from '../webGL/renderer'
window.renderer = renderer
import {
    videoPlayer,
    videoTexture,
    scrollSurface as scroll
} from '../utlis/canvas'
export class SliderMesh extends THREE.Mesh {
    constructor(geometry, material) {
        super(geometry, material)
        this.name = 'Sliders'
        this.scale.set(renderer.plane.width, renderer.plane.height, 1);
        this.matrixWorldNeedsUpdate = true;
        this.w = 1;
        this.h = 1;
        this.mode = '';
        this.video = false;


    }

    updateSize() {
        let offset = 0.90;
        let x, s = 1;
        let max = Math.max(window.innerWidth, window.innerHeight);
        (this.geometry.tag == 'large') ? (x = {
            width: this.w * 2,
            height: this.h * 2
        }) : (x = calculateAspectRatioFit(this.w, this.h, renderer.plane.width, renderer.plane.height));

        this.scale.set(x.width * offset, x.height * offset, 1)

        this.scale.multiplyScalar(s)
            // console.log(x);

    }
    update(mode, media) {

        let g = this.geometry,
            v = videoPlayer.t,
            m = this.material,
            s = 1,
            r = 0;

        (mode.type == 'large' && (s = 10, r = 0.2));
        // r = (mode.type == 'large') ?  10 :   1 ;
        this.geometry.tag = mode.type;
        this.rotation.y = r
        this.updateSize()
        m.map.repeat.set(s, s)
        v.repeat.set(s, s)
            //  m.map.needsUpdate = true
        v.wrapS = v.wrapT = m.map.wrapS = m.map.wrapT = THREE.RepeatWrapping;
        m.anisotropy = renderer.capabilities.getMaxAnisotropy();
        m.map.minFilter = THREE.LinearFilter;
        this.video = (media.type == 'video') ? this.video = 1 : this.video = 0;


    }

    reset() {
        this.geometry.resetZ();
    }

    updateGeometry(t, r) {
        let p = this.position.z;

        if (p > -2 && p < 300) {
            this.geometry.update(-(p) / 1.2, 2);

        } else if (p > 600 || p < 0) {
            this.geometry.resetZ();

        }


       // this.geometry.computeFaceNormals(),
       //     this.geometry.computeVertexNormals();
        let k = undefined;

        (scroll.startScrolling && p > -150 && p < 150) ? (
            k = this.material.map.sid,
            videoPlayer.play(k),


            (videoPlayer.playing) && (this.material.enableVideo())
        ) : (this.material.disableVideo());

        return k;
    }

}