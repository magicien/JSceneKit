'use strict'

import _BinaryRequest from './_BinaryRequest'
/*global Buffer*/

const _ImageType = {
  noImage: 0,
  colorMapped: 1,
  RGB: 2,
  blackAndWhite: 3,
  runlengthColorMapped: 9,
  runlengthRGB: 10,
  compressedBlackAndWhite: 11,
  compressedColorMapped: 32,
  compressed4PassQTColorMapped: 33
}

const _headerLength = 18

export default class _TGAImage {
  /**
   * constructor
   * @param {Buffer|ArrayBuffer} data -
   * @constructor
   */
  constructor(data) {
    if(data instanceof Buffer){
      this.buffer = data
    }else if(typeof data === 'string'){
      this.buffer = Buffer.from(data, 'binary')
    }else if(data){
      this.buffer = Buffer.from(data)
    }else{
      this.buffer = null
    }

    // Header
    this._idLength = 0
    this._colorMapType = 0
    this._imageType = 0
    this._colorMapOrigin = 0
    this._colorMapLength = 0
    this._colorMapDepth = 0
    this._imageXOrigin = 0
    this._imageYOrigin = 0
    this._imageWidth = 0
    this._imageHeight = 0
    this._imageDepth = 0
    this._alphaDepth = 0
    this._leftToRight = true
    this._topToBottom = false
    this._interleave = false
    this._hasAlpha = false

    // Image Identification Field
    this._imageID = null

    // Image Data
    this._canvas = null
    this._context = null
    this._imageData = null
    this._image = null

    this._resolveFunc = null
    this._rejectFunc = null
    this._didLoad = new Promise((resolve, reject) => {
      this._resolveFunc = resolve
      this._rejectFunc = reject
    })

    if(url){
    }
    if(data){
      this._parseData()
    }
  }

  static imageWithData(data) {
  }

  static imageWithURL(url) {
    const image = new _TGAImage()
    _BinaryRequest.get(url).then((data) => {
      image.buffer = Buffer.from(data, 'binary')
      image._parseData()
    })

    return image
  }

  _parseData() {
    this._readHeader()
    this._readImageID()
    this._initImage()

    switch(this._imageType){
      case _ImageType.noImage: {
        // nothing to do
        break
      }
      case _ImageType.colorMapped: {
        this._readColorMapData()
        break
      }
      case _ImageType.RGB: {
        this._readRGBData()
        break
      }
      case _ImageType.blackAndWhite: {
        this._readBlackAndWhiteData()
        break
      }
      case _ImageType.runlengthColorMapped: {
        console.error('parser for compressed TGA is not implemeneted')
        break
      }
      case _ImageType.runlengthRGB: {
        console.error('parser for compressed TGA is not implemeneted')
        break
      }
      case _ImageType.compressedBlackAndWhite: {
        console.error('parser for compressed TGA is not implemeneted')
        break
      }
      case _ImageType.compressedColorMapped: {
        console.error('parser for compressed TGA is not implemeneted')
        break
      }
      case _ImageType.compressed4PassQTColorMapped: {
        console.error('parser for compressed TGA is not implemeneted')
        break
      }
      default: {
        throw new Error('unknown imageType: ' + this._imageType)
      }
    }

    this._setImage()

    this._resolveFunc()
  }

  _readHeader() {
    this._idLength = this.buffer.readUIntLE(0, 1)
    this._colorMapType = this.buffer.readUIntLE(1, 1)
    this._imageType = this.buffer.readUIntLE(2, 1)
    this._colorMapOrigin = this.buffer.readUIntLE(3, 2)
    this._colorMapLength = this.buffer.readUIntLE(5, 2)
    this._colorMapDepth = this.buffer.readUIntLE(7, 1)
    this._imageXOrigin = this.buffer.readUIntLE(8, 2)
    this._imageYOrigin = this.buffer.readUIntLE(10, 2)
    this._imageWidth = this.buffer.readUIntLE(12, 2)
    this._imageHeight = this.buffer.readUIntLE(14, 2)
    this._imageDepth = this.buffer.readUIntLE(16, 1)

    const descriptor = this.buffer.readUIntLE(17, 1)
    this._alphaDepth = descriptor & 0x0F
    this._leftToRight = ((descriptor & 0x10) === 0)
    this._topToBottom = ((descriptor & 0x20) > 0)
    this._interleave = descriptor & 0xC0
  }

  _readImageID() {
    if(this._idLength > 0){
      this._imageID = this.buffer.toString('binary', _headerLength, this._idLength)
    }
  }

