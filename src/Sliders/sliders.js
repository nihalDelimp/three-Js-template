import * as THREE from 'three'
import { loadingScreen, videoPlayer, scrollSurface as scroll } from '../utlis/canvas'

import {
    scene,
    renderer,
    camera
} from '../webGL/renderer'
import {
    SliderGeometry
} from './SliderGeomerty'
import {
    SliderMesh
} from './SliderMesh'
import {
    SliderMaterial
} from './SliderMaterial'


scene.background = new THREE.Color(0)

const scrollSurface = document.getElementsByClassName('scroll')[0]
export class Slider extends THREE.Object3D {
    constructor(j) {
        super()
        this.themeOptions = Object.assign({}, j.themeOptions[0])
        this.projects = j.projects.reverse();
        this.slides = [];
        this.y = 0;
        this.lastY = 0;

        let img = document.createElement('img')
        img.src = this.themeOptions.loadingScreen;
        loadingScreen.append(img);


        this.currentQue = [];
        this.dummy = [];
        this.ImageData = [];

        this.texture = [];
          window.t = this.texture;
          window.w = this.currentQue;
        //  window.i = this.ImageData;

        this.tempStore = [];
        this.workerId = 0;
        this.quePosition = [];
        this.currentTexture = 0;
        this.activeMesh = -1;
        this.debug = this.themeOptions.debug || 0;
        this.startShuffling = 0;
        this.sequence = this.themeOptions.sequence || 0;
        this.ctx = [];
        window.ctx = this.ctx;
        console.log(this.themeOptions.debug);
        




        (!this.projects.length) ? alert('Error While  Loading'): this.init()

 
        const projectlegnth = this.projects.length - 1;
        let loadingScreenTime = 1; // Default loading screen time
        
        if (projectlegnth >= 1 && projectlegnth <= 4) {
            loadingScreenTime = 3;
            alert("done")
        }
        
        let check = setInterval(() => {
            if (this.dummy.length >= projectlegnth) {
                this.release();
            }
        
            if (this.ImageData.length >= projectlegnth) {
                loadingScreen.classList.add('completed');
                scroll.startScrolling = 1;
                clearInterval(check);
            }
        }, loadingScreenTime * 1000);
        

}


    init() {
        console.log('initalize');
        this.createMesh();
        this.recurssive(this.projects, this.projects.length);


    }

    async recurssive(a, n) {

        if (n == 0) {
            return
        };
        // let l = 0;


        await this.createTextureProp(a[n - 1].slides);
        // l++;
        await this.recurssive(a, n - 1);
    }

    async createTextureProp(e) {

        const g = prop => new Promise(r => {

            let media = prop.media,
                mode = prop.mode,
                data, ava, mesh;

            let i = new Image();
            i.src = media.src;

            i.onload = (a) => {

                (media.type == 'video') && videoPlayer.add(media.url, this.workerId);
                const texture = new THREE.CanvasTexture(a);
                texture.sid = this.workerId;

                this.ImageData.push({
                        data: { img: a.target },
                        w: a.target.width,
                        h: a.target.height,
                        sid: this.workerId,
                        media: media,
                        mode: mode,
                    })
                    //debug.innerHTML = this.workerId;
                try {
                    this.updateTexture(this.workerId);
                } catch (error) {
                    console.error(error)
                }
                this.workerId++
                    //to be removed later  
                    setTimeout(a => {
                        data,
                        ava,
                        r(''),
                        mesh = undefined;
                    }, 100);



            }

        });




        return new Promise(async r => {

            for (const i of e) {
                // need to remove later 
                let m
                    //Math.max(width,height) < max
                    (1) && (m = await g(i)) //return 

            }

            r(1)

        })
    }

    updateTexture(sid) {

        let d, t, m, ct;
        d = this.ImageData.filter(a => a.sid == sid)[0],
            t = this.texture.filter(a => a.sid == sid),
            (t.length) && (
                ct = this.ctx.filter(a => a.sid == t[0].ctx),
                ct[0].clearRect(0, 0, ct[0].canvas.width, ct[0].canvas.height),

                ct[0].canvas.width = d.w,
                ct[0].canvas.height = d.h,
                ct[0].drawImage(d.data.img, 0, 0, d.w, d.h),
                (this.debug) && (
                    ct[0].fillStyle = "#48A14D",
                    ct[0].font = "200px Arial",
                    ct[0].textAlign = "center",
                    ct[0].fillText(`${sid}`, d.w / 2, d.h / 2)

                ),
                // debug.innerHTML = `${ Math.max(d.w,d.h)},data`,
                (t.length) && (m = scene.getObjectByProperty('uuid', t[0].materialId), this, sid),
                (m) && (m.w = d.w, m.h = d.h, m.reset(), m.update(d.mode, d.media), m.material.map.needsUpdate = true, m.material.needsUpdate = true)
            )

    }

