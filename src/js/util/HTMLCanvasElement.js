'use strict'

/*global HTMLCanvasElement*/
let _HTMLCanvasElement = HTMLCanvasElement
if(!HTMLCanvasElement){
  class HTMLCanvasElement {
    getContext(name, opt) {
      throw new Error('getContext is not implemented')
    }
  }
  _HTMLCanvasElement = HTMLCanvasElement
}
export default _HTMLCanvasElement
