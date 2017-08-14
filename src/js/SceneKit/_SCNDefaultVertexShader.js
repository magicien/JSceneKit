'use strict'

/**
 * @type {string}
 */
const _SCNDefaultVertexShader = 
 `#version 300 es
  precision mediump float;

  #define NUM_AMBIENT_LIGHTS __NUM_AMBIENT_LIGHTS__
  #define NUM_DIRECTIONAL_LIGHTS __NUM_DIRECTIONAL_LIGHTS__
  #define NUM_DIRECTIONAL_SHADOW_LIGHTS __NUM_DIRECTIONAL_SHADOW_LIGHTS__
  #define NUM_OMNI_LIGHTS __NUM_OMNI_LIGHTS__
  #define NUM_SPOT_LIGHTS __NUM_SPOT_LIGHTS__
  #define NUM_IES_LIGHTS __NUM_IES_LIGHTS__
  #define NUM_PROBE_LIGHTS __NUM_PROBE_LIGHTS__

  #define NUM_SHADOW_LIGHTS (NUM_DIRECTIONAL_LIGHTS + NUM_DIRECTIONAL_SHADOW_LIGHTS + NUM_OMNI_LIGHTS + NUM_SPOT_LIGHTS)
  #define NUM_LIGHTS (NUM_AMBIENT_LIGHTS + NUM_DIRECTIONAL_LIGHTS + NUM_DIRECTIONAL_SHADOW_LIGHTS + NUM_OMNI_LIGHTS + NUM_SPOT_LIGHTS + NUM_IES_LIGHTS + NUM_PROBE_LIGHTS)

  #define USE_SHADER_MODIFIER_GEOMETRY __USE_SHADER_MODIFIER_GEOMETRY__

  layout (std140) uniform cameraUniform {
    vec4 position;
    mat4 viewTransform;
    mat4 inverseViewTransform;
    mat4 viewProjectionTransform;
  } camera;

  layout (std140) uniform materialUniform {
    vec4 ambient;
    vec4 diffuse;
    vec4 specular;
    vec4 normal;
    vec4 reflective;
    vec4 emission;
    vec4 transparent;
    vec4 multiply;
    vec4 ambientOcclusion;
    vec4 selfIllumination;
    vec4 metalness;
    vec4 roughness;
    float shininess;
    float fresnelExponent;
  } material;

  struct AmbientLight {
    vec4 color;
  };

  struct DirectionalLight {
    vec4 color;
    vec4 direction; // should use vec4; vec3 might cause problem for the layout
  };

  struct DirectionalShadowLight {
    vec4 color;
    vec4 direction; // should use vec4; vec3 might cause problem for the layout
    vec4 shadowColor;
    mat4 viewProjectionTransform;
    mat4 shadowProjectionTransform;
  };

  struct OmniLight {
    vec4 color;
    vec4 position; // should use vec4; vec3 might cause problem for the layout
  };

  struct SpotLight {
    // TODO: implement
    vec4 color;
  };

  struct IESLight {
    // TODO: implement
    vec4 color;
  };

  struct ProbeLight {
    // TODO: implement
    vec4 color;
  };

  layout (std140) uniform lightUniform {
    #if NUM_AMBIENT_LIGHTS > 0
      AmbientLight ambient[NUM_AMBIENT_LIGHTS];
    #endif
    #if NUM_DIRECTIONAL_LIGHTS > 0
      DirectionalLight directional[NUM_DIRECTIONAL_LIGHTS];
    #endif
    #if NUM_DIRECTIONAL_SHADOW_LIGHTS > 0
      DirectionalShadowLight directionalShadow[NUM_DIRECTIONAL_SHADOW_LIGHTS];
    #endif
    #if NUM_OMNI_LIGHTS > 0
      OmniLight omni[NUM_OMNI_LIGHTS];
    #endif
    #if NUM_SPOT_LIGHTS > 0
      SpotLight spot[NUM_SPOT_LIGHTS];
    #endif
    #if NUM_IES_LIGHTS > 0
      IESLight ies[NUM_IES_LIGHTS];
    #endif
    #if NUM_PROBE_LIGHTS > 0
      ProbeLight probe[NUM_PROBE_LIGHTS];
    #endif
    #if NUM_LIGHTS == 0
      vec4 dummy;
    #endif
  } light;

  #if NUM_SHADOW_LIGHTS > 0
    out vec3 v_light[NUM_SHADOW_LIGHTS];
  #endif
  #if NUM_DIRECTIONAL_SHADOW_LIGHTS > 0
    out vec4 v_directionalShadowDepth[NUM_DIRECTIONAL_SHADOW_LIGHTS];
    out vec4 v_directionalShadowTexcoord[NUM_DIRECTIONAL_SHADOW_LIGHTS];
  #endif

  layout (std140) uniform fogUniform {
    vec4 color;
    float startDistance;
    float endDistance;
    float densityExponent;
  } fog;

  #define kSCNTexcoordCount 2
  struct SCNShaderGeometry {
    vec3 position;
    vec3 normal;
    vec4 tangent;
    vec4 color;
    vec2 texcoords[kSCNTexcoordCount];
  };
  //struct _SCNShaderGeometry {
  //  vec3 position;
  //  vec3 normal;
  //  vec4 tangent;
  //  vec4 color;
  //  vec2 texcoord0;
  //  vec2 texcoord1;
  //};

  uniform float u_time;
  //uniform mat3x4[255] skinningJoints;
  uniform vec4[765] skinningJoints;
  uniform int numSkinningJoints;
  uniform mat4 modelTransform;

  in vec3 position;
  in vec3 normal;
  in vec3 tangent;
  in vec4 color;
  in vec2 texcoord0;
  in vec2 texcoord1;
  in vec4 boneIndices;
  in vec4 boneWeights;

  out vec3 v_position;
  out vec3 v_normal;
  out vec3 v_tangent;
  out vec3 v_bitangent;
  out vec2 v_texcoord0;
  out vec2 v_texcoord1;
  //out vec4 v_color;
  out vec3 v_eye;
  out float v_fogFactor;

  //out _SCNShaderGeometry __geometry;

  __USER_CUSTOM_UNIFORM__

  #if USE_SHADER_MODIFIER_GEOMETRY
  void shaderModifierGeometry(inout SCNShaderGeometry _geometry) {
    __SHADER_MODIFIER_GEOMETRY__
  }
  #endif

  void main() {
    SCNShaderGeometry _geometry;
    _geometry.position = position;
    _geometry.normal = normal;
    _geometry.tangent = vec4(tangent, 1.0);
    _geometry.color = color;
    _geometry.texcoords[0] = texcoord0;
    _geometry.texcoords[1] = texcoord1;
    
    #if USE_SHADER_MODIFIER_GEOMETRY
      shaderModifierGeometry(_geometry);
    #endif

    vec3 pos = vec3(0, 0, 0);
    vec3 nom = vec3(0, 0, 0);
    vec3 tng = vec3(0, 0, 0);
    vec4 col = _geometry.color;

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
        pos += (jointMatrix * vec4(_geometry.position, 1.0)).xyz * weight;
        nom += (mat3(jointMatrix) * _geometry.normal) * weight;
        tng += (mat3(jointMatrix) * _geometry.tangent.xyz) * weight;
      }
    }else{
      mat4 jointMatrix = transpose(mat4(skinningJoints[0],
                                        skinningJoints[1],
                                        skinningJoints[2],
                                        vec4(0, 0, 0, 1)));
      pos = (jointMatrix * vec4(_geometry.position, 1.0)).xyz;
      nom = mat3(jointMatrix) * _geometry.normal;
      tng = mat3(jointMatrix) * _geometry.tangent.xyz;
    }
    //v_position = pos;
    //v_normal = normalize(nom);
    //v_tangent = normalize(tng);
    v_position = (camera.viewTransform * vec4(pos, 1.0)).xyz;
    v_normal = normalize((camera.viewTransform * vec4(nom, 0.0)).xyz);
    v_tangent = normalize((camera.viewTransform * vec4(tng, 0.0)).xyz);
    v_bitangent = cross(v_tangent, v_normal);

    //vec3 viewVec = camera.position.xyz - pos;
    vec3 viewVec = (camera.viewTransform * vec4(camera.position.xyz - pos, 0.0)).xyz;
    v_eye = viewVec;

    //v_color = material.emission;

    // Lighting
    int numLights = 0;

    //#if NUM_AMBIENT_LIGHTS > 0
    //  for(int i=0; i<NUM_AMBIENT_LIGHTS; i++){
    //    v_color += light.ambient[i].color * material.ambient;
    //    v_ambient += light.ambient[i].color;
    //  }
    //#endif

    #if NUM_DIRECTIONAL_LIGHTS > 0
      for(int i=0; i<NUM_DIRECTIONAL_LIGHTS; i++){
        //v_light[numLights + i] = -light.directional[i].direction.xyz;
        v_light[numLights + i] = (camera.viewTransform * (-light.directional[i].direction)).xyz;
      }
      numLights += NUM_DIRECTIONAL_LIGHTS;
    #endif

    #if NUM_DIRECTIONAL_SHADOW_LIGHTS > 0
      for(int i=0; i<NUM_DIRECTIONAL_SHADOW_LIGHTS; i++){
        //v_light[numLights + i] = -light.directionalShadow[i].direction.xyz;
        v_light[numLights + i] = (camera.viewTransform * (-light.directionalShadow[i].direction)).xyz;
        v_directionalShadowDepth[i] = light.directionalShadow[i].viewProjectionTransform * vec4(pos, 1.0);
        v_directionalShadowTexcoord[i] = light.directionalShadow[i].shadowProjectionTransform * vec4(pos, 1.0);
      }
      numLights += NUM_DIRECTIONAL_SHADOW_LIGHTS;
    #endif

    #if NUM_OMNI_LIGHTS > 0
      for(int i=0; i<NUM_OMNI_LIGHTS; i++){
        //v_light[numLights + i] = light.omni[i].position.xyz - pos;
        v_light[numLights + i] = (camera.viewTransform * vec4(light.omni[i].position.xyz - pos, 0.0)).xyz;
      }
      numLights += NUM_OMNI_LIGHTS;
    #endif

    #if NUM_SPOT_LIGHTS > 0
      for(int i=0; i<NUM_SPOT_LIGHTS; i++){
        //v_light[numLights + i] = light.spot[i].position.xyz - pos;
        v_light[numLights + i] = (camera.viewTransform * vec4(light.spot[i].position.xyz - pos, 0.0)).xyz;
      }
      numLights += NUM_SPOT_LIGHTS;
    #endif

    #if NUM_IES_LIGHTS > 0
      // TODO: implement
    #endif

    #if NUM_PROBE_LIGHTS > 0
      // TODO: implement
    #endif


    float distance = length(viewVec);
    v_fogFactor = clamp((distance - fog.startDistance) / (fog.endDistance - fog.startDistance), 0.0, 1.0);

    v_texcoord0 = _geometry.texcoords[0];
    v_texcoord1 = _geometry.texcoords[1];
    gl_Position = camera.viewProjectionTransform * vec4(pos, 1.0);
  }
`

export default _SCNDefaultVertexShader

