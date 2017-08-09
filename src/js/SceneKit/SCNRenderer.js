'use strict'

import CGPoint from '../CoreGraphics/CGPoint'
import CGRect from '../CoreGraphics/CGRect'
import CGSize from '../CoreGraphics/CGSize'
import NSObject from '../ObjectiveC/NSObject'
//import SCNSceneRenderer from './SCNSceneRenderer'
//import SCNTechniqueSupport from './SCNTechniqueSupport'
//import SCNScene from './SCNScene'
//import SCNAntialiasingMode from './SCNAntialiasingMode'
import SCNMaterial from './SCNMaterial'
import SCNMaterialProperty from './SCNMaterialProperty'
import SCNMatrix4 from './SCNMatrix4'
import SCNMatrix4MakeTranslation from './SCNMatrix4MakeTranslation'
import SCNNode from './SCNNode'
import SCNProgram from './SCNProgram'
import SCNPhysicsWorld from './SCNPhysicsWorld'
import SCNCamera from './SCNCamera'
import SCNLight from './SCNLight'
import SCNVector3 from './SCNVector3'
import SCNVector4 from './SCNVector4'
import SCNGeometryPrimitiveType from './SCNGeometryPrimitiveType'
import SCNGeometrySource from './SCNGeometrySource'
import SCNHitTestOption from './SCNHitTestOption'
import SCNHitTestResult from './SCNHitTestResult'
import SKColor from '../SpriteKit/SKColor'

import SKSpriteNode from '../SpriteKit/SKSpriteNode'
import SKTexture from '../SpriteKit/SKTexture'

import _InstanceOf from '../util/_InstanceOf'

/**
 * @access private
 * @type {string}
 */
