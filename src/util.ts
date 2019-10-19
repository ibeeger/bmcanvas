//节流
const throttle = (fn:any, t:number) => {
  let now = Date.now()
  return function(arg:any) {
    if (Date.now() - now > t) {
      fn.apply(this, arguments)
      now = Date.now()
    }
  }
}
//计算距离
const distance = (p1:any,p2:any) => {
  // console.log(p1.x - p2.x, p1.y - p2.y);
  return (Math.abs(p1.x - p2.x) > 8 || Math.abs(p1.y - p2.y) > 8)
}

//获取缩放系数
const getScale = (pos:any,def:any) => {
   return Math.max(def.width/pos[0].width, def.height/pos[0].height);
}

export {
  getScale,
  distance,
  throttle
}