  _initImage() {
    if(this._imageType === _ImageType.noImage){
      return
    }
    if(this._imageWidth <= 0 || this._imageHeight <= 0){
      return
    }
    this._canvas = document.createElement('canvas')
    this._canvas.width = this._imageWidth
    this._canvas.height = this._imageHeight
    this._context = this._canvas.getContext('2d')
    this._imageData = this._context.createImageData(this._imageWidth, this._imageHeight)
  }

  _setImage() {
    this._context.putImageData(this._imageData, 0, 0)
    this._image = new Image()
    this._image.width = this._imageWidth
    this._image.height = this._imageHeight
    this._image.src = this._canvas.toDataURL()
  }

  _readColorMapData() {
    if(this._colorMapDepth === 24){
      this._hasAlpha = false
    }else if(this._colorMapDepth === 32){
      this._hasAlpha = true
    }else{
      throw new Error('unknown colorMapDepth: ' + this._colorMapDepth)
    }

    const colorMapDataPos = _headerLength + this._idLength
    const colorMapDataSize = this._colorMapDepth / 8
    const colorMapDataLen = colorMapDataSize * this._colorMapLength
    const imageDataPos = colorMapDataPos + colorMapDataLen
    const imageDataSize = 1
    const imageDataLen = imageDataSize * this._imageWidth * this._imageHeight

    const colorMap = []
    let pos = colorMapDataPos
    if(this._hasAlpha){
      for(let i=0; i<this._colorMapLength; i++){
        const b = this.buffer.readUIntLE(pos, 1)
        const g = this.buffer.readUIntLE(pos+1, 1)
        const r = this.buffer.readUIntLE(pos+2, 1)
        const a = this.buffer.readUIntLE(pos+3, 1)
        colorMap.push([r, g, b, a])
        pos += colorMapDataSize
      }
    }else{
      for(let i=0; i<this._colorMapLength; i++){
        const b = this.buffer.readUIntLE(pos, 1)
        const g = this.buffer.readUIntLE(pos+1, 1)
        const r = this.buffer.readUIntLE(pos+2, 1)
        const a = 1
        colorMap.push([r, g, b, a])
        pos += colorMapDataSize
      }
    }

    const data = this._imageData.data
    pos = imageDataPos
    for(let y=0; y<this._imageHeight; y++){
      for(let x=0; x<this._imageWidth; x++){
        let color = 0xFFFFFFFF
        const mapNo = this.buffer.readUIntLE(pos, imageDataSize) - this._colorMapOrigin
        if(mapNo >= 0){
          color = colorMap[mapNo]
        }
      }
    }
  }

  _readRGBData() {
    if(this._imageDepth === 24){
      this._hasAlpha = false
    }else if(this._imageDepth === 32){
      this._hasAlpha = true
    }else{
      throw new Error('unknown imageDepth: ' + this._imageDepth)
    }

    const imageDataPos = _headerLength + this._idLength
    const imageDataSize = this._imageDepth / 8

    const data = this._imageData.data
    let initX = 0
    let initY = 0
    let xStep = 1
    let yStep = 1
    if(!this._leftToRight){
      initX = this._imageWidth - 1
      xStep = -1
    }
    if(!this._topToBottom){
      initY = this._imageHeight - 1
      yStep = -1
    }

    let pos = imageDataPos
    if(this._hasAlpha){
      let y = initY
      for(let iy=0; iy<this._imageHeight; iy++){
        let x = initX
        for(let ix=0; ix<this._imageWidth; ix++){
          const index = (y * this._imageWidth + x) * 4
          const b = this.buffer.readUIntLE(pos, 1)
          const g = this.buffer.readUIntLE(pos+1, 1)
          const r = this.buffer.readUIntLE(pos+2, 1)
          const a = this.buffer.readUIntLE(pos+3, 1)
          data[index] = r
          data[index+1] = g
          data[index+2] = b
          data[index+3] = a

          x += xStep
          pos += imageDataSize
        }
        y += yStep
      }
    }else{
      let y = initY
      for(let iy=0; iy<this._imageHeight; iy++){
        let x = initX
        for(let ix=0; ix<this._imageWidth; ix++){
          const index = (y * this._imageWidth + x) * 4
          const b = this.buffer.readUIntLE(pos, 1)
          const g = this.buffer.readUIntLE(pos+1, 1)
          const r = this.buffer.readUIntLE(pos+2, 1)
          const a = 255
          data[index] = r
          data[index+1] = g
          data[index+2] = b
          data[index+3] = a

          x += xStep
          pos += imageDataSize
        }
        y += yStep
      }
    }
  }

  _readBlackAndWhiteData() {
    // TODO: implement
  }

  _decompressRunLengthData(data) {
    // TODO: implement
  }

  get image() {
    return this._image
  }

  get canvas() {
    return this._canvas
  }

  get didLoad() {
    return this._didLoad
  }
}

