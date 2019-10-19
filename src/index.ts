
const defaultOptions = {}
import {Canvas} from './Canvas'
import {defaultOptions} from './InterfaceMode'

declare global {
  interface Window { BM_SketchPad: any; }
}

class BM_SketchPad {
   id: string;
   default: defaultOptions;
   canvas: any;
   constructor (id:string, options:defaultOptions) {
    this.id = id;
    this.default = (<any>Object).assign({},defaultOptions, options);
    console.log(this.default)
    this.canvas = new Canvas(id, this.default);

  }
}

export {
  BM_SketchPad
}

if(window) {
  window.BM_SketchPad = BM_SketchPad;
}