const _defaultVertexShader = 
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
  out vec4 v_color;
  out vec3 v_eye;
  out float v_fogFactor;

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
    v_position = pos;
    v_normal = normalize(nom);
    v_tangent = normalize(tng);
    v_bitangent = cross(v_tangent, v_normal);

    vec3 viewVec = camera.position.xyz - pos;
    v_eye = viewVec;

    v_color = material.emission;

    // Lighting
    int numLights = 0;

    #if NUM_AMBIENT_LIGHTS > 0
      for(int i=0; i<NUM_AMBIENT_LIGHTS; i++){
        v_color += light.ambient[i].color * material.ambient;
      }
    #endif

    #if NUM_DIRECTIONAL_LIGHTS > 0
      for(int i=0; i<NUM_DIRECTIONAL_LIGHTS; i++){
        v_light[numLights + i] = -light.directional[i].direction.xyz;
      }
      numLights += NUM_DIRECTIONAL_LIGHTS;
    #endif

    #if NUM_DIRECTIONAL_SHADOW_LIGHTS > 0
      for(int i=0; i<NUM_DIRECTIONAL_SHADOW_LIGHTS; i++){
        v_light[numLights + i] = -light.directionalShadow[i].direction.xyz;
        v_directionalShadowDepth[i] = light.directionalShadow[i].viewProjectionTransform * vec4(pos, 1.0);
        v_directionalShadowTexcoord[i] = light.directionalShadow[i].shadowProjectionTransform * vec4(pos, 1.0);
      }
      numLights += NUM_DIRECTIONAL_SHADOW_LIGHTS;
    #endif

    #if NUM_OMNI_LIGHTS > 0
      for(int i=0; i<NUM_OMNI_LIGHTS; i++){
        v_light[numLights + i] = light.omni[i].position.xyz - pos;
      }
      numLights += NUM_OMNI_LIGHTS;
    #endif

    #if NUM_SPOT_LIGHTS > 0
      for(int i=0; i<NUM_SPOT_LIGHTS; i++){
        v_light[numLights + i] = light.spot[i].position.xyz - pos;
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

const _cameraLoc = 0
const _materialLoc = 1
const _lightLoc = 2
const _fogLoc = 3


/**
 * @access private
 * @type {string}
 */
const _defaultFragmentShader = 
 `#version 300 es
  precision mediump float;
  precision highp sampler2DShadow;

  uniform bool[8] textureFlags;
  #define TEXTURE_EMISSION_INDEX 0
  #define TEXTURE_AMBIENT_INDEX 1
  #define TEXTURE_DIFFUSE_INDEX 2
  #define TEXTURE_SPECULAR_INDEX 3
  #define TEXTURE_REFLECTIVE_INDEX 4
  #define TEXTURE_TRANSPARENT_INDEX 5
  #define TEXTURE_MULTIPLY_INDEX 6
  #define TEXTURE_NORMAL_INDEX 7

  uniform bool selfIllumination;

  uniform sampler2D u_emissionTexture;
  uniform sampler2D u_ambientTexture;
  uniform sampler2D u_diffuseTexture;
  uniform sampler2D u_specularTexture;
  uniform samplerCube u_reflectiveTexture;
  uniform sampler2D u_transparentTexture;
  uniform sampler2D u_multiplyTexture;
  uniform sampler2D u_normalTexture;

  #define NUM_AMBIENT_LIGHTS __NUM_AMBIENT_LIGHTS__
  #define NUM_DIRECTIONAL_LIGHTS __NUM_DIRECTIONAL_LIGHTS__
  #define NUM_DIRECTIONAL_SHADOW_LIGHTS __NUM_DIRECTIONAL_SHADOW_LIGHTS__
  #define NUM_OMNI_LIGHTS __NUM_OMNI_LIGHTS__
  #define NUM_SPOT_LIGHTS __NUM_SPOT_LIGHTS__
  #define NUM_IES_LIGHTS __NUM_IES_LIGHTS__
  #define NUM_PROBE_LIGHTS __NUM_PROBE_LIGHTS__

  #define NUM_SHADOW_LIGHTS (NUM_DIRECTIONAL_LIGHTS + NUM_DIRECTIONAL_SHADOW_LIGHTS + NUM_OMNI_LIGHTS + NUM_SPOT_LIGHTS)
  #define NUM_LIGHTS (NUM_AMBIENT_LIGHTS + NUM_DIRECTIONAL_LIGHTS + NUM_DIRECTIONAL_SHADOW_LIGHTS + NUM_OMNI_LIGHTS + NUM_SPOT_LIGHTS + NUM_IES_LIGHTS + NUM_PROBE_LIGHTS)

  #define USE_SHADER_MODIFIER_SURFACE __USE_SHADER_MODIFIER_SURFACE__
  #define USE_SHADER_MODIFIER_FRAGMENT __USE_SHADER_MODIFIER_FRAGMENT__

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

  struct ProbeLight {
    // TODO: implement
    vec4 color;
  };

  struct SpotLight {
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
    in vec3 v_light[NUM_SHADOW_LIGHTS];
  #endif
  #if NUM_DIRECTIONAL_SHADOW_LIGHTS > 0
    in vec4 v_directionalShadowDepth[NUM_DIRECTIONAL_SHADOW_LIGHTS];
    in vec4 v_directionalShadowTexcoord[NUM_DIRECTIONAL_SHADOW_LIGHTS];
    uniform sampler2D u_shadowMapTexture0;
    #if NUM_DIRECTIONAL_SHADOW_LIGHTS > 1
      uniform sampler2D u_shadowMapTexture1;
    #endif
    #if NUM_DIRECTIONAL_SHADOW_LIGHTS > 2
      uniform sampler2D u_shadowMapTexture2;
    #endif
    #if NUM_DIRECTIONAL_SHADOW_LIGHTS > 3
      uniform sampler2D u_shadowMapTexture3;
    #endif
  #endif

  layout (std140) uniform fogUniform {
    vec4 color;
    float startDistance;
    float endDistance;
    float densityExponent;
  } fog;

  struct SCNShaderSurface {
    vec3 view;
    vec3 position;
    vec3 normal;
    vec2 normalTexcoord;
    vec3 geometryNormal;
    vec3 tangent;
    vec3 bitangent;
    vec4 ambient;
    vec2 ambientTexcoord;
    vec4 diffuse;
    vec2 diffuseTexcoord;
    vec4 specular;
    vec2 specularTexcoord;
    vec4 emission;
    vec2 emissionTexcoord;
    vec4 multiply;
    vec2 multiplyTexcoord;
    vec4 transparent;
    vec2 transparentTexcoord;
    vec4 reflective;
    float ambientOcclusion;
    float shininess;
    float fresnel;
    __USER_CUSTOM_SURFACE__
  } _surface;

  struct SCNShaderOutput {
    vec4 color;
  } _output;

  vec2 poissonDisk[4] = vec2[](
    vec2( -0.94201624, -0.39906216 ),
    vec2( 0.94558609, -0.76890725 ),
    vec2( -0.094184101, -0.92938870 ),
    vec2( 0.34495938, 0.29387760 )
  );

  uniform float u_time;

  in vec3 v_position;
  in vec3 v_normal;
  in vec2 v_texcoord0;
  in vec2 v_texcoord1;
  in vec4 v_color;
  in vec3 v_eye;
  in vec3 v_tangent;
  in vec3 v_bitangent;
  in float v_fogFactor;

  out vec4 outColor;

  __USER_CUSTOM_UNIFORM__

  float saturate(float value) {
    return clamp(value, 0.0, 1.0);
  }

  float convDepth(vec4 color) {
    const float rMask = 1.0;
    const float gMask = 1.0 / 255.0;
    const float bMask = 1.0 / (255.0 * 255.0);
    const float aMask = 1.0 / (255.0 * 255.0 * 255.0);
    float depth = dot(color, vec4(rMask, gMask, bMask, aMask));
    return depth * 2.0 - 1.0;
  }

  #if USE_SHADER_MODIFIER_SURFACE
  void shaderModifierSurface() {
    __SHADER_MODIFIER_SURFACE__
  }
  #endif

  #if USE_SHADER_MODIFIER_FRAGMENT
  void shaderModifierFragment() {
    __SHADER_MODIFIER_FRAGMENT__
  }
  #endif

    
  void main() {
    _output.color = v_color;

    //vec3 viewVec = normalize(v_eye);
    //vec3 nom = normalize(v_normal);
    _surface.view = normalize(v_eye);
    _surface.position = v_position;
    _surface.normal = normalize(v_normal);
    _surface.tangent = normalize(v_tangent);
    _surface.bitangent = normalize(v_bitangent);

    // normal texture
    if(textureFlags[TEXTURE_NORMAL_INDEX]){
      mat3 tsInv = mat3(_surface.tangent, _surface.bitangent, _surface.normal);
      vec3 color = normalize(texture(u_normalTexture, v_texcoord0).rgb * 2.0 - 1.0); // FIXME: check mappingChannel to decide which texture you use.
      _surface.normal = normalize(tsInv * color);
    }

    _surface.ambient = material.ambient;
    _surface.diffuse = material.diffuse;
    _surface.specular = material.specular;
    _surface.emission = material.emission;
    _surface.multiply = material.multiply;
    _surface.transparent = material.transparent;
    _surface.reflective = material.reflective;
    _surface.ambientOcclusion = 1.0; // TODO: calculate AO
    _surface.shininess = material.shininess;
    _surface.fresnel = 0.4 * pow(1.0 - clamp(dot(_surface.view, _surface.normal), 0.0, 1.0), material.fresnelExponent); // TODO: calculate coefficient
    // TODO: check mapping channel for each material
    _surface.ambientTexcoord = v_texcoord0;
    _surface.diffuseTexcoord = v_texcoord0;
    _surface.specularTexcoord = v_texcoord0;
    _surface.emissionTexcoord = v_texcoord1;
    _surface.multiplyTexcoord = v_texcoord0;
    _surface.transparentTexcoord = v_texcoord0;

    __USER_CUSTOM_TEXCOORD__

    #if USE_SHADER_MODIFIER_SURFACE
      shaderModifierSurface();
    #endif

    // emission texture
    if(textureFlags[TEXTURE_EMISSION_INDEX]){
      if(selfIllumination){
        vec4 color = texture(u_emissionTexture, v_texcoord1); // FIXME: check mappingChannel to decide which texture you use.
        _output.color += color;
      }else{
        vec4 color = texture(u_emissionTexture, v_texcoord0);
        _output.color = color * _output.color;
      }
    }

    vec4 specularColor;
    if(textureFlags[TEXTURE_SPECULAR_INDEX]){
      vec4 color = texture(u_specularTexture, v_texcoord0);
      specularColor = color;
    }else{
      specularColor = material.specular;
    }
      
    _output.color.a = material.diffuse.a;

    // Lighting
    int numLights = 0;

    #if NUM_AMBIENT_LIGHTS > 0
      // nothing to do for ambient lights
    #endif

    #if NUM_DIRECTIONAL_LIGHTS > 0
      for(int i=0; i<NUM_DIRECTIONAL_LIGHTS; i++){
        // diffuse
        vec3 lightVec = normalize(v_light[numLights + i]);
        float diffuse = clamp(dot(lightVec, _surface.normal), 0.0f, 1.0f);
        _output.color.rgb += light.directional[i].color.rgb * material.diffuse.rgb * diffuse;

        // specular
        if(diffuse > 0.0f){
          vec3 halfVec = normalize(lightVec + _surface.view);
          float specular = pow(dot(halfVec, _surface.normal), material.shininess);
          _output.color.rgb += specularColor.rgb * specular;
        }
      }
      numLights += NUM_DIRECTIONAL_LIGHTS;
    #endif

    #if NUM_OMNI_LIGHTS > 0
      for(int i=0; i<NUM_OMNI_LIGHTS; i++){
        // diffuse
        vec3 lightVec = normalize(v_light[numLights + i]);
        float diffuse = clamp(dot(lightVec, _surface.normal), 0.0f, 1.0f);
        _output.color.rgb += light.omni[i].color.rgb * material.diffuse.rgb * diffuse;

        // specular
        if(diffuse > 0.0f){
          vec3 halfVec = normalize(lightVec + _surface.view);
          float specular = pow(dot(halfVec, _surface.normal), material.shininess);
          //outColor.rgb += material.specular.rgb * specular; // TODO: get the light color of specular
          _output.color.rgb += specularColor.rgb * specular;
        }
      }
      numLights += NUM_OMNI_LIGHTS;
    #endif

    #if NUM_SPOT_LIGHTS > 0
      // TODO: implement
    #endif

    #if NUM_IES_LIGHTS > 0
      // TODO: implement
    #endif

    #if NUM_PROBE_LIGHTS > 0
      // TODO: implement
    #endif

    __FS_LIGHTING__
    

    // diffuse texture
    if(textureFlags[TEXTURE_DIFFUSE_INDEX]){
      vec4 color = texture(u_diffuseTexture, v_texcoord0);
      _output.color = color * _output.color;
    }

    // fresnel reflection
    if(textureFlags[TEXTURE_REFLECTIVE_INDEX]){
      vec3 r = reflect(_surface.view, _surface.normal);
      //float f0 = 0.0; // TODO: calculate f0
      //float fresnel = f0 + (1.0 - f0) * pow(1.0 - clamp(dot(viewVec, nom), 0.0, 1.0), material.fresnelExponent);
      //float fresnel = 0.4 * pow(1.0 - clamp(dot(_surface.view, _surface.normal), 0.0, 1.0), material.fresnelExponent);
      _output.color.rgb += texture(u_reflectiveTexture, r).rgb * _surface.fresnel;
    }

    float fogFactor = pow(v_fogFactor, fog.densityExponent);
    _output.color = mix(_output.color, fog.color, fogFactor);

    #if USE_SHADER_MODIFIER_FRAGMENT
      shaderModifierFragment();
    #endif

    outColor = _output.color;
  }
`

const _fsDirectionalShadow = `
  //float shadow = convDepth(texture(u_shadowMapTexture__I__, v_directionalShadowTexcoord[__I__].xy / v_directionalShadowTexcoord[__I__].w));
  //if(v_directionalShadowDepth[__I__].z / v_directionalShadowDepth[__I__].w - 0.0001 > shadow){
  //  _output.color.rgb += material.diffuse.rgb * light.directionalShadow[__I__].shadowColor.rgb;
  //}else{
  //  // diffuse
  //  vec3 lightVec = normalize(v_light[numLights]);
  //  float diffuse = clamp(dot(lightVec, _surface.normal), 0.0f, 1.0f);
  //  _output.color.rgb += light.directionalShadow[__I__].color.rgb * material.diffuse.rgb * diffuse;

  //  // specular
  //  if(diffuse > 0.0f){
  //    vec3 halfVec = normalize(lightVec + _surface.view);
  //    float specular = pow(dot(halfVec, _surface.normal), material.shininess);
  //    _output.color.rgb += specularColor.rgb * specular;
  //  }
  //}

  {
    float shadow = 0.0;
    for(int i=0; i<4; i++){
      float d = convDepth(texture(u_shadowMapTexture__I__, (v_directionalShadowTexcoord[__I__].xy + poissonDisk[i]/700.0) / v_directionalShadowTexcoord[__I__].w));
      if(v_directionalShadowDepth[__I__].z / v_directionalShadowDepth[__I__].w - 0.0001 > d){
        shadow += 0.25;
      }
    }
    vec3 shadowColor = material.diffuse.rgb * light.directionalShadow[__I__].shadowColor.rgb;
    // diffuse
    vec3 lightVec = normalize(v_light[numLights]);
    float diffuse = clamp(dot(lightVec, _surface.normal), 0.0f, 1.0f);
    vec3 lightColor = light.directionalShadow[__I__].color.rgb * material.diffuse.rgb * diffuse;

    // specular
    if(diffuse > 0.0f){
      vec3 halfVec = normalize(lightVec + _surface.view);
      float specular = pow(dot(halfVec, _surface.normal), material.shininess);
      lightColor += specularColor.rgb * specular;
    }
    _output.color.rgb += shadowColor * shadow + lightColor * (1.0 - shadow);
  }

  numLights += 1;
`

const _defaultCameraDistance = 15

/**
 * @access private
 * @type {string}
 */
const _defaultParticleVertexShader =
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

/**
 * @access private
 * @type {string}
 */
const _defaultParticleFragmentShader =
 `#version 300 es
  precision mediump float;

  uniform sampler2D particleTexture;

  in vec2 v_texcoord;
  in vec4 v_color;

  out vec4 outColor;

  void main() {
    vec4 texColor = texture(particleTexture, v_texcoord);
    texColor.rgb *= texColor.a;
    outColor = v_color * texColor;
  }
`

/**
 * @access private
 * @type {string}
 */
const _defaultHitTestVertexShader =
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

/**
 * @access private
 * @type {string}
 */
const _defaultHitTestFragmentShader =
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

/**
 * @access private
 * @type {string}
 */
const _defaultShadowVertexShader =
 `#version 300 es
  precision mediump float;

  uniform mat4 viewProjectionTransform;
  uniform vec4[765] skinningJoints;
  uniform int numSkinningJoints;

  in vec3 position;
  //in vec3 normal;
  in vec4 boneIndices;
  in vec4 boneWeights;

  out vec3 v_position;

  void main() {
    vec3 pos = vec3(0, 0, 0);
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
      }
    }else{
      mat4 jointMatrix = transpose(mat4(skinningJoints[0],
                                        skinningJoints[1],
                                        skinningJoints[2],
                                        vec4(0, 0, 0, 1)));
      pos = (jointMatrix * vec4(position, 1.0)).xyz;
    }
    //v_position = pos;

    gl_Position = viewProjectionTransform * vec4(pos, 1.0);
    v_position = gl_Position.xyz / gl_Position.w;
  }
`

/**
 * @access private
 * @type {string}
 */
const _defaultShadowFragmentShader =
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

/**
 * A renderer for displaying SceneKit scene in an an existing Metal workflow or OpenGL context. 
 * @access public
 * @extends {NSObject}
 * @implements {SCNSceneRenderer}
 * @implements {SCNTechniqueSupport}
 * @see https://developer.apple.com/documentation/scenekit/scnrenderer
 */
export default class SCNRenderer extends NSObject {
  // Creating a Renderer

  /**
   * Creates a renderer with the specified Metal device.
   * @access public
   * @constructor
   * @param {?MTLDevice} device - A Metal device.
   * @param {?Map<AnyHashable, Object>} [options = null] - An optional dictionary for future extensions.
   * @desc Use this initializer to create a SceneKit renderer that draws into the rendering targets your app already uses to draw other content. For the device parameter, pass the MTLDevice object your app uses for drawing. Then, to tell SceneKit to render your content, call the SCNRenderer method, providing a command buffer and render pass descriptor for SceneKit to use in its rendering.
   * @see https://developer.apple.com/documentation/scenekit/scnrenderer/1518404-init
   */
  constructor(device, options = null) {
    super()

    // Specifying a Scene

    /**
     * The scene to be rendered.
     * @type {?SCNScene}
     * @see https://developer.apple.com/documentation/scenekit/scnrenderer/1518400-scene
     */
    this.scene = null

    // Managing Animation Timing

    this._nextFrameTime = 0

    /**
     * context to draw frame
     * @type {WebGLRenderingContext}
     */
    this._context = null

    /**
     *
     * @access private
     * @type {SKColor}
     */
    this._backgroundColor = null

    //////////////////////
    // SCNSceneRenderer //
    //////////////////////

    // Managing Scene Display

    /**
     * Required. The node from which the scene’s contents are viewed for rendering.
     * @access private
     * @type {?SCNNode}
     * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1523982-pointofview
     */
    this._pointOfView = null

    /**
     * Required. A Boolean value that determines whether SceneKit automatically adds lights to a scene.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1523812-autoenablesdefaultlighting
     */
    this.autoenablesDefaultLighting = false

    /**
     * Required. A Boolean value that determines whether SceneKit applies jittering to reduce aliasing artifacts.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1524026-isjitteringenabled
     */
    this.isJitteringEnabled = false

    /**
     * Required. A Boolean value that determines whether SceneKit displays rendering performance statistics in an accessory view.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1522763-showsstatistics
     */
    this.showsStatistics = false

    /**
     * Required. Options for drawing overlay content in a scene that can aid debugging.
     * @type {SCNDebugOptions}
     * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1523281-debugoptions
     */
    this.debugOptions = null

    this._renderingAPI = null

    // Managing Scene Animation Timing

    /**
     * Required. The current scene time.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1522680-scenetime
     */
    this.sceneTime = 0

    /**
     * current time in seconds
     * @access private
     * @type {number}
     */
    this._time = 0

    /**
     * Required. A Boolean value that determines whether the scene is playing.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1523401-isplaying
     */
    this.isPlaying = false

    /**
     * Required. A Boolean value that determines whether SceneKit restarts the scene time after all animations in the scene have played.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1522878-loops
     */
    this.loops = false


    // Participating in the Scene Rendering Process

    /**
     * Required. A delegate object that receives messages about SceneKit’s rendering process.
     * @type {?SCNSceneRendererDelegate}
     * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1522671-delegate
     */
    this.delegate = null


    // Customizing Scene Rendering with Metal

    this._currentRenderCommandEncoder = null
    this._device = null
    this._commandQueue = null
    this._colorPixelFormat = null
    this._depthPixelFormat = null
    this._stencilPixelFormat = null

    // Rendering Sprite Kit Content over a Scene

    /**
     * Required. A Sprite Kit scene to be rendered on top of the SceneKit content.
     * @type {?SKScene}
     * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1524051-overlayskscene
     */
    this.overlaySKScene = null


    // Working With Positional Audio

    /**
     * Required. The node representing the listener’s position in the scene for use with positional audio effects.
     * @type {?SCNNode}
     * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1523747-audiolistener
     */
    //this.audioListener = null
    //this._audioEnvironmentNode = null
    //this._audioEngine = null

    // Instance Properties

    /**
     * Required. 
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1522854-currenttime
     */
    this.currentTime = 0

    /**
     * @access private
     * @type {SCNProgram}
     */
    this.__defaultProgram = null

    /**
     * @access private
     * @type {SCNProgram}
     */
    this.__defaultParticleProgram = null

    /**
     * @access private
     * @type {SCNProgram}
     */
    this.__defaultHitTestProgram = null

    /**
     * @access private
     * @type {SCNProgram}
     */
    this.__defaultShadowProgram = null


    this._location = new Map()

    this._defaultCameraPosNode = new SCNNode()
    this._defaultCameraRotNode = new SCNNode()
    this._defaultCameraNode = new SCNNode()
    this._defaultCameraNode.name = 'kSCNFreeViewCameraName'

    const camera = new SCNCamera()
    camera.name = 'kSCNFreeViewCameraNameCamera'
    this._defaultCameraNode.camera = camera
    this._defaultCameraNode.position = new SCNVector3(0, 0, _defaultCameraDistance)
    this._defaultCameraNode._presentation = this._defaultCameraNode.copy()

    this._defaultCameraPosNode.addChildNode(this._defaultCameraRotNode)
    this._defaultCameraPosNode._presentation = this._defaultCameraPosNode.copy()
    this._defaultCameraRotNode.addChildNode(this._defaultCameraNode)
    this._defaultCameraRotNode._presentation = this._defaultCameraRotNode.copy()

    this._defaultLightNode = new SCNNode()
    const light = new SCNLight()
    light.color = SKColor.white
    light.type = SCNLight.LightType.omni
    light.position = new SCNVector3(0, 10, 10)
    this._defaultLightNode.light = light
    this._defaultLightNode._presentation = this._defaultLightNode.copy()

    /**
     * @access private
     * @type {CGRect}
     */
    this._viewRect = new CGRect(new CGPoint(0, 0), new CGSize(0, 0))

    /**
     * The background color of the view.
     * @type {SKColor}
     */
    this._backgroundColor = SKColor.white

    /**
     * @access private
     * @type {WebGLTexture}
     */
    this.__dummyTexture = null

    /**
     * @access private
     * @type {Object}
     */
    this._lightNodes = {}

    /**
     * @access private
     * @type {Object}
     */
    this._numLights = {}

    /**
     * @access private
     * @type {WebGLBuffer}
     */
    this._cameraBuffer = null

    /**
     * @access private
     * @type {WebGLBuffer}
     */
    this._lightBuffer = null

    /**
     * @access private
     * @type {WebGLBuffer}
     */
    this._fogBuffer = null

    ////////////////////////////
    // Hit Test
    ////////////////////////////

    /**
     * @access private
     * @type {WebGLFramebuffer}
     */
    this._hitFrameBuffer = null

    /**
     * @access private
     * @type {WebGLRenderbuffer}
     */
    this._hitDepthBuffer = null

    /**
     * @access private
     * @type {WebGLTexture}
     */
    this._hitObjectIDTexture = null

    /**
     * @access private
     * @type {WebGLTexture}
     */
    this._hitFaceIDTexture = null

    /**
     * @access private
     * @type {WebGLTexture}
     */
    this._hitPositionTexture = null

    /**
     * @access private
     * @type {WebGLTexture}
     */
    this._hitNormalTexture = null

    /**
     * @access private
     * @type {SCNProgram}
     */
    this._currentProgram = null
  }

  // Managing Animation Timing

  /**
   * The timestamp for the next frame to be rendered.
   * @type {number}
   * @desc If the renderer’s scene has any attached actions or animations, use this property to determine how long your app should wait before telling the renderer to draw another frame. If this property’s value matches that of the renderer’s currentTime property, the scene contains a continuous animation—schedule your next render at whatever time best maintains your app’s performance. If the value is infinite, the scene has no running actions or animations.
   * @see https://developer.apple.com/documentation/scenekit/scnrenderer/1518410-nextframetime
   */
  get nextFrameTime() {
    return this._nextFrameTime
  }

  // Rendering a Scene Using Metal

  /**
   * Renders the scene’s contents at the specified system time in the specified Metal command buffer.
   * @access public
   * @param {number} time - The timestamp, in seconds, at which to render the scene.
   * @param {CGRect} viewport - The pixel dimensions in which to render.
   * @param {MTLCommandBuffer} commandBuffer - The Metal command buffer in which SceneKit should schedule rendering commands.
   * @param {MTLRenderPassDescriptor} renderPassDescriptor - The Metal render pass descriptor describing the rendering target.
   * @returns {void}
   * @desc This method can be used only with an SCNRenderer object created with the SCNRenderer initializer. Call this method to tell SceneKit to draw the renderer’s scene into the render target described by the renderPassDescriptor parameter, by encoding render commands into the commandBuffer parameter.When you call this method, SceneKit updates its hierarchy of presentation nodes based on the specified timestamp, and then draws the scene using the specified Metal objects. NoteBy default, the playback timing of actions and animations in a scene is based on the system time, not the scene time. Before using this method to control the playback of animations, set the usesSceneTimeBase property of each animation to true, or specify the playUsingSceneTimeBase option when loading a scene file that contains animations.
   * @see https://developer.apple.com/documentation/scenekit/scnrenderer/1518401-render
   */
  renderAtTimePassDescriptor(time, viewport, commandBuffer, renderPassDescriptor) {
  }

  // Rendering a Scene Using OpenGL

  /**
   * Renders the scene’s contents in the renderer’s OpenGL context.
   * @deprecated
   * @access public
   * @returns {void}
   * @desc This method can be used only with an SCNRenderer object created with the SCNRenderer initializer. Call this method to tell SceneKit to draw the renderer’s scene into the OpenGL context you created the renderer with.When you call this method, SceneKit updates its hierarchy of presentation nodes based on the current system time, and then draws the scene.
   * @see https://developer.apple.com/documentation/scenekit/scnrenderer/1518403-render
   */
  render() {
    if(this.context === null){
      console.error('SCNRenderer.render(): context is null')
      return
    }
    const gl = this.context

    if(this.scene === null){
      if(this.overlaySKScene){
        const sk = this.overlaySKScene
        gl.clearColor(sk.backgroundColor.red, sk.backgroundColor.green, sk.backgroundColor.blue, sk.backgroundColor.alpha)
        gl.clear(gl.COLOR_BUFFER_BIT)
        this._renderOverlaySKScene()
      }
      return
    }

    this._lightNodes = this._createLightNodeArray() // createLightNodeArray must be called before getting program

    const p = this._defaultProgram
    const glProgram = p._getGLProgramForContext(gl)

    gl.clearColor(this._backgroundColor.red, this._backgroundColor.green, this._backgroundColor.blue, this._backgroundColor.alpha)
    gl.clearDepth(1.0)
    gl.clearStencil(0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT)

    //gl.useProgram(glProgram)
    this._useProgram(p)

    gl.depthFunc(gl.LEQUAL)
    gl.depthMask(true)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    //////////////////////////
    // Camera
    //////////////////////////
    if(this._cameraBuffer === null){
      this._initializeCameraBuffer(glProgram)
    }
    const cameraData = []
    const cameraNode = this._getCameraNode()
    cameraNode._updateWorldTransform()
    const cameraPNode = cameraNode.presentation || cameraNode
    const camera = cameraPNode.camera
    camera._updateProjectionTransform(this._viewRect)

    cameraData.push(...cameraPNode.worldTransform.getTranslation().floatArray(), 0)
    cameraData.push(...cameraPNode.viewTransform.floatArray())
    cameraData.push(...cameraPNode.viewProjectionTransform.floatArray())
    gl.bindBuffer(gl.UNIFORM_BUFFER, this._cameraBuffer)
    gl.bufferData(gl.UNIFORM_BUFFER, new Float32Array(cameraData), gl.DYNAMIC_DRAW)
    gl.bindBuffer(gl.UNIFORM_BUFFER, null)
    
    //console.log('cameraNode.worldPosition: ' + cameraPNode.worldTransform.getTranslation().float32Array())
    //console.log('viewTransform: ' + cameraPNode.viewTransform.float32Array())
    //console.log('projectionTransform: ' + cameraNode.camera.projectionTransform.float32Array())
    //console.log('viewProjectionTransform: ' + cameraNode.viewProjectionTransform.float32Array())

    //////////////////////////
    // Fog
    //////////////////////////
    if(this._fogBuffer === null){
      this._initializeFogBuffer(glProgram)
    }
    const fogData = []
    if(this.scene.fogColor !== null && this.scene.fogEndDistance !== 0){
      fogData.push(
        ...this.scene.fogColor.floatArray(),
        this.scene.fogStartDistance,
        this.scene.fogEndDistance,
        this.scene.fogDensityExponent,
        0
      )
    }else{
      fogData.push(0, 0, 0, 0, camera.zFar * 2, camera.zFar * 2 + 1, 1, 0)
    }
    gl.bindBuffer(gl.UNIFORM_BUFFER, this._fogBuffer)
    gl.bufferData(gl.UNIFORM_BUFFER, new Float32Array(fogData), gl.DYNAMIC_DRAW)
    gl.bindBuffer(gl.UNIFORM_BUFFER, null)

    //////////////////////////
    // Lights
    //////////////////////////
    if(this._lightBuffer === null){
      this._initializeLightBuffer(glProgram)
    }
    const lights = this._lightNodes
    const lightData = []
    lights.ambient.forEach((node) => {
      lightData.push(...node.presentation.light.color.float32Array())
    })
    lights.directional.forEach((node) => {
      const direction = (new SCNVector3(0, 0, -1)).rotateWithQuaternion(node.presentation._worldOrientation)
      lightData.push(
        ...node.presentation.light.color.float32Array(),
        ...direction.float32Array(), 0
      )
    })
    lights.directionalShadow.forEach((node) => {
      const direction = (new SCNVector3(0, 0, -1)).rotateWithQuaternion(node.presentation._worldOrientation)
      node.presentation.light._updateProjectionTransform()
      lightData.push(
        ...node.presentation.light.color.float32Array(),
        ...direction.float32Array(), 0,
        ...node.presentation.light.shadowColor.float32Array(),
        ...node.presentation.lightViewProjectionTransform.float32Array(),
        ...node.presentation.shadowProjectionTransform.float32Array()
      )
    })
    lights.omni.forEach((node) => {
      lightData.push(
        ...node.presentation.light.color.float32Array(),
        ...node.presentation._worldTranslation.float32Array(), 0
      )
    })
    lights.probe.forEach((node) => {
      lightData.push(...node.presentation.light.color.float32Array())
    })
    lights.spot.forEach((node) => {
      lightData.push(...node.presentation.light.color.float32Array())
    })

    gl.bindBuffer(gl.UNIFORM_BUFFER, this._lightBuffer)
    gl.bufferData(gl.UNIFORM_BUFFER, new Float32Array(lightData), gl.DYNAMIC_DRAW)
    gl.bindBuffer(gl.UNIFORM_BUFFER, null)

    //////////////////////////
    // Background (SkyBox)
    //////////////////////////
    if(this.scene.background._contents !== null){
      const skyBox = this.scene._skyBox
      skyBox.position = cameraPNode._worldTranslation
      const scale = camera.zFar * 1.154
      skyBox.scale = new SCNVector3(scale, scale, scale)
      skyBox._updateWorldTransform()

      // disable fog
      const disabledFogData = fogData.slice(0)
      disabledFogData[4] = camera.zFar * 2.0 // startDistance
      disabledFogData[5] = camera.zFar * 2.1 // endDistance
      disabledFogData[6] = 1.0 // densityExponent
      gl.bindBuffer(gl.UNIFORM_BUFFER, this._fogBuffer)
      gl.bufferData(gl.UNIFORM_BUFFER, new Float32Array(disabledFogData), gl.DYNAMIC_DRAW)
      gl.bindBuffer(gl.UNIFORM_BUFFER, null)

      this._renderNode(skyBox)

      // enable fog
      gl.bindBuffer(gl.UNIFORM_BUFFER, this._fogBuffer)
      gl.bufferData(gl.UNIFORM_BUFFER, new Float32Array(fogData), gl.DYNAMIC_DRAW)
      gl.bindBuffer(gl.UNIFORM_BUFFER, null)
    }

    //////////////////////////
    // Shadow
    //////////////////////////
    //gl.useProgram(this._defaultShadowProgram._glProgram)
    this._useProgram(this._defaultShadowProgram)
    gl.enable(gl.DEPTH_TEST)
    gl.depthMask(true)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)
    gl.clearColor(1.0, 1.0, 1.0, 1.0)
    gl.disable(gl.BLEND)
    const shadowRenderingArray = this._createShadowNodeArray()
    
    for(const key of Object.keys(lights)){
      for(const lightNode of lights[key]){
        this._renderNodesShadowOfLight(shadowRenderingArray, lightNode)
      }
    }
    this._setViewPort() // reset viewport size
    //gl.useProgram(program)
    this._useProgram(p)
    for(let i=0; i<lights.directionalShadow.length; i++){
      const node = lights.directionalShadow[i]
      const symbol = `TEXTURE${i+8}`
      gl.activeTexture(gl[symbol])
      gl.bindTexture(gl.TEXTURE_2D, node.presentation.light._shadowDepthTexture)
    }
    gl.enable(gl.BLEND)

    //////////////////////////
    // Nodes
    //////////////////////////
    const renderingArray = this._createRenderingNodeArray()
    renderingArray.forEach((node) => {
      this._renderNode(node)
    })

    const particleProgram = this._defaultParticleProgram._glProgram
    //gl.useProgram(particleProgram)
    this._useProgram(this._defaultParticleProgram)
    gl.depthMask(false)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
    gl.uniformMatrix4fv(gl.getUniformLocation(particleProgram, 'viewTransform'), false, cameraPNode.viewTransform.float32Array())
    gl.uniformMatrix4fv(gl.getUniformLocation(particleProgram, 'projectionTransform'), false, cameraPNode.projectionTransform.float32Array())

    //////////////////////////
    // Particles
    //////////////////////////
    if(this.scene._particleSystems !== null){
      for(const system of this.scene._particleSystems){
        this._renderParticleSystem(system)
      }
    }
    const particleArray = this._createParticleNodeArray()
    particleArray.forEach((node) => {
      this._renderParticle(node)
    })

    //////////////////////////
    // 2D Overlay
    //////////////////////////
    this._renderOverlaySKScene()

    // DEBUG: show shadow map
    //this._showShadowMapOfLight(lights.directionalShadow[0])

    gl.flush()
  }

  _renderOverlaySKScene() {
    if(this.overlaySKScene === null){
      return
    }
    const gl = this.context
    gl.clearDepth(-1)
    gl.clearStencil(0)
    gl.depthMask(true)
    gl.enable(gl.DEPTH_TEST)
    gl.disable(gl.CULL_FACE)
    gl.depthFunc(gl.GEQUAL)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT)

    const skNodes = this._createSKNodeArray()
    for(const node of skNodes){
      this._renderSKNode(node)
    }
  }

  /**
   * @access private
   * @returns {SCNNode} -
   */
  _getCameraNode() {
    let cameraNode = this._pointOfView
    if(cameraNode === null){
      cameraNode = this._searchCameraNode()
      this._pointOfView = cameraNode
      if(cameraNode === null){
        cameraNode = this._defaultCameraNode
      }
    }
    if(cameraNode === this._defaultCameraNode){
      this._defaultCameraPosNode._updateWorldTransform()
    }
    return cameraNode
  }

  /**
   *
   * @access private
   * @returns {SCNNode[]} -
   */
  _createShadowNodeArray() {
    const arr = [this.scene._rootNode]
    const targetNodes = []
    while(arr.length > 0){
      const node = arr.shift()
      if(node.presentation !== null 
      && node.presentation.geometry !== null
      && node.presentation.castsShadow
      && node.presentation._worldOpacity > 0
      && !node.presentation.isHidden){
        targetNodes.push(node)
      }
      arr.push(...node.childNodes)
    }

    return targetNodes
  }

  /**
   *
   * @access private
   * @returns {SCNNode[]} -
   */
  _createRenderingNodeArray() {
    const arr = [this.scene._rootNode]
    const targetNodes = []
    while(arr.length > 0){
      const node = arr.shift()
      if(node.presentation !== null && node.presentation.geometry !== null){
        targetNodes.push(node)
      }
      arr.push(...node.childNodes)
    }
    targetNodes.sort((a, b) => { 
      return (a.presentation.renderingOrder - b.presentation.renderingOrder) + (b.presentation._worldOpacity - a.presentation._worldOpacity) * 0.5 
    })

    return targetNodes
  }

  /**
   *
   * @access private
   * @returns {SCNNode[]} -
   */
  _createParticleNodeArray() {
    const arr = [this.scene._rootNode]
    const targetNodes = []
    while(arr.length > 0){
      const node = arr.shift()
      if(node.presentation !== null && node.presentation.particleSystems !== null){
        targetNodes.push(node)
      }
      arr.push(...node.childNodes)
    }
    targetNodes.sort((a, b) => { return (a.renderingOrder - b.renderingOrder) + (b.opacity - a.opacity) * 0.5 })

    return targetNodes
  }

  /**
   *
   * @access private
   * @returns {SCNNode[]} -
   */
  _createLightNodeArray() {
    const targetNodes = {
      ies: [],
      ambient: [],
      directional: [],
      omni: [],
      probe: [],
      spot: [],
      
      directionalShadow: []
    }

    const arr = [this.scene.rootNode]
    let numLights = 0
    while(arr.length > 0){
      const node = arr.shift()
      if(node.presentation !== null && node.presentation.light !== null){
        if(node.presentation.light.type === 'directional' && node.presentation.light.castsShadow){
          targetNodes.directionalShadow.push(node)
        }else{
          targetNodes[node.presentation.light.type].push(node)
        }
        if(node.presentation.light.type !== SCNLight.LightType.ambient){
          numLights += 1
        }
      }
      arr.push(...node.childNodes)
    }
    if(this.autoenablesDefaultLighting && numLights === 0){
      targetNodes[this._defaultLightNode.light.type].push(this._defaultLightNode)
    }

    return targetNodes
  }

  /**
   *
   * @access private
   * @returns {SCNNode[]} -
   */
  _createRenderingPhysicsNodeArray() {
    const arr = [this.scene._rootNode]
    const targetNodes = []
    while(arr.length > 0){
      const node = arr.shift()
      if(node.presentation !== null 
         && node.presentation.physicsBody !== null
         && node.presentation.physicsBody.physicsShape !== null){
        targetNodes.push(node)
      }
      arr.push(...node.childNodes)
    }
    targetNodes.sort((a, b) => { return a.renderingOrder - b.renderingOrder })

    return targetNodes
  }

  /**
   *
   * @access private
   * @param {SCNNode[]} nodes -
   * @param {SCNNode} lightNode -
   * @returns {void}
   */
  _renderNodesShadowOfLight(nodes, lightNode) {
    const lp = lightNode.presentation
    const light = lp.light
    if(!lp.castsShadow){
      return
    }
    this._setViewPort(light._shadowMapWidth, light._shadowMapHeight)
    const gl = this.context
    const glProgram = this._defaultShadowProgram._getGLProgramForContext(gl)
    gl.bindFramebuffer(gl.FRAMEBUFFER, light._getDepthBufferForContext(gl))
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    gl.uniformMatrix4fv(gl.getUniformLocation(glProgram, 'viewProjectionTransform'), false, lp.lightViewProjectionTransform.float32Array())

    for(const node of nodes){
      const geometry = node.presentation.geometry
      const geometryCount = geometry.geometryElements.length
      if(geometryCount === 0){
        // nothing to draw...
        continue
      }

      if(geometry._shadowVAO === null){
        this._initializeShadowVAO(node, glProgram)
      }

      if(node.morpher !== null){
        //this._updateVAO(node)
      }

      if(node.presentation.skinner !== null){
        if(node.presentation.skinner._useGPU){
          gl.uniform1i(gl.getUniformLocation(glProgram, 'numSkinningJoints'), node.presentation.skinner.numSkinningJoints)
          gl.uniform4fv(gl.getUniformLocation(glProgram, 'skinningJoints'), node.presentation.skinner.float32Array())
        }else{
          gl.uniform1i(gl.getUniformLocation(glProgram, 'numSkinningJoints'), 0)
          gl.uniform4fv(gl.getUniformLocation(glProgram, 'skinningJoints'), SCNMatrix4MakeTranslation(0, 0, 0).float32Array3x4f())
        }
      }else{
        gl.uniform1i(gl.getUniformLocation(glProgram, 'numSkinningJoints'), 0)
        gl.uniform4fv(gl.getUniformLocation(glProgram, 'skinningJoints'), node.presentation._worldTransform.float32Array3x4f())
      }

      for(let i=0; i<geometryCount; i++){
        const vao = geometry._shadowVAO[i]
        const element = geometry.geometryElements[i]

        gl.bindVertexArray(vao)
        // FIXME: use bufferData instead of bindBufferBase

        let shape = null
        switch(element.primitiveType){
          case SCNGeometryPrimitiveType.triangles:
            shape = gl.TRIANGLES
            break
          case SCNGeometryPrimitiveType.triangleStrip:
            shape = gl.TRIANGLE_STRIP
            break
          case SCNGeometryPrimitiveType.line:
            shape = gl.LINES
            break
          case SCNGeometryPrimitiveType.point:
            shape = gl.POINTS
            break
          case SCNGeometryPrimitiveType.polygon:
            shape = gl.TRIANGLE_FAN
            break
          default:
            throw new Error(`unsupported primitiveType: ${element.primitiveType}`)
        }

        let size = null
        switch(element.bytesPerIndex){
          case 1:
            size = gl.UNSIGNED_BYTE
            break
          case 2:
            size = gl.UNSIGNED_SHORT
            break
          case 4:
            size = gl.UNSIGNED_INT
            break
          default:
            throw new Error(`unsupported index size: ${element.bytesPerIndex}`)
        }

        gl.drawElements(shape, element._glData.length, size, 0)
      }
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  }

  /**
   *
   * @access private
   * @param {SCNNode} node -
   * @returns {void}
   */
  _renderNode(node) {
    if(node.presentation.isHidden || node.presentation._worldOpacity <= 0){
      return
    }
    const gl = this.context
    const geometry = node.presentation.geometry
    const geometryCount = geometry.geometryElements.length
    if(geometryCount === 0){
      // nothing to draw...
      return
    }
    const scnProgram = this._getProgramForGeometry(geometry)
    const glProgram = scnProgram._getGLProgramForContext(gl)

    this._switchProgram(scnProgram)

    if(geometry._vertexArrayObjects === null){
      this._initializeVAO(node, glProgram)
      this._initializeUBO(node, glProgram) // FIXME: program should have UBO, not node.
    }

    if(node.morpher !== null || (node.skinner && !node.skinner._useGPU)){
      this._updateVAO(node)
    }

    gl.uniformMatrix4fv(gl.getUniformLocation(glProgram, 'modelTransform'), false, node._worldTransform.float32Array())

    if(node.presentation.skinner !== null){
      if(node.presentation.skinner._useGPU){
        gl.uniform1i(gl.getUniformLocation(glProgram, 'numSkinningJoints'), node.presentation.skinner.numSkinningJoints)
        gl.uniform4fv(gl.getUniformLocation(glProgram, 'skinningJoints'), node.presentation.skinner.float32Array())
      }else{
        gl.uniform1i(gl.getUniformLocation(glProgram, 'numSkinningJoints'), 0)
        gl.uniform4fv(gl.getUniformLocation(glProgram, 'skinningJoints'), SCNMatrix4MakeTranslation(0, 0, 0).float32Array3x4f())
      }
    }else{
      gl.uniform1i(gl.getUniformLocation(glProgram, 'numSkinningJoints'), 0)
      gl.uniform4fv(gl.getUniformLocation(glProgram, 'skinningJoints'), node.presentation._worldTransform.float32Array3x4f())
    }

    for(let i=0; i<geometryCount; i++){
      const materialCount = geometry.materials.length
      const material = geometry.materials[i % materialCount]
      let p = glProgram
      if(material && material.program){
        this._switchProgram(material.program)
        // TODO: refactoring
        p = material.program._getGLProgramForContext(gl)
        if(node.presentation.skinner !== null){
          if(node.presentation.skinner._useGPU){
            gl.uniform1i(gl.getUniformLocation(p, 'numSkinningJoints'), node.presentation.skinner.numSkinningJoints)
            gl.uniform4fv(gl.getUniformLocation(p, 'skinningJoints'), node.presentation.skinner.float32Array())
          }else{
            gl.uniform1i(gl.getUniformLocation(p, 'numSkinningJoints'), 0)
            gl.uniform4fv(gl.getUniformLocation(p, 'skinningJoints'), SCNMatrix4MakeTranslation(0, 0, 0).float32Array3x4f())
          }
        }else{
          gl.uniform1i(gl.getUniformLocation(p, 'numSkinningJoints'), 0)
          gl.uniform4fv(gl.getUniformLocation(p, 'skinningJoints'), node.presentation._worldTransform.float32Array3x4f())
        }
        const materialIndex = gl.getUniformBlockIndex(p, 'materialUniform')
        gl.uniformBlockBinding(p, materialIndex, _materialLoc)
        gl.bindBufferBase(gl.UNIFORM_BUFFER, _materialLoc, geometry._materialBuffer)

        material._callBindingHandlerForNodeProgramContextRenderer(node, p, gl, this) 
      }else{
        this._switchProgram(scnProgram)

        geometry._callBindingHandlerForNodeProgramContextRenderer(node, glProgram, gl, this) 
      }
      const vao = geometry._vertexArrayObjects[i]
      const element = geometry.geometryElements[i]

      gl.bindVertexArray(vao)
      // FIXME: use bufferData instead of bindBufferBase
      gl.bindBufferBase(gl.UNIFORM_BUFFER, _materialLoc, geometry._materialBuffer)

      geometry._bufferMaterialData(gl, p, i, node.presentation._worldOpacity)

      let shape = null
      switch(element.primitiveType){
        case SCNGeometryPrimitiveType.triangles:
          shape = gl.TRIANGLES
          break
        case SCNGeometryPrimitiveType.triangleStrip:
          shape = gl.TRIANGLE_STRIP
          break
        case SCNGeometryPrimitiveType.line:
          shape = gl.LINES
          break
        case SCNGeometryPrimitiveType.point:
          shape = gl.POINTS
          break
        case SCNGeometryPrimitiveType.polygon:
          shape = gl.TRIANGLE_FAN
          break
        default:
          throw new Error(`unsupported primitiveType: ${element.primitiveType}`)
      }

      let size = null
      switch(element.bytesPerIndex){
        case 1:
          size = gl.UNSIGNED_BYTE
          break
        case 2:
          size = gl.UNSIGNED_SHORT
          break
        case 4:
          size = gl.UNSIGNED_INT
          break
        default:
          throw new Error(`unsupported index size: ${element.bytesPerIndex}`)
      }

      gl.drawElements(shape, element._glData.length, size, 0)
    }
  }

  /**
   *
   * @access private
   * @param {SCNNode} node -
   * @returns {void}
   */
  _renderParticle(node) {
    if(node.presentation.isHidden){
      return
    }

    //const systems = node.presentation.particleSystems
    const systems = node.particleSystems
    systems.forEach((system) => {
      this._renderParticleSystem(system, node)
    })
  }

  /**
   *
   * @access private
   * @param {SCNParticleSystem} system - 
   * @param {?SCNNode} [node = null] -
   * @returns {void}
   */
  _renderParticleSystem(system, node = null) {
    //this.currentTime
    const gl = this.context
    //let program = this._defaultParticleProgram._glProgram
    //if(system._program !== null){
    //  program = system._program._glProgram
    //}
    let p = this._defaultParticleProgram
    if(system._program !== null){
      p = system._program
    }
    const glProgram = p._getGLProgramForContext(gl)
    this._useProgram(p)
    //this._switchProgram(p)
    gl.disable(gl.CULL_FACE)

    if(system._vertexBuffer === null){
      system._initializeVAO(gl, glProgram)
    }
    gl.bindVertexArray(system._vertexArray)

    system._bufferMaterialData(gl, glProgram)
    if(node){
      gl.uniformMatrix4fv(gl.getUniformLocation(glProgram, 'modelTransform'), false, node._worldTransform.float32Array())
    }else{
      let m = SCNMatrix4MakeTranslation(0, 0, 0)
      gl.uniformMatrix4fv(gl.getUniformLocation(glProgram, 'modelTransform'), false, m.float32Array())
    }

    gl.drawElements(gl.TRIANGLES, system._particles.length * 6, system._glIndexSize, 0)
  }

  /**
   *
   * @access private
   * @param {SCNNode} node -
   * @param {number} objectID -
   * @param {Map} options -
   * @returns {void}
   */
  _renderNodeForHitTest(node, objectID, options) {
    const gl = this.context
    const geometry = node.presentation.geometry
    const glProgram = this._defaultHitTestProgram._getGLProgramForContext(gl)

    const geometryCount = geometry.geometryElements.length
    if(geometryCount === 0){
      // nothing to draw...
      return
    }
    if(geometry._vertexArrayObjects === null){
      // geometry is not ready
      return
    }
    if(geometry._hitTestVAO === null){
      this._initializeHitTestVAO(node, glProgram)
    }

    gl.uniform1i(gl.getUniformLocation(glProgram, 'objectID'), objectID)

    if(node.presentation.skinner !== null && node.presentation.skinner._useGPU){
      if(node.presentation.skinner._useGPU){
        gl.uniform1i(gl.getUniformLocation(glProgram, 'numSkinningJoints'), node.presentation.skinner.numSkinningJoints)
        gl.uniform4fv(gl.getUniformLocation(glProgram, 'skinningJoints'), node.presentation.skinner.float32Array())
      }else{
        gl.uniform1i(gl.getUniformLocation(glProgram, 'numSkinningJoints'), 0)
        gl.uniform4fv(gl.getUniformLocation(glProgram, 'skinningJoints'), SCNMatrix4MakeTranslation(0, 0, 0).float32Array3x4f())
      }
    }else{
      gl.uniform1i(gl.getUniformLocation(glProgram, 'numSkinningJoints'), 0)
      gl.uniform4fv(gl.getUniformLocation(glProgram, 'skinningJoints'), node.presentation._worldTransform.float32Array3x4f())
    }

    for(let i=0; i<geometryCount; i++){
      const vao = geometry._hitTestVAO[i]
      const element = geometry.geometryElements[i]

      gl.bindVertexArray(vao)
      gl.uniform1i(gl.getUniformLocation(glProgram, 'geometryID'), i)

      let shape = null
      switch(element.primitiveType){
        case SCNGeometryPrimitiveType.triangles:
          shape = gl.TRIANGLES
          break
        case SCNGeometryPrimitiveType.triangleStrip:
          shape = gl.TRIANGLE_STRIP
          break
        case SCNGeometryPrimitiveType.line:
          shape = gl.LINES
          break
        case SCNGeometryPrimitiveType.point:
          shape = gl.POINTS
          break
        case SCNGeometryPrimitiveType.polygon:
          shape = gl.TRIANGLE_FAN
          break
        default:
          throw new Error(`unsupported primitiveType: ${element.primitiveType}`)
      }

      let size = null
      switch(element.bytesPerIndex){
        case 1:
          size = gl.UNSIGNED_BYTE
          break
        case 2:
          size = gl.UNSIGNED_SHORT
          break
        case 4:
          size = gl.UNSIGNED_INT
          break
        default:
          throw new Error(`unsupported index size: ${element.bytesPerIndex}`)
      }

      //console.log(`hitTest drawElements: length: ${element._glData.length}`)
      gl.drawElements(shape, element._glData.length, size, 0)
    }
  }

  /**
   *
   * @access private
   * @param {SCNNode} node -
   * @param {number} objectID -
   * @param {Map} options -
   * @returns {void}
   */
  _renderPhysicsNodeForHitTest(node, objectID, options) {
    const gl = this.context
    const p = node.presentation
    const body = p.physicsBody
    const geometry = body.physicsShape._sourceGeometry
    const geometryCount = geometry.geometryElements.length
    if(geometryCount === 0){
      // nothing to draw...
      return
    }
    const glProgram = this._defaultHitTestProgram._getGLProgramForContext(gl)

    if(geometry._vertexBuffer === null){
      // should I copy the geometry?
      geometry._createVertexBuffer(gl, node, false, geometry)
    }
    if(geometry._hitTestVAO === null){
      this._initializeHitTestVAO(node, glProgram, true)
    }

    gl.uniform1i(gl.getUniformLocation(glProgram, 'objectID'), objectID)

    if(node.presentation.skinner !== null && node.presentation.skinner._useGPU){
      if(node.presentation.skinner._useGPU){
        gl.uniform1i(gl.getUniformLocation(glProgram, 'numSkinningJoints'), node.presentation.skinner.numSkinningJoints)
        gl.uniform4fv(gl.getUniformLocation(glProgram, 'skinningJoints'), node.presentation.skinner.float32Array())
      }else{
        gl.uniform1i(gl.getUniformLocation(glProgram, 'numSkinningJoints'), 0)
        gl.uniform4fv(gl.getUniformLocation(glProgram, 'skinningJoints'), SCNMatrix4MakeTranslation(0, 0, 0).float32Array3x4f())
      }
    }else{
      gl.uniform1i(gl.getUniformLocation(glProgram, 'numSkinningJoints'), 0)
      gl.uniform4fv(gl.getUniformLocation(glProgram, 'skinningJoints'), node.presentation._worldTransform.float32Array3x4f())
    }

    for(let i=0; i<geometryCount; i++){
      const vao = geometry._hitTestVAO[i]
      const element = geometry.geometryElements[i]

      gl.bindVertexArray(vao)
      gl.uniform1i(gl.getUniformLocation(glProgram, 'geometryID'), i)

      let shape = null
      switch(element.primitiveType){
        case SCNGeometryPrimitiveType.triangles:
          shape = gl.TRIANGLES
          break
        case SCNGeometryPrimitiveType.triangleStrip:
          shape = gl.TRIANGLE_STRIP
          break
        case SCNGeometryPrimitiveType.line:
          shape = gl.LINES
          break
        case SCNGeometryPrimitiveType.point:
          shape = gl.POINTS
          break
        case SCNGeometryPrimitiveType.polygon:
          shape = gl.TRIANGLE_FAN
          break
        default:
          throw new Error(`unsupported primitiveType: ${element.primitiveType}`)
      }

      let size = null
      switch(element.bytesPerIndex){
        case 1:
          size = gl.UNSIGNED_BYTE
          break
        case 2:
          size = gl.UNSIGNED_SHORT
          break
        case 4:
          size = gl.UNSIGNED_INT
          break
        default:
          throw new Error(`unsupported index size: ${element.bytesPerIndex}`)
      }

      gl.drawElements(shape, element._glData.length, size, 0)
    }
  }

  /**
   *
   * @access private
   * @returns {SKNode[]} -
   */
  _createSKNodeArray() {
    if(this.overlaySKScene === null){
      return []
    }

    const arr = [this.overlaySKScene]
    const targetNodes = []
    while(arr.length > 0){
      const node = arr.shift()
      targetNodes.push(node)
      arr.push(...node.children)
    }
    //targetNodes.sort((a, b) => { return a.renderingOrder - b.renderingOrder })

    return targetNodes
  }

  /**
   *
   * @access private
   * @param {SKNode} node -
   * @returns {void}
   */
  _renderSKNode(node) {
    node._render(this.context, this._viewRect)
  }

  /**
   * Renders the scene’s contents at the specified system time in the renderer’s OpenGL context.
   * @access public
   * @param {number} time - The timestamp, in seconds, at which to render the scene.
   * @returns {void}
   * @desc This method can be used only with an SCNRenderer object created with the SCNRenderer initializer. Call this method to tell SceneKit to draw the renderer’s scene into the OpenGL context you created the renderer with.When you call this method, SceneKit updates its hierarchy of presentation nodes based on the specified timestamp, and then draws the scene.NoteBy default, the playback timing of actions and animations in a scene is based on the system time, not the scene time. Before using this method to control the playback of animations, set the usesSceneTimeBase property of each animation to true, or specify the playUsingSceneTimeBase option when loading a scene file that contains animations.
   * @see https://developer.apple.com/documentation/scenekit/scnrenderer/1518402-render
   */
  renderAtTime(time) {
  }

  // Capturing a Snapshot

  /**
   * Creates an image by drawing the renderer’s content at the specified system time.
   * @access public
   * @param {number} time - The timestamp, in seconds, at which to render the scene.
   * @param {CGSize} size - The size, in pixels, of the image to create.
   * @param {SCNAntialiasingMode} antialiasingMode - The antialiasing mode to use for the image output.
   * @returns {Image} - 
   * @desc When you call this method, SceneKit updates its hierarchy of presentation nodes based on the specified timestamp, and then draws the scene into a new image object of the specified size.
   * @see https://developer.apple.com/documentation/scenekit/scnrenderer/1641767-snapshot
   */
  snapshotAtTimeWith(time, size, antialiasingMode) {
    return null
  }

  // Instance Methods

  /**
   * 
   * @access public
   * @param {SCNNode[]} lightProbes - 
   * @param {number} time - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/scenekit/scnrenderer/2097153-updateprobes
   */
  updateProbesAtTime(lightProbes, time) {
  }

  //////////////////////
  // SCNSceneRenderer //
  //////////////////////

  // Presenting a Scene

  /**
   * Required. Displays the specified scene with an animated transition.
   * @access public
   * @param {SCNScene} scene - The new scene to be displayed.
   * @param {SKTransition} transition - An object that specifies the duration and style of the animated transition.
   * @param {?SCNNode} pointOfView - The node to use as the pointOfView property when displaying the new scene.
   * @param {?function(): void} [completionHandler = null] - A block that SceneKit calls after the transition animation has completed.This block takes no parameters and has no return value.
   * @returns {void}
   * @desc Use this method to change the scene displayed in a SceneKit view (or other renderer) with an animated transition. For details on transition styles, see SKTransition.
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1523028-present
   */
  presentWithIncomingPointOfView(scene, transition, pointOfView, completionHandler = null) {
  }

  // Managing Scene Display

  /**
   * Required. The node from which the scene’s contents are viewed for rendering.
   * @type {?SCNNode}
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1523982-pointofview
   */
  get pointOfView() {
    return this._getCameraNode()
  }

  /**
   * Required. The node from which the scene’s contents are viewed for rendering.
   * @type {?SCNNode}
   * @param {?SCNNode} newValue -
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1523982-pointofview
   */
  set pointOfView(newValue) {
    this._pointOfView = newValue
  }

  /**
   * Required. The graphics technology SceneKit uses to render the scene.
   * @type {SCNRenderingAPI}
   * @desc You choose a graphics technology when initializing a scene renderer:When initializing a SCNView object, use the init(frame:options:) initializer and the preferredRenderingAPI key. Alternatively, create a view in Interface Builder and use the Rendering API control in the inspector. During initialization, the view will attempt to use the preferred API, but will fall back to a different API if the preferred one is not supported on the current hardware.To create a SCNRenderer object that renders into your own OpenGL contect, use the init(context:options:) initializer. To create a renderer for use in your own Metal workflow, use the init(device:options:) initializer.The rendering technology used by a SCNLayer object is determined by Core Animation.After initializing a renderer, this property reflects the rendering technology in use.
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1522616-renderingapi
   */
  get renderingAPI() {
    return this._renderingAPI
  }

  // Preloading Renderer Resources

  /**
   * Required. Prepares a SceneKit object for rendering.
   * @access public
   * @param {Object} object - An SCNScene, SCNNode, SCNGeometry, or SCNMaterial instance.
   * @param {?function(): boolean} [block = null] - A block that SceneKit calls periodically while preparing the object. The block takes no parameters.Your block should return false to tell SceneKit to continue preparing the object, or true to cancel preparation.Pass nil for this parameter if you do not need an opportunity to cancel preparing the object.
   * @returns {boolean} - 
   * @desc By default, SceneKit lazily loads resources onto the GPU for rendering. This approach uses memory and GPU bandwidth efficiently, but can lead to stutters in an otherwise smooth frame rate when you add large amounts of new content to an animated scene. To avoid such issues, use this method to prepare content for drawing before adding it to the scene. You can call this method on a secondary thread to prepare content asynchronously. SceneKit prepares all content associated with the object parameter you provide. If you provide an SCNMaterial object, SceneKit loads any texture images assigned to its material properties. If you provide an SCNGeometry object, SceneKit loads all materials attached to the geometry, as well as its vertex data. If you provide an SCNNode or SCNScene object, SceneKit loads all geometries and materials associated with the node and all its child nodes, or with the entire node hierarchy of the scene.You can use the block parameter to cancel preparation if content is no longer needed. For example, in a game you might use this method to preload areas of the game world the player is soon to enter, but if the player character dies before entering those areas, you can return true from the block to cancel preloading.You can observe the progress of this operation with the Progress class. For details, see Progress.
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1522798-prepare
   */
  prepareShouldAbortBlock(object, block = null) {
    return false
  }

  /**
   * Required. Prepares the specified SceneKit objects for rendering, using a background thread.
   * @access public
   * @param {Object[]} objects - An array of containing one or more SCNScene, SCNNode, SCNGeometry, or SCNMaterial instances.
   * @param {?function(arg1: boolean): void} [completionHandler = null] - A block that SceneKit calls when object preparation fails or completes.The block takes the following parameter:successtrue if all content was successfully prepared for rendering; otherwise, false.
   * @returns {void}
   * @desc By default, SceneKit lazily loads resources onto the GPU for rendering. This approach uses memory and GPU bandwidth efficiently, but can lead to stutters in an otherwise smooth frame rate when you add large amounts of new content to an animated scene. To avoid such issues, use this method to prepare content for drawing before adding it to the scene. SceneKit uses a secondary thread to prepare content asynchronously.SceneKit prepares all content associated with the objects you provide. If you provide an SCNMaterial object, SceneKit loads any texture images assigned to its material properties. If you provide an SCNGeometry object, SceneKit loads all materials attached to the geometry, as well as its vertex data. If you provide an SCNNode or SCNScene object, SceneKit loads all geometries and materials associated with the node and all its child nodes, or with the entire node hierarchy of the scene.You can observe the progress of this operation with the Progress class. For details, see Progress.
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1523375-prepare
   */
  prepare(objects, completionHandler = null) {
  }

  // Working With Projected Scene Contents

  /**
   * Required. Searches the renderer’s scene for objects corresponding to a point in the rendered image.
   * @access public
   * @param {CGPoint} point - 
   * @param {?Map<SCNHitTestOption, Object>} [options = null] - A dictionary of options affecting the search. See Hit Testing Options Keys for acceptable values.
   * @returns {SCNHitTestResult[]} - 
   * @desc A 2D point in the rendered screen coordinate space can refer to any point along a line segment in the 3D scene coordinate space. Hit-testing is the process of finding elements of a scene located along this line segment. For example, you can use this method to find the geometry corresponding to a click event in a SceneKit view.
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1522929-hittest
   */
  hitTest(point, options = null) {
    if(this.scene === null){
      return []
    }
    let _options = new Map()
    if(options instanceof Map){
      _options = options
    }else if(Array.isArray(options)){
      _options = new Map(options)
    }

    const cameraNode = this._getCameraNode()
    cameraNode.camera._updateProjectionTransform(this._viewRect)
    const from = new SCNVector3(point.x, point.y, 0)
    const to = new SCNVector3(point.x, point.y, 1.0)

    const useGPU = true
    if(!useGPU){
      return this._hitTestByCPU(cameraNode.viewProjectionTransform, from, to, _options)
    }
    return this._hitTestByGPU(cameraNode.viewProjectionTransform, from, to, _options)
  }

  _initializeHitFrameBuffer() {
    const gl = this.context
    const width = this._viewRect.size.width
    const height = this._viewRect.size.height
    this._hitFrameBuffer = gl.createFramebuffer()
    this._hitDepthBuffer = gl.createRenderbuffer()
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._hitFrameBuffer)
    gl.bindRenderbuffer(gl.RENDERBUFFER, this._hitDepthBuffer)
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height)

    this._hitObjectIDTexture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, this._hitObjectIDTexture)
    // texImage2D(target, level, internalformat, width, height, border, format, type, source)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)

    this._hitFaceIDTexture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, this._hitFaceIDTexture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)

    this._hitPositionTexture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, this._hitPositionTexture)
    //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB, gl.UNSIGNED_BYTE, null)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)

    this._hitNormalTexture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, this._hitNormalTexture)
    //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB, gl.UNSIGNED_BYTE, null)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)

    //gl.framebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer)
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._hitDepthBuffer)
    //gl.framebufferTexture2D(target, attachment, textarget, texture, level)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._hitObjectIDTexture, 0)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT1, gl.TEXTURE_2D, this._hitFaceIDTexture, 0)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT2, gl.TEXTURE_2D, this._hitPositionTexture, 0)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT3, gl.TEXTURE_2D, this._hitNormalTexture, 0)
    gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1, gl.COLOR_ATTACHMENT2, gl.COLOR_ATTACHMENT3])

    gl.bindRenderbuffer(gl.RENDERBUFFER, null)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  }

  /**
   * @access private
   * @param {SCNMatrix4} viewProjectionMatrix -
   * @param {SCNVector3} from -
   * @param {SCNVector3} to -
   * @param {Object} options -
   * @returns {SCNHitTestResult[]} -
   */
  _hitTestByCPU(viewProjectionMatrix, from, to, options) {
    const result = []

    const invVp = viewProjectionMatrix.invert()
    const rayFrom = from.transform(invVp)
    const rayTo = to.transform(invVp)
    //console.log(`rayFrom: ${rayFrom.float32Array()}`)
    //console.log(`rayTo  : ${rayTo.float32Array()}`)

    const rayVec = rayTo.sub(rayFrom)
    const renderingArray = this._createRenderingNodeArray()
    //console.log(`renderingArray.length: ${renderingArray.length}`)

    let categoryBitMask = options.get(SCNHitTestOption.categoryBitMask)
    if(typeof categoryBitMask === 'undefined'){
      categoryBitMask = -1
    }

    for(const node of renderingArray){
      if(node.categoryBitMask & categoryBitMask){
        result.push(...this._nodeHitTestByCPU(node, rayFrom, rayVec))
      }
    }

    return result
  }

  /**
   * @access private
   * @param {SCNMatrix4} viewProjectionTransform -
   * @param {SCNVector3} from -
   * @param {SCNVector3} to -
   * @param {Map} options -
   * @returns {SCNHitTestResult[]} -
   */
  _hitTestByGPU(viewProjectionTransform, from, to, options) {
    const result = []
    const gl = this._context

    if(this._hitFrameBuffer === null){
      this._initializeHitFrameBuffer()
    }
    const prg = this._defaultHitTestProgram
    const hitTestProgram = prg._glProgram
    this._useProgram(prg)
    //gl.useProgram(hitTestProgram)
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._hitFrameBuffer)

    gl.depthMask(true)
    gl.depthFunc(gl.LEQUAL)
    gl.enable(gl.SCISSOR_TEST)
    gl.disable(gl.BLEND)
    gl.clearColor(0, 0, 0, 0)
    gl.clearDepth(1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    const x = (from.x + 1.0) * 0.5 * this._viewRect.size.width
    const y = (from.y + 1.0) * 0.5 * this._viewRect.size.height
    let sx = x - 1
    let sy = y - 1
    if(sx < 0){
      sx = 0
    }else if(sx + 3 > this._viewRect.size.width){
      sx = this._viewRect.size.width - 3
    }
    if(sy < 0){
      sy = 0
    }else if(sy + 3 > this._viewRect.size.height){
      sy = this._viewRect.size.width - 3
    }

    gl.scissor(sx, sy, 3, 3)
    gl.uniformMatrix4fv(gl.getUniformLocation(hitTestProgram, 'viewProjectionTransform'), false, viewProjectionTransform.float32Array())
    let backFaceCulling = options.get(SCNHitTestOption.backFaceCulling)
    if(typeof backFaceCulling === 'undefined'){
      backFaceCulling = true
    }
    if(backFaceCulling){
      gl.enable(gl.CULL_FACE)
      gl.cullFace(gl.BACK)
    }else{
      gl.disable(gl.CULL_FACE)
    }

    let categoryBitMask = options.get(SCNHitTestOption.categoryBitMask)
    if(typeof categoryBitMask === 'undefined'){
      categoryBitMask = -1
    }
    let ignoreHiddenNodes = options.get(SCNHitTestOption.ignoreHiddenNodes)
    if(typeof ignoreHiddenNodes === 'undefined'){
      ignoreHiddenNodes = true
    }

    const renderingArray = this._createRenderingNodeArray()
    const len = renderingArray.length
    for(let i=0; i<len; i++){
      const node = renderingArray[i]
      if((node.categoryBitMask & categoryBitMask) === 0){
        continue
      }
      if(ignoreHiddenNodes && node.isHidden){
        continue
      }
      this._renderNodeForHitTest(node, i + 100, options)
    }

    const objectIDBuf = new Uint8Array(4)
    gl.readBuffer(gl.COLOR_ATTACHMENT0)
    gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, objectIDBuf, 0)
    const objectID = objectIDBuf[0] * 256 + objectIDBuf[1]
    const geometryIndex = objectIDBuf[2] * 256 + objectIDBuf[3]

    const faceIDBuf = new Uint8Array(4)
    gl.readBuffer(gl.COLOR_ATTACHMENT1)
    gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, faceIDBuf, 0)
    const faceIndex = faceIDBuf[0] * 16777216 + faceIDBuf[1] * 65536 + faceIDBuf[2] * 256 + faceIDBuf[3]

    const positionBuf = new Uint8Array(4)
    gl.readBuffer(gl.COLOR_ATTACHMENT2)
    gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, positionBuf, 0)
    //const screenPos = new SCNVector3(positionBuf[0] / 127.5 - 1.0, positionBuf[1] / 127.5 - 1.0, positionBuf[2] / 127.5 - 1.0)
    //const position = screenPos.transform(viewProjectionTransform.invert())
    const p = (((positionBuf[3] / 255.0 + positionBuf[2]) / 255.0 + positionBuf[1] / 255.0) + positionBuf[0]) / 255.0
    const position = from.lerp(to, p)

    const normalBuf = new Uint8Array(4)
    gl.readBuffer(gl.COLOR_ATTACHMENT3)
    gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, normalBuf, 0)
    const normal = new SCNVector3(normalBuf[0] / 127.5 - 1.0, normalBuf[1] / 127.5 - 1.0, normalBuf[2] / 127.5 - 1.0)

    //console.log('***** Hit Result *****')
    //console.log(`objectID: ${objectID}`)
    //console.log(`geometryIndex: ${geometryIndex}`)
    //console.log(`faceIndex: ${faceIndex}`)
    //console.log(`position: ${position.floatArray()}`)
    //console.log(`normal: ${normal.floatArray()}`)
    //console.log('**********************')

    if(objectID >= 100){
      const r = new SCNHitTestResult()
      const node = renderingArray[objectID - 100]
      const worldInv = node.presentation._worldTransform.invert()
      r._node = node
      r._geometryIndex = geometryIndex
      r._faceIndex = faceIndex
      r._worldCoordinates = position
      r._worldNormal = normal
      r._modelTransform = node.presentation._worldTransform
      r._localCoordinates = position.transform(worldInv)
      r._localNormal = normal.transform(worldInv)

      result.push(r)
    }

    gl.disable(gl.SCISSOR_TEST)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)

    return result
  }

  /**
   * @access private
   * @param {SCNVector3} from -
   * @param {SCNVector3} to -
   * @param {Map} options -
   * @param {Object} _options -
   * @returns {SCNHitTestResult[]} -
   */
  _physicsHitTestByGPU(from, to, options, _options) {
    const result = []
    const gl = this._context

    const viewProjectionTransform = this._createViewProjectionTransformForRay(from, to)
    const _from = from.transform(viewProjectionTransform)
    const _to = to.transform(viewProjectionTransform)

    if(this._hitFrameBuffer === null){
      this._initializeHitFrameBuffer()
    }
    const prg = this._defaultHitTestProgram
    const hitTestProgram = prg._glProgram
    //gl.useProgram(hitTestProgram)
    this._useProgram(prg)
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._hitFrameBuffer)

    gl.depthMask(true)
    gl.depthFunc(gl.LEQUAL)
    gl.enable(gl.SCISSOR_TEST)
    gl.disable(gl.BLEND)
    gl.clearColor(0, 0, 0, 0)
    gl.clearDepth(1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    // screen position
    const x = (_from.x + 1.0) * 0.5 * this._viewRect.size.width
    const y = (_from.y + 1.0) * 0.5 * this._viewRect.size.height
    // left top of the scissor area
    const areaSize = 3
    let sx = x - 1
    let sy = y - 1
    if(sx < 0){
      sx = 0
    }else if(sx + areaSize > this._viewRect.size.width){
      sx = this._viewRect.size.width - areaSize
    }
    if(sy < 0){
      sy = 0
    }else if(sy + areaSize > this._viewRect.size.height){
      sy = this._viewRect.size.width - areaSize
    }

    gl.scissor(sx, sy, areaSize, areaSize)
    gl.uniformMatrix4fv(gl.getUniformLocation(hitTestProgram, 'viewProjectionTransform'), false, viewProjectionTransform.float32Array())
    let backFaceCulling = options.get(SCNPhysicsWorld.TestOption.backfaceCulling)
    if(typeof backFaceCulling === 'undefined'){
      backFaceCulling = true
    }
    if(backFaceCulling){
      gl.enable(gl.CULL_FACE)
      gl.cullFace(gl.BACK)
    }else{
      gl.disable(gl.CULL_FACE)
    }

    let collisionBitMask = options.get(SCNPhysicsWorld.TestOption.collisionBitMask)
    if(typeof collisionBitMask === 'undefined'){
      collisionBitMask = -1
    }

    let searchMode = options.get(SCNPhysicsWorld.TestOption.searchMode)
    if(typeof searchMode === 'undefined'){
      searchMode = SCNPhysicsWorld.TestSearchMode.closest
    }

    let renderingArray = null
    if(_options && _options.targets){
      renderingArray = _options.targets
      collisionBitMask = -1
    }else{
      renderingArray = this._createRenderingPhysicsNodeArray()
    }

    const len = renderingArray.length
    for(let i=0; i<len; i++){
      const node = renderingArray[i]
      const body = node.physicsBody
      if((body.categoryBitMask & collisionBitMask) === 0){
        continue
      }
      this._renderPhysicsNodeForHitTest(node, i + 100, options)
    }

    const objectIDBuf = new Uint8Array(4)
    gl.readBuffer(gl.COLOR_ATTACHMENT0)
    gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, objectIDBuf, 0)
    const objectID = objectIDBuf[0] * 256 + objectIDBuf[1]
    const geometryIndex = objectIDBuf[2] * 256 + objectIDBuf[3]

    const faceIDBuf = new Uint8Array(4)
    gl.readBuffer(gl.COLOR_ATTACHMENT1)
    gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, faceIDBuf, 0)
    const faceIndex = faceIDBuf[0] * 16777216 + faceIDBuf[1] * 65536 + faceIDBuf[2] * 256 + faceIDBuf[3]

    const positionBuf = new Uint8Array(4)
    gl.readBuffer(gl.COLOR_ATTACHMENT2)
    gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, positionBuf, 0)
    //const screenPos = new SCNVector3(positionBuf[0] / 127.5 - 1.0, positionBuf[1] / 127.5 - 1.0, positionBuf[2] / 127.5 - 1.0)
    //const position = screenPos.transform(viewProjectionTransform.invert())
    const p = (((positionBuf[3] / 255.0 + positionBuf[2]) / 255.0 + positionBuf[1] / 255.0) + positionBuf[0]) / 255.0
    const screenPos = _from.lerp(_to, p)
    const position = screenPos.transform(viewProjectionTransform.invert())

    const normalBuf = new Uint8Array(4)
    gl.readBuffer(gl.COLOR_ATTACHMENT3)
    gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, normalBuf, 0)
    const normal = new SCNVector3(normalBuf[0] / 127.5 - 1.0, normalBuf[1] / 127.5 - 1.0, normalBuf[2] / 127.5 - 1.0)

    //console.log('***** Hit Result *****')
    //console.log(`objectID: ${objectID}`)
    //console.log(`geometryIndex: ${geometryIndex}`)
    //console.log(`faceIndex: ${faceIndex}`)
    //console.log(`from: ${from.floatArray()}`)
    //console.log(`to: ${to.floatArray()}`)
    //console.log(`positionBuf: ${positionBuf[0]}, ${positionBuf[1]}, ${positionBuf[2]}`)
    //console.log(`sPos: ${screenPos.floatArray()}`)
    //console.log(`position: ${position.floatArray()}`)
    //console.log(`normal: ${normal.floatArray()}`)
    //console.log('**********************')

    if(objectID >= 100){
      const r = new SCNHitTestResult()
      const node = renderingArray[objectID - 100]
      const worldInv = node.presentation._worldTransform.invert()
      r._node = node
      r._geometryIndex = geometryIndex
      r._faceIndex = faceIndex
      r._worldCoordinates = position
      r._worldNormal = normal
      r._modelTransform = node.presentation._worldTransform
      r._localCoordinates = position.transform(worldInv)
      r._localNormal = normal.transform(worldInv)

      result.push(r)
    }

    gl.disable(gl.SCISSOR_TEST)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)

    return result
  }

  /**
   *
   * @access private
   * @param {SCNVector3} from -
   * @param {SCNVector3} to -
   * @returns {SCNMatrix4} -
   */
  _createViewProjectionTransformForRay(from, to) {
    const vec = to.sub(from)
    const len = vec.length()
    const zNear = 1
    const zFar = zNear + len
    const proj = new SCNMatrix4()
    proj.m11 = 1
    proj.m22 = 1
    proj.m33 = -(zFar + zNear) / len
    proj.m34 = -1
    proj.m43 = -2 * zFar * zNear / len
    // TODO: use an orthographic projection
    //proj.m33 = -2 / len
    //proj.m43 = -(zFar + zNear) / len
    //proj.m44 = 1

    const view = new SCNMatrix4()
    const up = new SCNVector3(0, 1, 0)
    if(vec.x === 0 && vec.z === 0){
      up.y = 0
      up.z = 1
    }
    const f = vec.normalize()
    const s = f.cross(up).normalize()
    const u = s.cross(f).normalize()
    view.m11 = s.x
    view.m21 = s.y
    view.m31 = s.z
    view.m12 = u.x
    view.m22 = u.y
    view.m32 = u.z
    view.m13 = -f.x
    view.m23 = -f.y
    view.m33 = -f.z
    view.m44 = 1
    const eye = from.sub(f.mul(zNear))
    const t = eye.transform(view)
    view.m41 = -t.x
    view.m42 = -t.y
    view.m43 = -t.z

    return view.mult(proj)
  }

  /**
   * Required. Returns a Boolean value indicating whether a node might be visible from a specified point of view.
   * @access public
   * @param {SCNNode} node - The node whose visibility is to be tested.
   * @param {SCNNode} pointOfView - A node defining a point of view, as used by the pointOfView property.
   * @returns {boolean} - 
   * @desc Any node containing a camera or spotlight may serve as a point of view (see the pointOfView property for details). Such a node defines a viewing frustum—a portion of the scene’s coordinate space, shaped like a truncated pyramid, that encloses all points visible from that point of view.Use this method to test whether a node lies within the viewing frustum defined by another node (which may or may not be the scene renderer’s current pointOfView node). For example, in a game scene containing multiple camera nodes, you could use this method to determine which camera is currently best for viewing a moving player character.Note that this method does not perform occlusion testing. That is, it returns true if the tested node lies within the specified viewing frustum regardless of whether that node’s contents are obscured by other geometry.
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1522647-isnode
   */
  isNodeInsideFrustumOf(node, pointOfView) {
    return false
  }

  /**
   * Required. Returns all nodes that might be visible from a specified point of view.
   * @access public
   * @param {SCNNode} pointOfView - A node defining a point of view, as used by the pointOfView property.
   * @returns {SCNNode[]} - 
   * @desc Any node containing a camera or spotlight may serve as a point of view (see the pointOfView property for details). Such a node defines a viewing frustum—a portion of the scene’s coordinate space, shaped like a truncated pyramid, that encloses all points visible from that point of view.Use this method find all nodes whose content lies within the viewing frustum defined by another node (which may or may not be the scene renderer’s current pointOfView node).Note that this method does not perform occlusion testing. That is, the returned array includes any node that lies within the specified viewing frustum regardless of whether that node’s contents are obscured by other geometry.
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1522942-nodesinsidefrustum
   */
  nodesInsideFrustumOf(pointOfView) {
    return null
  }

  /**
   * Required. Projects a point from the 3D world coordinate system of the scene to the 2D pixel coordinate system of the renderer.
   * @access public
   * @param {SCNVector3} point - A point in the world coordinate system of the renderer’s scene.
   * @returns {SCNVector3} - 
   * @desc The z-coordinate of the returned point describes the depth of the projected point relative to the near and far clipping planes of the renderer’s viewing frustum (defined by its pointOfView node). Projecting a point on the near clipping plane returns a point whose z-coordinate is 0.0; projecting a point on the far clipping plane returns a point whose z-coordinate is 1.0.
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1524089-projectpoint
   */
  projectPoint(point) {
    return null
  }

  /**
   * Required. Unprojects a point from the 2D pixel coordinate system of the renderer to the 3D world coordinate system of the scene.
   * @access public
   * @param {SCNVector3} point - A point in the screen-space (view, layer, or GPU viewport) coordinate system of the scene renderer.
   * @returns {SCNVector3} - 
   * @desc The z-coordinate of the point parameter describes the depth at which to unproject the point relative to the near and far clipping planes of the renderer’s viewing frustum (defined by its pointOfView node). Unprojecting a point whose z-coordinate is 0.0 returns a point on the near clipping plane; unprojecting a point whose z-coordinate is 1.0 returns a point on the far clipping plane.A 2D point in the rendered screen coordinate space can refer to any point along a line segment in the 3D scene coordinate space. To test for scene contents along this line—for example, to find the geometry corresponding to the location of a click event in a view—use the hitTest(_:options:) method.
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1522631-unprojectpoint
   */
  unprojectPoint(point) {
    return null
  }

  // Customizing Scene Rendering with Metal
  /**
   * Required. The Metal render command encoder in use for the current SceneKit rendering pass.
   * @type {?MTLRenderCommandEncoder}
   * @desc Use this render command encoder to encode additional rendering commands before or after SceneKit draws its own content.This property is valid only during the SceneKit rendering loop—that is, within one of the methods defined in the SCNSceneRendererDelegate protocol. Accessing this property at any other time returns nil.
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1522609-currentrendercommandencoder
   */
  get currentRenderCommandEncoder() {
    return this._currentRenderCommandEncoder
  }

  /**
   * Required. The Metal device this renderer uses for rendering.
   * @type {?MTLDevice}
   * @desc Use this property to create or look up other Metal resources that use the same device as your SceneKit renderer.NoteThis property is valid only for scene renderers whose renderingAPI value is metal. You create a SceneKit view that renders using Metal with the preferredRenderingAPI initialization option or in Interface Builder, or an SCNRenderer that uses Metal with the init(device:options:) method. For OpenGL-based scene renderers, this property’s value is always nil.
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1523935-device
   */
  get device() {
    return this._device
  }

  /**
   * Required. The Metal command queue this renderer uses for rendering.
   * @type {?MTLCommandQueue}
   * @desc Use this property to schedule additional command buffers for the Metal device to execute as part of the render cycle. For example, you can use a compute command encoder to modify the vertex data in a Metal buffer for use by a SCNGeometrySource object.NoteThis property is valid only for scene renderers whose renderingAPI value is metal. You create a SceneKit view that renders using Metal with the preferredRenderingAPI initialization option or in Interface Builder, or an SCNRenderer that uses Metal with the init(device:options:) method. For OpenGL-based scene renderers, this property’s value is always nil.
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1523974-commandqueue
   */
  get commandQueue() {
    return this._commandQueue
  }

  /**
   * Required. The Metal pixel format for the renderer’s color output.
   * @type {MTLPixelFormat}
   * @desc Use this property, along with the depthPixelFormat and stencilPixelFormat properties, if you perform custom drawing with Metal (see the SCNSceneRendererDelegate and SCNNodeRendererDelegate classes) and need to create a new MTLRenderPipelineState object to change the GPU state as part of your rendering.NoteThis property is valid only for scene renderers whose renderingAPI value is metal. You create a SceneKit view that renders using Metal with the preferredRenderingAPI initialization option or in Interface Builder, or an SCNRenderer that uses Metal with the init(device:options:) method. For OpenGL-based scene renderers, this property’s value is always nil.
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1523701-colorpixelformat
   */
  get colorPixelFormat() {
    return this._colorPixelFormat
  }

  /**
   * Required. The Metal pixel format for the renderer’s depth buffer.
   * @type {MTLPixelFormat}
   * @desc Use this property, along with the colorPixelFormat and stencilPixelFormat properties, if you perform custom drawing with Metal (see the SCNSceneRendererDelegate and SCNNodeRendererDelegate classes) and need to create a new MTLRenderPipelineState object to change the GPU state as part of your rendering.NoteThis property is valid only for scene renderers whose renderingAPI value is metal. You create a SceneKit view that renders using Metal with the preferredRenderingAPI initialization option or in Interface Builder, or an SCNRenderer that uses Metal with the init(device:options:) method. For OpenGL-based scene renderers, this property’s value is always nil.
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1523780-depthpixelformat
   */
  get depthPixelFormat() {
    return this._depthPixelFormat
  }

  /**
   * Required. The Metal pixel format for the renderer’s stencil buffer.
   * @type {MTLPixelFormat}
   * @desc Use this property, along with the depthPixelFormat and colorPixelFormat properties, if you perform custom drawing with Metal (see the SCNSceneRendererDelegate and SCNNodeRendererDelegate classes) and need to create a new MTLRenderPipelineState object to change the GPU state as part of your rendering.NoteThis property is valid only for scene renderers whose renderingAPI value is metal. You create a SceneKit view that renders using Metal with the preferredRenderingAPI initialization option or in Interface Builder, or an SCNRenderer that uses Metal with the init(device:options:) method. For OpenGL-based scene renderers, this property’s value is always nil.
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1523315-stencilpixelformat
   */
  get stencilPixelFormat() {
    return this._stencilPixelFormat
  }

  // Customizing Scene Rendering with OpenGL

  /**
   * Required. The OpenGL rendering context that SceneKit uses for rendering the scene.
   * @type {?Object}
   * @desc In macOS, the value of this property is a Core OpenGL cglContextObj object.In iOS, the value of this property is an EAGLContext object.
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1522840-context
   */
  get context() {
    return this._context
  }

  _setContext(context) {
    this._context = context
    this._createDummyTexture()
  }

  // Working With Positional Audio

  /**
   * Required. The 3D audio mixing node SceneKit uses for positional audio effects.
   * @type {AVAudioEnvironmentNode}
   * @desc SceneKit uses this audio node to spatialize sounds from SCNAudioPlayer objects attached to nodes in the scene. You can use this object in conjunction with the audioEngine property to rearrange the audio graph to add other, non-spatialized audio sources or mix in audio processing effects.
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1523582-audioenvironmentnode
   */
  get audioEnvironmentNode() {
    return this._audioEnvironmentNode
  }

  /**
   * Required. The audio engine SceneKit uses for playing scene sounds.
   * @type {AVAudioEngine}
   * @desc SceneKit uses this audio engine to play sounds from SCNAudioPlayer objects attached to nodes in the scene. You can use this object directly to add other sound sources not related to scene contents, or to add other sound processing nodes or mixing nodes to the audio engine. To identify the node SceneKit uses for spatializing scene sounds when connecting other nodes, use the audioEnvironmentNode property.
   * @see https://developer.apple.com/documentation/scenekit/scnscenerenderer/1522686-audioengine
   */
  get audioEngine() {
    return this._audioEngine
  }

  /**
   * @access private
   * @param {SCNGeometry} geometry -
   * @returns {SCNProgram} -
   */
  _getProgramForGeometry(geometry) {
    if(geometry.program !== null && geometry.program._programCompiled){
      return geometry.program
    }

    if(geometry.program || geometry._shadableHelper !== null){
      this._compileProgramForObject(geometry)
    }
    for(const material of geometry.materials){
      if(material.program || material._shadableHelper !== null){
        this._compileProgramForObject(material)
      }
    }

    if(geometry.program){
      return geometry.program
    }
    return this._defaultProgram
  }

  /**
   * @access private
   * @param {SCNShadable} obj -
   * @returns {void}
   */
  _compileProgramForObject(obj) {
    const gl = this.context
    let p = obj.program
    if(!p){
      p = new SCNProgram()
      obj.program = p
    }else if(p._programCompiled){
      return p
    }
    p._parentObject = obj

    const glProgram = p._getGLProgramForContext(gl)

    const vsText = this._vertexShaderForObject(obj)
    const fsText = this._fragmentShaderForObject(obj)

    // initialize vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vsText)
    gl.compileShader(vertexShader)
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
      const info = gl.getShaderInfoLog(vertexShader)
      throw new Error(`vertex shader compile error: ${info}`)
    }
    p._glVertexShader = vertexShader

    // initialize fragment shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fsText)
    gl.compileShader(fragmentShader)
    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
      const info = gl.getShaderInfoLog(fragmentShader)
      throw new Error(`fragment shader compile error: ${info}`)
    }
    p._glFragmentShader = fragmentShader

    gl.attachShader(glProgram, vertexShader)
    gl.attachShader(glProgram, fragmentShader)

    // link program object
    gl.linkProgram(glProgram)
    if(!gl.getProgramParameter(glProgram, gl.LINK_STATUS)){
      const info = gl.getProgramInfoLog(glProgram)
      throw new Error(`program link error: ${info}`)
    }

    p._programCompiled = true

    return p
  }

  /**
   * @access private
   * @param {SCNProgram} program -
   * @returns {void}
   */
  _useProgram(program) {
    if(this._currentProgram === program){
      return
    }
    const gl = this.context
    const glProgram = program._getGLProgramForContext(gl)
    gl.useProgram(glProgram)
    program._setDummyTextureForContext(gl)
    this._currentProgram = program
  }

  /**
   * @access private
   * @param {SCNProgram} program -
   * @returns {void}
   */
  _switchProgram(program) {
    if(this._currentProgram === program){
      return
    }

    const gl = this.context
    const glProgram = program._getGLProgramForContext(gl)
    gl.useProgram(glProgram)

    // set dummy textures
    program._setDummyTextureForContext(gl)

    // set shadow textures
    const lights = this._lightNodes
    for(let i=0; i<lights.directionalShadow.length; i++){
      const node = lights.directionalShadow[i]
      const symbol = `TEXTURE${i+8}`
      gl.activeTexture(gl[symbol])
      gl.bindTexture(gl.TEXTURE_2D, node.presentation.light._shadowDepthTexture)
    }

    // bind buffers
    const cameraIndex = gl.getUniformBlockIndex(glProgram, 'cameraUniform')
    gl.uniformBlockBinding(glProgram, cameraIndex, _cameraLoc)
    gl.bindBufferBase(gl.UNIFORM_BUFFER, _cameraLoc, this._cameraBuffer)
    const fogIndex = gl.getUniformBlockIndex(glProgram, 'fogUniform')
    gl.uniformBlockBinding(glProgram, fogIndex, _fogLoc)
    gl.bindBufferBase(gl.UNIFORM_BUFFER, _fogLoc, this._fogBuffer)
    const lightIndex = gl.getUniformBlockIndex(glProgram, 'lightUniform')
    gl.uniformBlockBinding(glProgram, lightIndex, _lightLoc)
    gl.bindBufferBase(gl.UNIFORM_BUFFER, _lightLoc, this._lightBuffer)

    // set uniform variables
    const uniformTime = gl.getUniformLocation(glProgram, 'u_time')
    if(uniformTime){
      // this._time might be too large.
      const time = this._time % 100000.0
      gl.uniform1f(uniformTime, time)
    }

    const obj = program._parentObject
    if(obj){
      // bind custom uniforms
      let textureNo = 8 // TEXTURE0-7 is reserved for the default renderer
      for(const key of Object.keys(obj._valuesForUndefinedKeys)){
        const loc = gl.getUniformLocation(glProgram, key)
        if(loc !== null){
          const val = obj._valuesForUndefinedKeys[key]
          if(_InstanceOf(val, SCNMaterialProperty)){
            // TODO: refactoring: SCNGeometry has the same function
            if(val._contents instanceof Image){
              //val._contents = this._createTexture(gl, val._contents)
              const image = val._contents
              const texture = gl.createTexture()
              const canvas = document.createElement('canvas')
              canvas.width = image.naturalWidth
              canvas.height = image.naturalHeight
              canvas.getContext('2d').drawImage(image, 0, 0)
              gl.bindTexture(gl.TEXTURE_2D, texture)
              // texImage2D(target, level, internalformat, width, height, border, format, type, source)
              // Safari complains that 'source' is not ArrayBufferView type, but WebGL2 should accept HTMLCanvasElement.
              gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, image.width, image.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, canvas)
              gl.generateMipmap(gl.TEXTURE_2D)
              val._contents = texture
            }
            if(val._contents instanceof WebGLTexture){
              gl.uniform1i(loc, textureNo)
              gl.activeTexture(gl[`TEXTURE${textureNo}`])
              // TODO: check texture type
              gl.bindTexture(gl.TEXTURE_2D, val._contents)
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, val._magnificationFilterFor(gl))
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, val._minificationFilterFor(gl))
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, val._wrapSFor(gl))
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, val._wrapTFor(gl))
            }
          }
          // TODO: implement for other types

          textureNo += 1
        }
      }
    }

    this._currentProgram = program
  }

  /**
   * @access private
   * @type {SCNProgram}
   */
  get _defaultProgram() {
    const numLightsChanged = this._numLightsChanged()
    if(this.__defaultProgram !== null && !numLightsChanged){
      return this.__defaultProgram
    }

    const gl = this.context
    if(this.__defaultProgram === null){
      this.__defaultProgram = new SCNProgram()
    }
    const p = this.__defaultProgram
    const glProgram = p._getGLProgramForContext(gl)
    const vsText = this._defaultVertexShader
    const fsText = this._defaultFragmentShader

    // initialize vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vsText)
    gl.compileShader(vertexShader)
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
      const info = gl.getShaderInfoLog(vertexShader)
      throw new Error(`vertex shader compile error: ${info}`)
    }
    this.__defaultProgram._glVertexShader = vertexShader

    // initialize fragment shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fsText)
    gl.compileShader(fragmentShader)
    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
      const info = gl.getShaderInfoLog(fragmentShader)
      throw new Error(`fragment shader compile error: ${info}`)
    }
    this.__defaultProgram._glFragmentShader = fragmentShader

    gl.attachShader(glProgram, vertexShader)
    gl.attachShader(glProgram, fragmentShader)


    // link program object
    gl.linkProgram(glProgram)
    if(!gl.getProgramParameter(glProgram, gl.LINK_STATUS)){
      const info = gl.getProgramInfoLog(glProgram)
      throw new Error(`program link error: ${info}`)
    }

    this._switchProgram(p)

    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.enable(gl.CULL_FACE)
    gl.cullFace(gl.BACK)

    // set default textures to prevent warnings
    //this._setDummyTextureAsDefault(p)
    
    return this.__defaultProgram
  }

  /**
   * @access private
   * @param {SCNGeometry} geometry -
   * @returns {SCNProgram} -
   */
  _programForGeometry(geometry) {
  }

  /**
   * @access private
   * @returns {string} -
   */
  get _defaultVertexShader() {
    return this._replaceTexts(_defaultVertexShader)
  }

  /**
   * @access private
   * @param {SCNShadable} obj -
   * @returns {string} -
   */
  _vertexShaderForObject(obj) {
    let txt = obj.program.vertexShader
    if(!txt){
      txt = _defaultVertexShader
    }

    if(obj._valuesForUndefinedKeys){
      //const keys = Object.keys(obj._valuesForUndefinedKeys)
      return this._replaceTexts(txt, obj._shadableHelper, obj._valuesForUndefinedKeys)
    }
    return this._replaceTexts(txt, obj._shadableHelper)
  }

  /**
   * @access private
   * @returns {string} -
   */
  get _defaultFragmentShader() {
    return this._replaceTexts(_defaultFragmentShader)
  }

  /**
   * @access private
   * @param {SCNShadable} obj -
   * @returns {string} -
   */
  _fragmentShaderForObject(obj) {
    let txt = obj.program.fragmentShader
    if(!txt){
      txt = _defaultFragmentShader
    }

    if(obj._valuesForUndefinedKeys){
      //const keys = Object.keys(obj._valuesForUndefinedKeys)
      return this._replaceTexts(txt, obj._shadableHelper, obj._valuesForUndefinedKeys)
    }
    return this._replaceTexts(txt, obj._shadableHelper)
  }

  /**
   * @access private
   * @param {string} text -
   * @param {?SCNShadableHelper} [shadableHelper = null] -
   * @param {?Object} customProperties -
   * @returns {string} -
   */
  _replaceTexts(text, shadableHelper = null, customProperties = {}) {
    const vars = new Map()
    const numAmbient = this._numLights[SCNLight.LightType.ambient]
    const numDirectional = this._numLights[SCNLight.LightType.directional]
    const numDirectionalShadow = this._numLights.directionalShadow
    const numOmni = this._numLights[SCNLight.LightType.omni]
    const numSpot = this._numLights[SCNLight.LightType.spot]
    const numIES = this._numLights[SCNLight.LightType.IES]
    const numProbe = this._numLights[SCNLight.LightType.probe]

    vars.set('__NUM_AMBIENT_LIGHTS__', numAmbient)
    vars.set('__NUM_DIRECTIONAL_LIGHTS__', numDirectional)
    vars.set('__NUM_DIRECTIONAL_SHADOW_LIGHTS__', numDirectionalShadow)
    vars.set('__NUM_OMNI_LIGHTS__', numOmni)
    vars.set('__NUM_SPOT_LIGHTS__', numSpot)
    vars.set('__NUM_IES_LIGHTS__', numIES)
    vars.set('__NUM_PROBE_LIGHTS__', numProbe)

    vars.set('__USE_SHADER_MODIFIER_GEOMETRY__', 0)
    vars.set('__SHADER_MODIFIER_GEOMETRY__', '')
    vars.set('__USE_SHADER_MODIFIER_SURFACE__', 0)
    vars.set('__SHADER_MODIFIER_SURFACE__', '')
    vars.set('__USE_SHADER_MODIFIER_FRAGMENT__', 0)
    vars.set('__SHADER_MODIFIER_FRAGMENT__', '')

    let customUniform = ''
    let customSurface = ''
    let customTexcoord = ''
    for(const key of Object.keys(customProperties)){
      const val = customProperties[key]
      if(_InstanceOf(val, SCNMaterialProperty)){
        customUniform += `uniform sampler2D ${key};`
        customTexcoord += `_surface.${key}Texcoord = v_texcoord${val.mappingChannel};`
        customSurface += `vec2 ${key}Texcoord;`
      }else{
        // TODO: implement for other types
        throw new Error(`custom property for ${key} is not implemented`)
      }
    }

    vars.set('__USER_CUSTOM_UNIFORM__', customUniform)
    vars.set('__USER_CUSTOM_SURFACE__', customSurface)
    vars.set('__USER_CUSTOM_TEXCOORD__', customTexcoord)


    if(shadableHelper && shadableHelper._shaderModifiers){
      const modifiers = shadableHelper._shaderModifiers
      if(modifiers.SCNShaderModifierEntryPointGeometry){
        const _text = this._processShaderText(modifiers.SCNShaderModifierEntryPointGeometry)
        vars.set('__USE_SHADER_MODIFIER_GEOMETRY__', 1)
        vars.set('__SHADER_MODIFIER_GEOMETRY__', _text)
      }
      if(modifiers.SCNShaderModifierEntryPointSurface){
        const _text = this._processShaderText(modifiers.SCNShaderModifierEntryPointSurface)
        vars.set('__USE_SHADER_MODIFIER_SURFACE__', 1)
        vars.set('__SHADER_MODIFIER_SURFACE__', _text)
      }
      if(modifiers.SCNShaderModifierEntryPointFragment){
        const _text = this._processShaderText(modifiers.SCNShaderModifierEntryPointFragment)
        vars.set('__USE_SHADER_MODIFIER_FRAGMENT__', 1)
        vars.set('__SHADER_MODIFIER_FRAGMENT__', _text)
      }
    }

    let vsLighting = ''
    let fsLighting = ''
    if(numDirectionalShadow > 0){
      for(let i=0; i<numDirectionalShadow; i++){
        const fsDSText = _fsDirectionalShadow.replace(new RegExp('__I__', 'g'), i)
        fsLighting += fsDSText
      }
    }
    vars.set('__FS_LIGHTING__', fsLighting)

    let result = text
    vars.forEach((value, key) => {
      const rex = new RegExp(key, 'g')
      result = result.replace(rex, value)
    })

    return result
  }

  _processShaderText(text) {
    let _text = text.replace(/texture2D/g, 'texture')
    _text = _text.replace(/float2/g, 'vec2')
    _text = _text.replace(/float3/g, 'vec3')
    _text = _text.replace(/float4/g, 'vec4')
    _text = _text.replace(/scn_frame\.time/g, 'u_time')
    _text = _text.replace(/#pragma alpha/g, '')
    _text = _text.replace(/half /g, 'float ') // FIXME: check semicolon before half

    _text = _text.replace(/u_modelTransform/g, 'modelTransform') // TODO: use u_modelTransform
    _text = _text.replace(/\s*uniform[^;]*;/g, '')

    // workaround for Badger...
    _text = _text.replace('uvs.x *= 2', 'uvs.x *= 2.0')
    _text = _text.replace('tn * 2 - 1', 'tn * 2.0 - vec3(1)')
    _text = _text.replace('tn2 * 2 - 1', 'tn2 * 2.0 - vec3(1)')

    // workaround for Fox2...
    _text = _text.replace('pow(_surface.ambientOcclusion,3)', 'pow(_surface.ambientOcclusion,3.0)')
    _text = _text.replace('pow(AO,5)', 'pow(AO,5.0)')
    _text = _text.replace('pow(1.-fresnelBasis , 6)', 'pow(1.-fresnelBasis , 6.0)')
    _text = _text.replace('pow(1.-fresnelBasis , 4)', 'pow(1.-fresnelBasis , 4.0)')
    _text = _text.replace('vec3(1,0.4,0.0) * 1;', 'vec3(1,0.4,0.0);')
    _text = _text.replace('vec3(0.6,0.3,0.2) * 1;', 'vec3(0.6,0.3,0.2);')
    _text = _text.replace('vec4 WorldPos', 'vec3 WorldPos')
    _text = _text.replace('mult * 5;', 'mult * 5.0;')
    _text = _text.replace('mask * (1 - feather) + feather / 2', 'mask * (1.0 - feather) + feather / 2.0')
    _text = _text.replace(
      'vec4 pos = modelTransform * _geometry.position;', 
      'vec4 pos = modelTransform * vec4(_geometry.position, 1);'
    )
    _text = _text.replace('cos((u_time * 0.5 + pos.x) * 2)', 'cos((u_time * 0.5 + pos.x) * 2.0)')
    _text = _text.replace('(WorldPos.x * 10)', '(WorldPos.x * 10.0)')
    _text = _text.replace('(WorldPos.z + WorldPos.x) * 3)', '(WorldPos.z + WorldPos.x) * 3.0)')
    _text = _text.replace('pow(flowmap, 1.0/2.2)', 'pow(flowmap, vec2(1.0/2.2))')
    _text = _text.replace(/\(flowmap\/2\)/g, '(flowmap/2.0)')

    return _text
  }

  _initializeVAO(node, glProgram) {
    const gl = this.context
    const geometry = node.presentation.geometry
    const baseGeometry = node.geometry

    // prepare vertex array data
    const vertexBuffer = geometry._createVertexBuffer(gl, node)
    // TODO: retain attribute locations
    const positionLoc = gl.getAttribLocation(glProgram, 'position')
    const normalLoc = gl.getAttribLocation(glProgram, 'normal')
    const tangentLoc = gl.getAttribLocation(glProgram, 'tangent')
    const colorLoc = gl.getAttribLocation(glProgram, 'color')
    const texcoord0Loc = gl.getAttribLocation(glProgram, 'texcoord0')
    const texcoord1Loc = gl.getAttribLocation(glProgram, 'texcoord1')
    const boneIndicesLoc = gl.getAttribLocation(glProgram, 'boneIndices')
    const boneWeightsLoc = gl.getAttribLocation(glProgram, 'boneWeights')

    geometry._vertexArrayObjects = []
    const elementCount = node.presentation.geometry.geometryElements.length
    for(let i=0; i<elementCount; i++){
      const element = node.presentation.geometry.geometryElements[i]
      const material = node.presentation.geometry.materials[i]
      const vao = gl.createVertexArray()
      gl.bindVertexArray(vao)

      // initialize vertex buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

      gl.bindAttribLocation(glProgram, positionLoc, 'position')
      gl.bindAttribLocation(glProgram, normalLoc, 'normal')
      gl.bindAttribLocation(glProgram, tangentLoc, 'tangent')
      gl.bindAttribLocation(glProgram, colorLoc, 'color')
      gl.bindAttribLocation(glProgram, texcoord0Loc, 'texcoord0')
      gl.bindAttribLocation(glProgram, texcoord1Loc, 'texcoord1')
      gl.bindAttribLocation(glProgram, boneIndicesLoc, 'boneIndices')
      gl.bindAttribLocation(glProgram, boneWeightsLoc, 'boneWeights')
      
      // vertexAttribPointer(ulong idx, long size, ulong type, bool norm, long stride, ulong offset)

      // position
      const posSrc = geometry.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.vertex)[0]
      if(posSrc){
        gl.enableVertexAttribArray(positionLoc)
        gl.vertexAttribPointer(positionLoc, posSrc.componentsPerVector, gl.FLOAT, false, posSrc.dataStride, posSrc.dataOffset)
      }else{
        gl.disableVertexAttribArray(positionLoc)
      }

      // normal
      const nrmSrc = geometry.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.normal)[0]
      if(nrmSrc){
        gl.enableVertexAttribArray(normalLoc)
        gl.vertexAttribPointer(normalLoc, nrmSrc.componentsPerVector, gl.FLOAT, false, nrmSrc.dataStride, nrmSrc.dataOffset)
      }else{
        gl.disableVertexAttribArray(normalLoc)
      }

      // tangent
      const tanSrc = geometry.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.tangent)[0]
      if(tanSrc){
        gl.enableVertexAttribArray(tangentLoc)
        gl.vertexAttribPointer(tangentLoc, tanSrc.componentsPerVector, gl.FLOAT, false, tanSrc.dataStride, tanSrc.dataOffset)
      }else{
        gl.disableVertexAttribArray(tangentLoc)
      }

      // color
      const colorSrc = geometry.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.color)[0]
      if(colorSrc){
        gl.enableVertexAttribArray(colorLoc)
        gl.vertexAttribPointer(colorLoc, colorSrc.componentsPerVector, gl.FLOAT, false, colorSrc.dataStride, colorSrc.dataOffset)
      }else{
        gl.disableVertexAttribArray(colorLoc)
      }

      // texcoord0
      const tex0Src = geometry.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.texcoord)[0]
      if(tex0Src){
        //console.log(`texSrc: ${texcoordLoc}, ${texSrc.componentsPerVector}, ${texSrc.dataStride}, ${texSrc.dataOffset}`)
        gl.enableVertexAttribArray(texcoord0Loc)
        gl.vertexAttribPointer(texcoord0Loc, tex0Src.componentsPerVector, gl.FLOAT, false, tex0Src.dataStride, tex0Src.dataOffset)
      }else{
        gl.disableVertexAttribArray(texcoord0Loc)
      }

      // texcoord1
      const tex1Src = geometry.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.texcoord)[1]
      if(tex1Src){
        gl.enableVertexAttribArray(texcoord1Loc)
        gl.vertexAttribPointer(texcoord1Loc, tex1Src.componentsPerVector, gl.FLOAT, false, tex1Src.dataStride, tex1Src.dataOffset)
      }else{
        gl.disableVertexAttribArray(texcoord1Loc)
      }

      // boneIndices
      const indSrc = (node.skinner && node.skinner._useGPU) ? node.skinner._boneIndices : null
      if(indSrc){
        //console.log(`indSrc: ${boneIndicesLoc}, ${indSrc.componentsPerVector}, ${indSrc.dataStride}, ${indSrc.dataOffset}`)
        gl.enableVertexAttribArray(boneIndicesLoc)
        gl.vertexAttribPointer(boneIndicesLoc, indSrc.componentsPerVector, gl.FLOAT, false, indSrc.dataStride, indSrc.dataOffset)
      }else{
        gl.disableVertexAttribArray(boneIndicesLoc)
      }

      // boneWeights
      const wgtSrc = (node.skinner && node.skinner._useGPU) ? node.skinner._boneWeights : null
      if(wgtSrc){
        //console.log(`wgtSrc: ${boneWeightsLoc}, ${wgtSrc.componentsPerVector}, ${wgtSrc.dataStride}, ${wgtSrc.dataOffset}`)
        gl.enableVertexAttribArray(boneWeightsLoc)
        gl.vertexAttribPointer(boneWeightsLoc, wgtSrc.componentsPerVector, gl.FLOAT, false, wgtSrc.dataStride, wgtSrc.dataOffset)
      }else{
        gl.disableVertexAttribArray(boneWeightsLoc)
      }

      // FIXME: use setting
      gl.disable(gl.CULL_FACE)

      // initialize index buffer
      // FIXME: check geometrySource semantic
      const indexBuffer = element._createBuffer(gl)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
      
      geometry._vertexArrayObjects.push(vao)
    }
  }

  _initializeShadowVAO(node, glProgram) {
    const gl = this.context
    const geometry = node.presentation.geometry
    const baseGeometry = node.geometry

    // prepare vertex array data
    const vertexBuffer = geometry._createVertexBuffer(gl, node)
    // TODO: retain attribute locations
    const positionLoc = gl.getAttribLocation(glProgram, 'position')
    const boneIndicesLoc = gl.getAttribLocation(glProgram, 'boneIndices')
    const boneWeightsLoc = gl.getAttribLocation(glProgram, 'boneWeights')

    geometry._shadowVAO = []
    const elementCount = node.presentation.geometry.geometryElements.length
    for(let i=0; i<elementCount; i++){
      const element = node.presentation.geometry.geometryElements[i]
      const material = node.presentation.geometry.materials[i]
      const shadowVAO = gl.createVertexArray()
      gl.bindVertexArray(shadowVAO)

      // initialize vertex buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

      gl.bindAttribLocation(glProgram, positionLoc, 'position')
      gl.bindAttribLocation(glProgram, boneIndicesLoc, 'boneIndices')
      gl.bindAttribLocation(glProgram, boneWeightsLoc, 'boneWeights')
      
      // vertexAttribPointer(ulong idx, long size, ulong type, bool norm, long stride, ulong offset)

      // position
      const posSrc = geometry.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.vertex)[0]
      if(posSrc){
        gl.enableVertexAttribArray(positionLoc)
        gl.vertexAttribPointer(positionLoc, posSrc.componentsPerVector, gl.FLOAT, false, posSrc.dataStride, posSrc.dataOffset)
      }else{
        gl.disableVertexAttribArray(positionLoc)
      }

      // boneIndices
      const indSrc = (node.skinner && node.skinner._useGPU) ? node.skinner._boneIndices : null
      if(indSrc){
        gl.enableVertexAttribArray(boneIndicesLoc)
        gl.vertexAttribPointer(boneIndicesLoc, indSrc.componentsPerVector, gl.FLOAT, false, indSrc.dataStride, indSrc.dataOffset)
      }else{
        gl.disableVertexAttribArray(boneIndicesLoc)
      }

      // boneWeights
      const wgtSrc = (node.skinner && node.skinner._useGPU) ? node.skinner._boneWeights : null
      if(wgtSrc){
        gl.enableVertexAttribArray(boneWeightsLoc)
        gl.vertexAttribPointer(boneWeightsLoc, wgtSrc.componentsPerVector, gl.FLOAT, false, wgtSrc.dataStride, wgtSrc.dataOffset)
      }else{
        gl.disableVertexAttribArray(boneWeightsLoc)
      }

      // FIXME: use setting
      gl.disable(gl.CULL_FACE)

      // initialize index buffer
      // FIXME: check geometrySource semantic
      const indexBuffer = element._createBuffer(gl)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
      
      geometry._shadowVAO.push(shadowVAO)
    }
  }

  _initializeHitTestVAO(node, glProgram, physics = false) {
    const gl = this.context
    const geometry = physics ? node.physicsBody.physicsShape._sourceGeometry : node.presentation.geometry
    const baseGeometry = physics ? geometry : node.geometry

    // TODO: retain attribute locations
    const positionLoc = gl.getAttribLocation(glProgram, 'position')
    const normalLoc = gl.getAttribLocation(glProgram, 'normal')
    const boneIndicesLoc = gl.getAttribLocation(glProgram, 'boneIndices')
    const boneWeightsLoc = gl.getAttribLocation(glProgram, 'boneWeights')

    geometry._hitTestVAO = []
    const elementCount = geometry.geometryElements.length
    for(let i=0; i<elementCount; i++){
      const element = geometry.geometryElements[i]
      const vao = gl.createVertexArray()
      gl.bindVertexArray(vao)

      gl.bindBuffer(gl.ARRAY_BUFFER, geometry._vertexBuffer)

      gl.bindAttribLocation(glProgram, positionLoc, 'position')
      gl.bindAttribLocation(glProgram, normalLoc, 'normal')
      gl.bindAttribLocation(glProgram, boneIndicesLoc, 'boneIndices')
      gl.bindAttribLocation(glProgram, boneWeightsLoc, 'boneWeights')
      
      // vertexAttribPointer(ulong idx, long size, ulong type, bool norm, long stride, ulong offset)

      // position
      const posSrc = geometry.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.vertex)[0]
      if(posSrc){
        gl.enableVertexAttribArray(positionLoc)
        gl.vertexAttribPointer(positionLoc, posSrc.componentsPerVector, gl.FLOAT, false, posSrc.dataStride, posSrc.dataOffset)
      }else{
        gl.disableVertexAttribArray(positionLoc)
      }

      // normal
      const nrmSrc = geometry.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.normal)[0]
      if(nrmSrc){
        gl.enableVertexAttribArray(normalLoc)
        gl.vertexAttribPointer(normalLoc, nrmSrc.componentsPerVector, gl.FLOAT, false, nrmSrc.dataStride, nrmSrc.dataOffset)
      }else{
        gl.disableVertexAttribArray(normalLoc)
      }

      // boneIndices
      const indSrc = node.skinner ? node.skinner._boneIndices : null
      if(indSrc){
        gl.enableVertexAttribArray(boneIndicesLoc)
        gl.vertexAttribPointer(boneIndicesLoc, indSrc.componentsPerVector, gl.FLOAT, false, indSrc.dataStride, indSrc.dataOffset)
      }else{
        gl.disableVertexAttribArray(boneIndicesLoc)
      }

      // boneWeights
      const wgtSrc = node.skinner ? node.skinner._boneWeights : null
      if(wgtSrc){
        gl.enableVertexAttribArray(boneWeightsLoc)
        gl.vertexAttribPointer(boneWeightsLoc, wgtSrc.componentsPerVector, gl.FLOAT, false, wgtSrc.dataStride, wgtSrc.dataOffset)
      }else{
        gl.disableVertexAttribArray(boneWeightsLoc)
      }

      // initialize index buffer
      // FIXME: check geometrySource semantic
      const indexBuffer = element._createBuffer(gl)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, element._buffer)
      
      geometry._hitTestVAO.push(vao)
    }
  }

  _initializeCameraBuffer(glProgram) {
    const gl = this.context
    
    const cameraIndex = gl.getUniformBlockIndex(glProgram, 'cameraUniform')

    this._cameraBuffer = gl.createBuffer()
    gl.uniformBlockBinding(glProgram, cameraIndex, _cameraLoc)
    gl.bindBufferBase(gl.UNIFORM_BUFFER, _cameraLoc, this._cameraBuffer)

  }

  _initializeFogBuffer(glProgram) {
    const gl = this.context
    
    const fogIndex = gl.getUniformBlockIndex(glProgram, 'fogUniform')

    this._fogBuffer = gl.createBuffer()
    gl.uniformBlockBinding(glProgram, fogIndex, _fogLoc)
    gl.bindBufferBase(gl.UNIFORM_BUFFER, _fogLoc, this._fogBuffer)
  }

  _initializeLightBuffer(glProgram) {
    const gl = this.context
    
    const lightIndex = gl.getUniformBlockIndex(glProgram, 'lightUniform')

    this._lightBuffer = gl.createBuffer()
    gl.uniformBlockBinding(glProgram, lightIndex, _lightLoc)
    gl.bindBufferBase(gl.UNIFORM_BUFFER, _lightLoc, this._lightBuffer)

    for(let i=0; i<this._lightNodes.directionalShadow.length; i++){
      const node = this._lightNodes.directionalShadow[i]
      const symbol = `TEXTURE${i+8}`
      const name = `u_shadowMapTexture${i}`

      gl.uniform1i(gl.getUniformLocation(glProgram, name), i+8)
      gl.activeTexture(gl[symbol])
      gl.bindTexture(gl.TEXTURE_2D, node.presentation.light._shadowDepthTexture)
    }
  }

  _initializeUBO(node, glProgram) {
    const gl = this.context
    const geometry = node.presentation.geometry

    const materialIndex = gl.getUniformBlockIndex(glProgram, 'materialUniform')
    geometry._materialBuffer = gl.createBuffer()
    gl.uniformBlockBinding(glProgram, materialIndex, _materialLoc)
    gl.bindBufferBase(gl.UNIFORM_BUFFER, _materialLoc, geometry._materialBuffer)
  }

  _updateVAO(node) {
    const gl = this.context
    const geometry = node.presentation.geometry
    const baseGeometry = node.geometry

    geometry._updateVertexBuffer(gl, baseGeometry)
  }

  get _dummyTexture() {
    return this.__dummyTexture
  }

  _createDummyTexture() {
    const gl = this.context

    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const context = canvas.getContext('2d')
    context.fillStyle = 'rgba(255, 255, 255, 1.0)'
    context.fillRect(0, 0, 1, 1)

    this.__dummyTexture = gl.createTexture()

    gl.bindTexture(gl.TEXTURE_2D, this.__dummyTexture)
    // texImage2D(target, level, internalformat, width, height, border, format, type, source)
    // Safari complains that 'source' is not ArrayBufferView type, but WebGL2 should accept HTMLCanvasElement.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, canvas)
    gl.bindTexture(gl.TEXTURE_2D, null)
  }

  /**
   * @access private
   * @param {SCNProgram} program -
   * @returns {void}
   */
  //_setDummyTextureAsDefault(program) {
  //  const gl = this.context
  //  const p = program

  //  const texNames = [
  //    gl.TEXTURE0,
  //    gl.TEXTURE1,
  //    gl.TEXTURE2,
  //    gl.TEXTURE3,
  //    gl.TEXTURE4,
  //    gl.TEXTURE5,
  //    gl.TEXTURE6,
  //    gl.TEXTURE7
  //  ]
  //  const texSymbols = [
  //    'u_emissionTexture',
  //    'u_ambientTexture',
  //    'u_diffuseTexture',
  //    'u_specularTexture',
  //    'u_reflectiveTexture',
  //    'u_transparentTexture',
  //    'u_multiplyTexture',
  //    'u_normalTexture'
  //  ]
  //  for(let i=0; i<texNames.length; i++){
  //    const texName = texNames[i]
  //    const symbol = texSymbols[i]
  //    gl.uniform1i(gl.getUniformLocation(p._glProgram, symbol), i)
  //    gl.activeTexture(texName)
  //    gl.bindTexture(gl.TEXTURE_2D, this.__dummyTexture)
  //  }
  //}

  _switchToDefaultCamera() {
    if(this._pointOfView === null){
      this._defaultCameraPosNode.position = new SCNVector3(0, 0, 0)
      this._defaultCameraRotNode.rotation = new SCNVector4(0, 0, 0, 0)
      this._defaultCameraNode.position = new SCNVector3(0, 0, _defaultCameraDistance)
    }else if(this._pointOfView !== this._defaultCameraNode){
      const rot = this.pointOfView.presentation._worldRotation
      const rotMat = SCNMatrix4.matrixWithRotation(rot)
      const pos = this.pointOfView.presentation._worldTranslation

      this._defaultCameraPosNode.position = (new SCNVector3(0, 0, -_defaultCameraDistance)).rotate(rotMat).add(pos)
      this._defaultCameraRotNode.rotation = rot
      this._defaultCameraNode.position = new SCNVector3(0, 0, _defaultCameraDistance)
      //console.log(`pov defined: pov.pos: ${this._pointOfView._worldTranslation.float32Array()}`)
      //console.log(`pov defined: node.pos: ${this._defaultCameraNode._worldTranslation.float32Array()}`)
    }
    this._pointOfView = this._defaultCameraNode
  }

  _setDefaultCameraOrientation(orientation) {
    this._defaultCameraRotNode.orientation = orientation
  }

  _searchCameraNode() {
    const nodes = [this.scene._rootNode]
    let node = nodes.shift()
    while(node){
      if(node.camera !== null){
        return node
      }
      nodes.push(...node._childNodes)
      node = nodes.shift()
    }
    return null
  }

  /**
   * @access private
   * @returns {SCNVector3} -
   */
  _getCameraPosition() {
    if(this._pointOfView === this._defaultCameraNode){
      return this._defaultCameraPosNode.position
    }else if(this._pointOfView === null){
      return new SCNVector3(0, 0, 0)
    }
    const rot = this._getCameraOrientation()
    const rotMat = SCNMatrix4.matrixWithRotation(rot)
    const pos = this._pointOfView.presentation._worldTranslation
    return pos.add((new SCNVector3(0, 0, -_defaultCameraDistance)).rotate(rotMat))
  }

  /**
   * @access private
   * @returns {SCNVector4} -
   */
  _getCameraOrientation() {
    if(this._pointOfView === this._defaultCameraNode){
      return this._defaultCameraRotNode.presentation.orientation
    }else if(this._pointOfView === null){
      return new SCNVector4(0, 0, 0, 0)
    }
    return this._pointOfView.presentation._worldOrientation
  }

  /**
   * @access private
   * @returns {number} -
   */
  _getCameraDistance() {
    if(this._pointOfView === this._defaultCameraNode){
      return this._defaultCameraNode.presentation.position.z
    }
    return _defaultCameraDistance
  }

  /**
   * @access private
   * @returns {boolean} - true if the number of lights is changed.
   */
  _numLightsChanged() {
    let changed = false
    const types = [...Object.values(SCNLight.LightType), 'directionalShadow']
    for(const type of types){
      const num = this._lightNodes[type].length
      if(num !== this._numLights[type]){
        changed = true
        this._numLights[type] = num
      }
    }
    return changed
  }

  /**
   * @access private
   * @param {SCNNode} node -
   * @param {SCNVector3} rayPoint - 
   * @param {SCNVector3} rayVec -
   * @returns {SCNHitTestResult[]} -
   */
  _nodeHitTestByCPU(node, rayPoint, rayVec) {
    const result = []
    const geometry = node.presentation.geometry
    const geometryCount = geometry.geometryElements.length
    if(geometryCount === 0){
      // nothing to draw...
      return result
    }
    const invRay = rayVec.mul(-1)

    //console.log(`rayPoint: ${rayPoint.float32Array()}`)
    //console.log(`rayVec: ${rayVec.float32Array()}`)

    //if(node.morpher !== null){
    //  this._updateVAO(node)
    //}

    // TODO: test the bounding box/sphere first for performance

    const source = geometry.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.vertex)[0]
    const sourceLen = source.vectorCount
    const sourceData = []
    const modelTransform = node.presentation._worldTransform
    const skinningJoints = []
    if(node.presentation.skinner){
      const skinner = node.presentation.skinner
      const numBones = skinner._bones.length
      for(let i=0; i<numBones; i++){
        const bone = skinner._bones[i]
        const mat = skinner._boneInverseBindTransforms[i].mult(bone._presentation._worldTransform)
        skinningJoints.push(mat)
      }
      for(let i=0; i<sourceLen; i++){
        const weights = skinner._boneWeights._vectorAt(i)
        const indices = skinner._boneIndices._vectorAt(i)
        const mat = new SCNMatrix4()
        for(let j=0; j<skinner.numSkinningJoints; j++){
          mat.add(skinningJoints[indices[j]].mul(weights[j]))
        }
        sourceData.push(source._scnVectorAt(i).transform(mat))
      }
    }else{
      for(let i=0; i<sourceLen; i++){
        sourceData.push(source._scnVectorAt(i).transform(modelTransform))
      }
    }

    for(let i=0; i<geometryCount; i++){
      //console.log(`geometry element ${i}`)
      const element = geometry.geometryElements[i]
      switch(element.primitiveType){
        case SCNGeometryPrimitiveType.line:
          console.warn('hitTest for line is not implemented')
          continue
        case SCNGeometryPrimitiveType.point:
          console.warn('hitTest for point is not implemented')
          continue
      }

      const elementData = element._glData
      const len = element.primitiveCount
      //console.log(`primitiveCount: ${len}`)
      // TODO: check cull settings
      for(let pi=0; pi<len; pi++){
        const indices = element._indexAt(pi)

        const v0 = sourceData[indices[0]]
        const v1 = sourceData[indices[1]]
        const v2 = sourceData[indices[2]]

        const e1 = v1.sub(v0)
        const e2 = v2.sub(v0)

        let denom = this._det(e1, e2, invRay)
        if(denom <= 0){
          continue
        }
        denom = 1.0 / denom

        const d = rayPoint.sub(v0)
        const u = this._det(d, e2, invRay) * denom
        if(u < 0 || u > 1){
          continue
        }

        const v = this._det(e1, d, invRay) * denom
        if(v < 0 || v > 1){
          continue
        }

        const t = this._det(e1, e2, d) * denom
        if(t < 0){
          continue
        }

        // Hit!
        //console.log(`Hit! ${i}: ${pi}`)
        const hitPoint = rayPoint.add(rayVec.mul(t))
        const invModel = modelTransform.invert()

        const res = new SCNHitTestResult()
        res._node = node
        res._geometryIndex = i
        res._faceIndex = pi
        res._worldCoordinates = hitPoint
        res._localCoordinates = hitPoint.transform(invModel)
        const nom = e1.cross(e2)
        res._worldNormal = nom.normalize()
        res._localNormal = nom.transform(invModel)
        res._modelTransform = modelTransform
        res._boneNode = null // it should be array... what should I put here?
        result.push(res)
      }
    }

    return result
  }

  /**
   * @access private
   * @type {SCNProgram}
   */
  get _defaultParticleProgram() {
    if(this.__defaultParticleProgram !== null){
      return this.__defaultParticleProgram
    }
    const gl = this.context
    if(this.__defaultParticleProgram === null){
      this.__defaultParticleProgram = new SCNProgram()
    }
    const p = this.__defaultParticleProgram
    const glProgram = p._getGLProgramForContext(gl)
    const vsText = _defaultParticleVertexShader
    const fsText = _defaultParticleFragmentShader

    // initialize vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vsText)
    gl.compileShader(vertexShader)
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
      const info = gl.getShaderInfoLog(vertexShader)
      throw new Error(`particle vertex shader compile error: ${info}`)
    }

    // initialize fragment shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fsText)
    gl.compileShader(fragmentShader)
    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
      const info = gl.getShaderInfoLog(fragmentShader)
      throw new Error(`particle fragment shader compile error: ${info}`)
    }

    gl.attachShader(glProgram, vertexShader)
    gl.attachShader(glProgram, fragmentShader)

    // link program object
    gl.linkProgram(glProgram)
    if(!gl.getProgramParameter(glProgram, gl.LINK_STATUS)){
      const info = gl.getProgramInfoLog(glProgram)
      throw new Error(`program link error: ${info}`)
    }

    //gl.useProgram(glProgram)
    this._useProgram(p)
    //gl.clearColor(1, 1, 1, 1)
    //gl.clearDepth(1.0)
    //gl.clearStencil(0)

    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.enable(gl.CULL_FACE)
    gl.cullFace(gl.BACK)

    // set default textures to prevent warnings
    this._setDummyParticleTextureAsDefault()
    
    return this.__defaultParticleProgram
  }

  /**
   * @access private
   * @type {SCNProgram}
   */
  get _defaultShadowProgram() {
    if(this.__defaultShadowProgram !== null){
      return this.__defaultShadowProgram
    }
    const gl = this.context
    if(this.__defaultShadowProgram === null){
      this.__defaultShadowProgram = new SCNProgram()
    }
    const p = this.__defaultShadowProgram
    const glProgram = p._getGLProgramForContext(gl)
    const vsText = _defaultShadowVertexShader
    const fsText = _defaultShadowFragmentShader

    // initialize vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vsText)
    gl.compileShader(vertexShader)
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
      const info = gl.getShaderInfoLog(vertexShader)
      throw new Error(`particle vertex shader compile error: ${info}`)
    }

    // initialize fragment shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fsText)
    gl.compileShader(fragmentShader)
    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
      const info = gl.getShaderInfoLog(fragmentShader)
      throw new Error(`particle fragment shader compile error: ${info}`)
    }

    gl.attachShader(glProgram, vertexShader)
    gl.attachShader(glProgram, fragmentShader)

    // link program object
    gl.linkProgram(glProgram)
    if(!gl.getProgramParameter(glProgram, gl.LINK_STATUS)){
      const info = gl.getProgramInfoLog(glProgram)
      throw new Error(`program link error: ${info}`)
    }

    //gl.useProgram(glProgram)
    this._useProgram(p)
    //gl.clearColor(1, 1, 1, 1)
    //gl.clearDepth(1.0)
    //gl.clearStencil(0)

    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    //gl.enable(gl.BLEND)
    gl.disable(gl.BLEND)
    //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.enable(gl.CULL_FACE)
    gl.cullFace(gl.BACK)

    return this.__defaultShadowProgram
  }

  _setDummyParticleTextureAsDefault() {
    const gl = this.context
    const p = this._defaultParticleProgram
    const glProgram = p._getGLProgramForContext(gl)

    const texNames = [
      gl.TEXTURE0
      //gl.TEXTURE1
    ]
    const texSymbols = [
      'particleTexture'
      //'colorTexture'
    ]
    for(let i=0; i<texNames.length; i++){
      const texName = texNames[i]
      const symbol = texSymbols[i]
      gl.uniform1i(gl.getUniformLocation(glProgram, symbol), i)
      gl.activeTexture(texName)
      gl.bindTexture(gl.TEXTURE_2D, this.__dummyTexture)
    }
  }

  /**
   * @access private
   * @type {SCNProgram}
   */
  get _defaultHitTestProgram() {
    if(this.__defaultHitTestProgram !== null){
      return this.__defaultHitTestProgram
    }
    const gl = this.context
    if(this.__defaultHitTestProgram === null){
      this.__defaultHitTestProgram = new SCNProgram()
    }
    const p = this.__defaultHitTestProgram
    const glProgram = p._getGLProgramForContext(gl)
    const vsText = _defaultHitTestVertexShader
    const fsText = _defaultHitTestFragmentShader

    // initialize vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vsText)
    gl.compileShader(vertexShader)
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
      const info = gl.getShaderInfoLog(vertexShader)
      throw new Error(`hitTest vertex shader compile error: ${info}`)
    }

    // initialize fragment shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fsText)
    gl.compileShader(fragmentShader)
    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
      const info = gl.getShaderInfoLog(fragmentShader)
      throw new Error(`hitTest fragment shader compile error: ${info}`)
    }

    gl.attachShader(glProgram, vertexShader)
    gl.attachShader(glProgram, fragmentShader)

    // link program object
    gl.linkProgram(glProgram)
    if(!gl.getProgramParameter(glProgram, gl.LINK_STATUS)){
      const info = gl.getProgramInfoLog(glProgram)
      throw new Error(`program link error: ${info}`)
    }

    //gl.useProgram(glProgram)
    this._useProgram(p)
    //gl.clearColor(1, 1, 1, 1)
    //gl.clearDepth(1.0)
    //gl.clearStencil(0)

    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.enable(gl.CULL_FACE)
    gl.cullFace(gl.BACK)

    //this._setDummyHitTestTextureAsDefault()
    
    return this.__defaultHitTestProgram
  }

  // for debug
  _showShadowMapOfLight(lightNode) {
    const gl = this.context
    const p = lightNode.presentation
    const light = p.light
    if(!this.__debugShadowMapSprite){
      const node = new SKSpriteNode()
      node.size = new CGSize(100, 100)
      node.anchorPoint = new CGPoint(0.0, 0.0)
      const texture = new SKTexture()
      texture._glTexture = light._shadowDepthTexture
      texture._image = {
        naturalWidth: 100,
        naturalHeight: 100
      }
      node._texture = texture
      node.__presentation = node.copy()
      node.__presentation._isPresentationInstance = true
      node.position = new CGPoint(100, 100)
      node._updateWorldTransform()

      this.__debugShadowMapSprite = node
    }
    gl.clearDepth(-1)
    gl.clearStencil(0)
    gl.depthMask(true)
    gl.enable(gl.DEPTH_TEST)
    gl.disable(gl.CULL_FACE)
    gl.depthFunc(gl.GEQUAL)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT)

    this._renderSKNode(this.__debugShadowMapSprite)
  }

  _setViewPort(width = null, height = null) {
    let w = width
    let h = height
    if(w === null || h === null){
      w = this._viewRect.size.width
      h = this._viewRect.size.height
    }
    this.context.viewport(0, 0, w, h)
  }

  /**
   * calculate a determinant of 3x3 matrix from 3 vectors.
   * @access private
   * @param {SCNVector3} v1 -
   * @param {SCNVector3} v2 -
   * @param {SCNVector3} v3 -
   * @returns {number} -
   */
  _det(v1, v2, v3) {
    return (
        v1.x * v2.y * v3.z
      + v1.y * v2.z * v3.x
      + v1.z * v2.x * v3.y
      - v1.x * v2.z * v3.y
      - v1.y * v2.x * v3.z
      - v1.z * v2.y * v3.x
    )
  }
}