    getGeometry(id) {
        let canvas = document.createElement('CANVAS');
        canvas.width = canvas.height = 2048;
        let ctx = canvas.getContext('2d');
        // used in previous version but  consume  17 to 20 MB per texture   
        // let texture = new THREE.DataTexture(new Uint8Array(4*2048*2048).fill(255),2048,2048); ///this.ImageData[i].data;
        let texture = new THREE.CanvasTexture(canvas);
        let t = new SliderMesh(new SliderGeometry(), new SliderMaterial({
            map: texture
        }));
        t.sid = id;

        ctx.sid = id;
        texture.ctx = id;
        texture.minfilter = THREE.LinearMipMapLinearFilter;


        this.ctx.push(ctx);
        t.material.map.needsUpdate = true;
        t.material.needsUpdate = true;
        t.material.map.sid = t.sid;
        t.material.map.materialId = t.uuid;
        texture.loaded = false;
        this.texture.push(texture);
        scene.add(t);
        this.textureId++;
        return t;
    }


    

    createMesh() {
        const totaldata = this.projects.length;
        console.log(totaldata);
        
        let totalSlides = -1;
        
        for (let i = 0; i < totaldata; i++) {
          totalSlides += this.projects[i].slides.length;
        }
        
        console.log(totalSlides);
        let length = totalSlides ,

            // boundry = (13 * 300 + 100) / 2;


            front = [],
            back = [];
        let i, id = 0;
        for (i = 0; i <=length; i++)
        {
            let t = this.getGeometry(i);

            (!front.length) && (t.tempZ = -100) || (t.tempZ = front[front.length - 1].tempZ - 300);
            front.push(t);
            scene.add(t);
        }

        for (i; i < length; i++) {
            let t = this.getGeometry(i);
            (!back.length) && (t.tempZ = 1700) || (t.tempZ = back[back.length - 1].tempZ - 300);
            back.push(t);
            scene.add(t);

        };
        this.dummy = back.concat(front);

    }








    release() {
        while (!this.dummy.length == 0) {

            //let direction = (lastDelta > 0) 
            let k = this.dummy.shift();
            k.position.z = k.tempZ;

            this.currentQue.push(k);
        }
        this.quePosition = 12;

    }


    findPossible(v) {
        let m = v - 1,
            j = 1;
        // check repetation
        while (j !== undefined) {
            m++;
            m = (m) % this.workerId;
            j = this.currentQue.find(a => a.material.map.sid === m);

        }
        return m;

    }

    updatePosition() {
        this.quePosition = [];
        this.currentQue.forEach((a, b) => {
            this.quePosition.push(a.material.map.sid);
        })
    }
    swift(direction, l, k) {

        if (this.currentQue.length < 0) return;

        let lid = l.material.map.sid, //last id                     
            kid = k.material.map.sid, //currently shifted id 
            d = 1,
            t = this.currentTexture;

        (direction == 'front') ? (lid = this.currentQue.length - 1, d = 1) : (lid = 0, d = -1);




        (!this.startShuffling && this.currentQue[lid].material.map.sid == 0 && (this.tempStore = this.quePosition, this.startShuffling = 0)) && (console.log('first Cycle Completed')) ||
        (this.startShuffling) &&
        (

            this.currentQue[0].material.map.sid == 0 && (this.startShuffling += 1),

            ((this.sequence) && (this.tempStore[0] = this.currentQue[1].material.map.sid),
                this.tempStore[lid] = (this.tempStore[lid] + (1 * d)) % (this.workerId),
                (this.tempStore[lid] < 0) && (this.tempStore[lid] = (this.workerId - 1))

            ),
            true

        ) && (this.sequence ?
            //sequence 

            (


                this.updateTexture(this.currentQue[lid].material.map.sid = this.tempStore[lid])


            )

            :
            (this.ImageData.filter(a => { return a.sid == t })[0]) //kn 

            ?
            (
                this.updateTexture(this.currentQue[lid].material.map.sid = this.currentTexture++) //,

            ) :
            (

                this.updateTexture(this.currentQue[lid].material.map.sid = this.findPossible(this.tempStore[lid]))

            )
        );



        this.updatePosition();



        (this.debug) && this.debugs();

    }

    debugs() {
        //console.clear()
        let d = {
            mode: (this.sequence) ? 'sequence' : 'recent',
            activeMesh: this.activeMesh,
            currentQue: this.quePosition,
        };
        console.table(d);
    }


    updateMesh() {



        let a = (this.y - this.lastY) / 2;
        let p = this.currentQue;

        for (var e, v = this.currentQue[Symbol.iterator](); true !== (e = v.next()).done; e) {
            let p = e.value.position.z;

            e.value.position.z += a;
            let m = e.value.updateGeometry();
            (m >= 0) && (this.activeMesh = m)
        }

        let c = this.currentQue;

        let l = c[c.length - 1];
        let f = c[0];

        let direction = (this.lastDelta > 0)
        if (f) {
            let entry = 1500,
                i = (this.lastDelta > 0),
                fp = f.position.z,
                lp = l.position.z;

            if (i && fp > 1800) {
                let k = c.shift();
                k.position.z = l.position.z - 300;
                c.push(k);
                this.updatePosition();
                this.swift('front', l, k);
            } else if (!i && l && lp < -1800) {

                let k = c.pop();
                k.position.z = f.position.z + 300;
                c.unshift(k);
                this.updatePosition();
                this.swift('back', l, f); //c[0],c[c.length - 1]
            }


        }



        this.lastDelta = a;
        this.lastY = this.y;
        // r && (direction) ;


    }


}