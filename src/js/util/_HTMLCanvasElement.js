'use strict'

/*global HTMLCanvasElement*/
let _HTMLCanvasElement = null
if(typeof HTMLCanvasElement !== 'undefined'){
  _HTMLCanvasElement = HTMLCanvasElement
}else{
  class HTMLCanvasElement {
    getContext(name, opt) {
      throw new Error('getContext is not implemented')
    }
  }
  _HTMLCanvasElement = HTMLCanvasElement
}
export default _HTMLCanvasElement
