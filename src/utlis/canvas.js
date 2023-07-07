import * as THREE from 'three';

let videoCanvas = document.createElement('canvas');

export const videoTexture = {
  ctx: videoCanvas.getContext('2d'),
  t: new THREE.Texture(videoCanvas),
  sid: -1,
};

export const scrollProperties = {
  startScrolling: 0,
};

export const loadingScreen = document.getElementsByClassName('loading')[0];

export const scrollSurface = document.getElementsByClassName('scroll')[0];
scrollSurface.startScrolling = 0;

class VideoPlayer {
  constructor() {
    let videoCanvas = document.createElement('canvas');
    this.size = {
      w: 1,
      h: 1,
    };

    this.ctx = videoCanvas.getContext('webgl'); // or 'webgl2'
    this.t = new THREE.Texture(videoCanvas);
    this.sid = -1;
    this.active = null;
    this.children = [];
    this.playing = false;
    this.frame = 0;
    this.muted = true;

    const fps = 24;

    let animate = () => {
      setTimeout(() => {
        if (this.active && !this.active.ended) {
          this.t.needsUpdate = true;
          this.ctx.drawImage(
            this.active,
            0,
            0,
            this.size.w,
            this.size.h
          );
          this.frame += 1;
          if (this.active.currentTime > 0) {
            this.playing = true;
          }
        }

        requestAnimationFrame(animate);
      }, 1000 / fps);
    };

    animate();
  }

  play(sid) {
    if (this.sid === sid) return;

    let i = this.children.filter((a) => a.id === sid)[0];

    if (i && i.readyState >= 3) {
      this.reset(this.sid);
      this.active = i;
      this.size.w = this.ctx.canvas.width = this.active.videoWidth;
      this.size.h = this.ctx.canvas.height = this.active.videoHeight;
      this.sid = sid;
      this.frame = 0;
      this.active.play();
    } else {
      this.reset();
    }
  }

  pause() {
    // Implement the pause functionality
  }

  reset(sid) {
    if (this.active) {
      this.active.pause();
      this.ctx.clearRect(0, 0, this.size.w, this.size.h);
      this.active = null;
    }

    this.playing = false;
    this.frame = 0;
    this.sid = -1;
    this.active = null;
  }

  add(src, id) {
    let v = document.createElement('video');
    v.muted = true;
    v.autoplay = true;
    v.playsInline = true;
    v.loop = true;
    v.src = src;
    v.id = id;
    this.children.push(v);
  }

  onplay(e) {
    console.log(this, e);
    window.f = this;
    let w = this.active.videoWidth;
    let h = this.active.videoHeight;
    let p = this;
    this.ctx.canvas.width = w;
    this.ctx.canvas.height = h;

    (function loop() {
      console.log(w, h);
      if (1) {
        console.log(this, 'this');
        p.t.needsUpdate = true;
      }
    })();
  }
}

export const videoPlayer = new VideoPlayer();
window.videoPlayer = videoPlayer;
