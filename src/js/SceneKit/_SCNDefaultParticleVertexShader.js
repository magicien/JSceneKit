'use strict'

/**
 * @type {string}
 */
const _SCNDefaultParticleVertexShader =
 `#version 300 es
  precision mediump float;

  uniform mat4 modelTransform;
  uniform mat4 viewTransform;
  uniform mat4 projectionTransform;
  uniform int orientationMode;
  uniform float stretchFactor;

  in vec3 position;
  in vec3 velocity;
  in vec4 rotation;
  in vec4 color;
  in float size;
  //in float life;
  in vec2 corner;
  in vec2 texcoord;

  out vec2 v_texcoord;
  out vec4 v_color;

  void main() {
    vec4 pos = viewTransform * vec4(position, 1.0);
    vec3 d;

    if(stretchFactor > 0.0){
      vec4 v = viewTransform * vec4(velocity, 0.0) * stretchFactor;
      if(corner.y > 0.0){
        pos.xyz += v.xyz;
      }
      vec2 cy = normalize(v.xy);
      vec2 cx = vec2(-cy.y, cy.x);
      d = vec3(cx * corner.x + cy * corner.y, 0) * size;
    }else{
      float sinAngle = sin(rotation.w);
      float cosAngle = cos(rotation.w);
      float tcos = 1.0 - cosAngle;

      d = vec3(
          corner.x * (rotation.x * rotation.x * tcos + cosAngle)
        + corner.y * (rotation.x * rotation.y * tcos - rotation.z * sinAngle),
          corner.x * (rotation.y * rotation.x * tcos + rotation.z * sinAngle)
        + corner.y * (rotation.y * rotation.y * tcos + cosAngle),
          corner.x * (rotation.z * rotation.x * tcos - rotation.y * sinAngle)
        + corner.y * (rotation.z * rotation.y * tcos + rotation.x * sinAngle)) * size;
      if(orientationMode == 2){
        // orientation: free
        d = mat3(viewTransform) * mat3(modelTransform) * d;
      }
    }
    pos.xyz += d;

    v_color = color;
    v_texcoord = texcoord;
    gl_Position = projectionTransform * pos;
  }
`

export default _SCNDefaultParticleVertexShader

