import * as THREE from 'three'
import { videoPlayer } from '../utlis/canvas'



export class SliderMaterial extends THREE.MeshBasicMaterial {
    constructor(e, o = {}) {
        super(e)

        this.uniforms = {
            videoTexture: { type: 't', value: videoPlayer.t },

            playVideo: { type: 'f', value: 0 },
            uScale: { type: 'vec3', value: new THREE.Vector3(1.) }
        }
        this.metalness = .3;
        this.roughness = .8;
        this.onBeforeCompile = (shader) => {
            shader.uniforms = {...shader.uniforms, ...this.uniforms };
            shader.fragmentShader = shader.fragmentShader.replace(`#include <common>`,
                `#include <common> 
                 uniform  sampler2D  videoTexture; 
                 uniform float  playVideo;
                 `
            )

            shader.fragmentShader = shader.fragmentShader.replace(`#include <map_fragment>`,
                `#ifdef USE_MAP
                 vec4 texelColor = vec4(1.);
                 if(playVideo >  0. ){
                 texelColor = texture2D( videoTexture, vUv );
                 } else {
                 texelColor = texture2D( map, vUv );
                 } 
                 texelColor = ( texelColor );
	             diffuseColor *= texelColor;
                 // if(animate){
                 // diffuseColor = mix( diffuseColor , texture2D( map, vUv ),  1. - clamp(uTime,0.,1.) );
                 // }
                  #endif `
            )
        }
    }

    enableVideo() {

        let u = this.uniforms.playVideo.value

        if (this.map.sid === videoPlayer.sid) {

            this.uniforms.playVideo.value = 1

        }



    }

    disableVideo() {

        this.uniforms.playVideo.value = 0
    }


}