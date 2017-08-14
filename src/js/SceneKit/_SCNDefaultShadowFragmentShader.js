'use strict'

/**
 * @access private
 * @type {string}
 */
const _SCNDefaultShadowFragmentShader =
 `#version 300 es
  precision mediump float;

  in vec3 v_position;

  layout(location = 0) out vec4 out_depth;
  //layout(location = 0) out float out_depth;

  void main() {
    float r = (v_position.z + 1.0) * 0.5;
    float g = fract(r * 255.0);
    float b = fract(g * 255.0);
    float a = fract(b * 255.0);
    float coef = 1.0 / 255.0;

    r -= g * coef;
    g -= b * coef;
    b -= a * coef;
    out_depth = vec4(r, g, b, a);
    //out_depth = v_position.z;
  }
`
 
export default _SCNDefaultShadowFragmentShader

