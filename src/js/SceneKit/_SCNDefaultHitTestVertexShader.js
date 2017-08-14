'use strict'

/**
 * @type {string}
 */
const _SCNDefaultHitTestVertexShader =
 `#version 300 es
  precision mediump float;

  uniform mat4 viewProjectionTransform;
  uniform vec4[765] skinningJoints;
  uniform int numSkinningJoints;

  in vec3 position;
  in vec3 normal;
  in vec4 boneIndices;
  in vec4 boneWeights;
  
  out vec3 v_normal;
  out vec3 v_position;

  void main() {
    vec3 pos = vec3(0, 0, 0);
    vec3 nom = vec3(0, 0, 0);
    if(numSkinningJoints > 0){
      for(int i=0; i<numSkinningJoints; i++){
        float weight = boneWeights[i];
        if(int(boneIndices[i]) < 0){
          continue;
        }
        int idx = int(boneIndices[i]) * 3;
        mat4 jointMatrix = transpose(mat4(skinningJoints[idx],
                                          skinningJoints[idx+1],
                                          skinningJoints[idx+2],
                                          vec4(0, 0, 0, 1)));
        pos += (jointMatrix * vec4(position, 1.0)).xyz * weight;
        nom += (mat3(jointMatrix) * normal) * weight;
      }
    }else{
      mat4 jointMatrix = transpose(mat4(skinningJoints[0],
                                        skinningJoints[1],
                                        skinningJoints[2],
                                        vec4(0, 0, 0, 1)));
      pos = (jointMatrix * vec4(position, 1.0)).xyz;
      nom = mat3(jointMatrix) * normal;
    }
    //v_position = pos;
    v_normal = nom;

    gl_Position = viewProjectionTransform * vec4(pos, 1.0);
    v_position = gl_Position.xyz / gl_Position.w;
  }
`

export default _SCNDefaultHitTestVertexShader

