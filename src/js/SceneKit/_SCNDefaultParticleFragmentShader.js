'use strict'

/**
 * @type {string}
 */
const _SCNDefaultParticleFragmentShader =
 `#version 300 es
  precision mediump float;

  uniform sampler2D particleTexture;

  in vec2 v_texcoord;
  in vec4 v_color;

  out vec4 outColor;

  void main() {
    vec4 texColor = texture(particleTexture, v_texcoord);
    if(texColor.a <= 0.0){
      // avoid overwriting the depth buffer
      discard;
    }

    texColor.rgb *= texColor.a;
    outColor = v_color * texColor;
  }
`

export default _SCNDefaultParticleFragmentShader

