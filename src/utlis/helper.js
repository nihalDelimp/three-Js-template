export const getViewport = (camera, target , size) => {
    let {
      width,
      height
    } = size;
  
    const distance = camera.position.distanceTo(target)
    if (!camera.isPerspectiveCamera) {
      return {
        width: width / camera.zoom,
        height: height / camera.zoom,
        factor: 1,
        distance
      }
    } else {
      const fov = (camera.fov * Math.PI) / 180 // convert vertical fov to radians
      const h = 2 * Math.tan(fov / 2) * distance // visible height
      const w = h * (width / height)
      return {
        width: w,
        height: h,
        factor: width / w,
        distance
      }
    }
  }

  export function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: Math.floor(srcWidth*ratio), height: Math.floor(srcHeight*ratio) };
 }