'use strict'

/**
 * @access private
 * @type {string}
 */
const vsText =
 `#version 300 es
  precision mediump float;

  out vec3 position;

  void main() {
    position = vec3(0, 0, 0);
    gl_Position = vec4(0, 0, 0, 0);
  }
`

/**
 * @access private
 * @type {string}
 */
const fsText = 
 `#version 300 es
  precision mediump float;
  precision highp sampler2DShadow;

  in vec3 position;
  out vec4 outColor;

  void main() {
    outColor = vec4(1, 1, 1, 1);
  }
`

/**
 * Check if the browser can use WebGL2.
 * @access public
 * @type {function(): boolean}
 * @returns {boolean} - true if the browser supports WebGL2.
 */
const CanUseWebGL2 = () => {
  const canvas = document.createElement('canvas')
  const opt = {
    alpha: true,
    depth: true,
    stencil: true,
    antialias: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false
  }
  const gl = canvas.getContext('webgl2', opt)
  if(!gl){
    console.log('canvas.getContext returns null')
    return false
  }

  const vertexShader = gl.createShader(gl.VERTEX_SHADER)
  gl.shaderSource(vertexShader, vsText)
  gl.compileShader(vertexShader)
  if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
    const info = gl.getShaderInfoLog(vertexShader)
    console.log(`vertexShader compile test error: ${info}`)
    return false
  }

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
  gl.shaderSource(fragmentShader, fsText)
  gl.compileShader(fragmentShader)
  if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
    const info = gl.getShaderInfoLog(fragmentShader)
    console.log(`fragmentShader compile test error: ${info}`)
    return false
  }

  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
    const info = gl.getProgramInfoLog(program)
    console.log(`program link test error: ${info}`)
    return false
  }

  return true
}

export default CanUseWebGL2

