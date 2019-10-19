
import {defaultOptions} from './InterfaceMode'
import {throttle, getScale, distance} from './util'


class Canvas {
  id: string;
  options: defaultOptions;
  ctx: any;
  canvas: any;
  isactive: boolean;
  receiveDrawPath: any;
  oncePath: any;
  scale: number;
  linewidth: number;
  constructor (id:string, options: defaultOptions) {
    let dom = document.getElementById(id);
    let _this = this;
    this.options = options;
    if(!dom) {
      throw new Error('节点不存在');
    }
    this.linewidth = 2;
    const throttle_fn = throttle(this.mousemoveHandle.bind(this),12);
    this.canvas = <HTMLCanvasElement> document.createElement('canvas');
    this.canvas.style.maxHeight = '100%';
    this.canvas.style.maxWidth = '100%';
    this.canvas.width = options.width;
    this.canvas.height = options.height;
    this.canvas.addEventListener('mousedown', this.mousedownHandle.bind(this), false);
    this.canvas.addEventListener('touchstart', this.mousedownHandle.bind(this), false);
    this.canvas.addEventListener('mousemove', throttle_fn, false);
    this.canvas.addEventListener('touchmove', throttle_fn, false);
    this.canvas.addEventListener('touchend', this.mouseendHandle.bind(this), false);
    this.canvas.addEventListener('mouseup', this.mouseendHandle.bind(this), false);
    this.canvas.addEventListener('mouseleave', this.mouseendHandle.bind(this), false);
    dom.appendChild(this.canvas);
    this.scale = getScale(this.canvas.getClientRects(), options);
    console.log(this.scale)
    window.addEventListener('resize', function(){
      _this.scale = getScale(_this.canvas.getClientRects(), options);
    })
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = this.linewidth;
    return this
  }
  mousedownHandle(event:any){
    if(event.touches) {
      event = event.touches[0];
    }
    this.isactive = true;
    this.ctx.strokeStyle = "#000";
    this.ctx.beginPath()
    // this.ctx.arc(event.offsetX * this.scale, event.offsetY * this.scale, (this.linewidth)/2, 0, 2*Math.PI);
    this.ctx.fill();
    this.oncePath = [{x:event.offsetX*this.scale, y: event.offsetY*this.scale}];
  }
  mousemoveHandle(event:any){
    if(event.touches) {
      event = event.touches[0];
    }
    if(!this.isactive) return;
    this.ctx.lineTo(event.offsetX * this.scale, event.offsetY * this.scale);
    this.ctx.moveTo(event.offsetX * this.scale, event.offsetY * this.scale);
    this.ctx.stroke();
    if(distance(this.oncePath[this.oncePath.length-1], {x: event.offsetX * this.scale, y:event.offsetY * this.scale}))
    {
      this.oncePath.push({x:event.offsetX * this.scale, y:event.offsetY * this.scale});
    }
  }
  mouseendHandle(event:any){
    if(event.touches) {
      event = event.touches[0];
    }
    this.ctx.closePath();
    this.ctx.save();
    if(this.isactive) {
      this.oncePath.push({x:event.offsetX * this.scale, y:event.offsetY * this.scale});
      this.options.receiveDrawPath(this.oncePath);
    }
    
    this.isactive = false;
  }
  setStrokeColor(color:string){
    this.ctx.save();
    this.ctx.strokeStyle = color;
  }
  setFillColor(color:string) {
    this.ctx.save();
    this.ctx.fillStyle = color;
  }
  setLineWidth(width:number) {
    this.linewidth = width;
  }
  drawPath(paths:any) {
    this.ctx.beginPath();
    this.ctx.moveTo(paths[0]["x"],paths[0]["y"]);
		for (var i = 1; i < paths.length; i++) {
			this.ctx.lineTo((paths[i]["x"]),(paths[i]["y"]));
		};
		this.ctx.stroke();
		this.ctx.save();
  }
}

export {
  Canvas
}