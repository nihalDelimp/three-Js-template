import * as THREE from 'three'
let properties = {
    'regular': {
        //...width,height :   ,
        sw: 10,
        sh: 10,

    }
}




export class SliderGeometry extends THREE.PlaneBufferGeometry {

    constructor(e, type = 'regular') {
        let p = properties['regular']
        let S = 0,
            x = 2,
            z = Math.floor(Math.random() * (x - S + 1) + S),
            sw, sh;
        !(type === 'regular' && (z === 0) ? (sw = 30, sh = 1) : ((z == 1) ? (sw = 1, sh = 30) : (sw = 1, sh = 30)));
        (type === 'large') && (sw = 1, sh = 1);






        // //(z === 0) ? (p.sw = 30, p.sh = 1) : ((z == 1) ? (p.sw = 1, p.sh = 30) : (p.sw = 1, p.sh = 30));
        //super()

        super(1, 1, sw, sh)
        this.tag = type;
        this.vertices = this.attributes.position;
        this.vertices.needsUpdate = true;
        let method = ['bendPlaneGeometryVertical', 'bendPlaneGeometry', 'bendPlaneGeometryHalf'][z];
        this.method = this[method]
        this.properties = e
        this.onBeforeCompile = (shader) => {
            console.log(shader)
        }
    }


    bendPlaneGeometry(t) {
        let e = this;

        for (var r = new THREE.CubicBezierCurve3(
                    this.getXYZ(e, 0),
                    new THREE.Vector3(e.parameters.width / 2, 0, t),
                    new THREE.Vector3(e.parameters.width / 2, 0, t),
                    this.getXYZ(e, this.vertices.count - 1)),
                i = r.getPoints(Math.abs(this.vertices.count - 1)), n = 1; n < 2; n++)
            for (var o = 0; o < i.length; o++) {
                this.vertices.setZ(2 === n ? i.length + o : o, i[o].z);
                this.vertices.needsUpdate = true;
            };


        return e
    }



    bendPlaneGeometryHalf(t) {

        let e = this
        t = t / 1.2
        this.vertices.needsUpdate = true;
        for (var r = new THREE.CubicBezierCurve3(
                    this.getXYZ(e, 0),
                    new THREE.Vector3(e.parameters.width / 2, 0, t),
                    new THREE.Vector3(e.parameters.width / 2, 0, t),
                    this.getXYZ(e, this.vertices.count / 2 - 1)),
                i = r.getPoints(Math.abs(this.vertices.count / 2) - 1), n = 1; n < 3; n++)
            for (var o = 0; o < i.length - 1; o++) {
                // console.log(i[o],r)
                this.vertices.setZ(2 === n ? i.length + o : o, i[o].z);
                this.vertices.needsUpdate = true;

            };
        return e
    }

    bendPlaneGeometryVertical(t, r) {

        let e = this
        this.vertices.needsUpdate = true
        for (var i = new THREE.CubicBezierCurve3(
                    this.getXYZ(e, 0),
                    new THREE.Vector3(e.parameters.width / 2, 0, t),
                    new THREE.Vector3(e.parameters.width / 2, 0, t),
                    this.getXYZ(e, e.parameters.widthSegments)),

                n = e.parameters.heightSegments,
                o = e.parameters.widthSegments,
                s = i.getPoints(o),
                a = 0, c = 0; c < n + 1; c++)

            for (var h = 0; h < o + 1; h++) {
            //a+= ;
            this.vertices.setZ(a++, s[h].z)
        };
        return e
    }

    resetZ() {
        let e = this;
        let count = this.vertices.count;

        for (let i = 0; i < count; i++) {
            this.vertices.setZ(i, 0);
        }

        this.vertices.needsUpdate = true;
        return e
    }
    getXYZ(geometry, index, id) {

        this.vertices.needsUpdate = true;
        let x = this.vertices.getX(index);
        let y = this.vertices.getY(index);
        let z = this.vertices.getZ(index);
        return new THREE.Vector3(x, y, z);
    }

    update(t, r) {
        if (this.tag == 'large') {

            this.resetZ();
            return
        }


        this.method(t, r)


    }

}