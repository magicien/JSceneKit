'use strict'

/**
 * @type {string}
 */
const _SCNDefaultHitTestFragmentShader =
 `#version 300 es
  precision mediump float;

  uniform int objectID;
  uniform int geometryID;

  in vec3 v_normal;
  in vec3 v_position;

  layout(location = 0) out vec4 out_objectID;
  layout(location = 1) out vec4 out_faceID;
  layout(location = 2) out vec4 out_position;
  layout(location = 3) out vec4 out_normal;

  void main() {
    out_objectID = vec4(
      float(objectID >> 8) / 255.0,
      float(objectID & 0xFF) / 255.0,
      float(geometryID >> 8) / 255.0,
      float(geometryID & 0xFF) / 255.0
    );
    //out_faceID = vec4(
    //  (gl_PrimitiveID >> 24) / 255.0,
    //  ((gl_PrimitiveID >> 16) & 0xFF) / 255.0,
    //  ((gl_PrimitiveID >> 8) & 0xFF) / 255.0,
    //  (gl_PrimitiveID & 0xFF) / 255.0
    //);
    out_faceID = vec4(0, 0, 0, 0); // TODO: implement
    vec3 n = normalize(v_normal);
    out_normal = vec4((n.x + 1.0) * 0.5, (n.y + 1.0) * 0.5, (n.z + 1.0) * 0.5, 0);
    //out_position = vec4((v_position.x + 1.0) * 0.5, (v_position.y + 1.0) * 0.5, (v_position.z + 1.0) * 0.5, 0);
    float r = (v_position.z + 1.0) * 0.5;
    float g = fract(r * 255.0);
    float b = fract(g * 255.0);
    float a = fract(b * 255.0);
    float coef = 1.0 / 255.0;

    r -= g * coef;
    g -= b * coef;
    b -= a * coef;
    out_position = vec4(r, g, b, a);
  }
`

export default _SCNDefaultHitTestFragmentShader

