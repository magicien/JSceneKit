'use strict'

/**
 * @type {string}
 */
const _SCNDefaultPBRFragmentShader =
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
    float shininess;
    float fresnelExponent;
  } material;

  struct AmbientLight {
    vec4 color;
  };

  struct SCNShaderLightingContribution {
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
  } _lightingContribution;

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
    uniform sampler2D u_shadowTexture0;
    #if NUM_DIRECTIONAL_SHADOW_LIGHTS > 1
      uniform sampler2D u_shadowTexture1;
    #endif
    #if NUM_DIRECTIONAL_SHADOW_LIGHTS > 2
      uniform sampler2D u_shadowTexture2;
    #endif
    #if NUM_DIRECTIONAL_SHADOW_LIGHTS > 3
      uniform sampler2D u_shadowTexture3;
    #endif
  #endif

  layout (std140) uniform SCNLightsUniform {
    vec4 direction0;
    mat4 shadowMatrix0;
  } scn_lights;

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

  //#define kSCNTexcoordCount 2
  //struct SCNShaderGeometry {
  //  vec3 position;
  //  vec3 normal;
  //  vec4 tangent;
  //  vec4 color;
  //  vec2 texcoords[kSCNTexcoordCount];
  //};

  uniform float u_time;

  in vec3 v_position;
  in vec3 v_normal;
  in vec2 v_texcoord0;
  in vec2 v_texcoord1;
  //in vec4 v_color;
  in vec3 v_eye;
  in vec3 v_tangent;
  in vec3 v_bitangent;
  in float v_fogFactor;

  //in SCNShaderGeometry _geometry;

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

`

export default _SCNDefaultPBRFragmentShader

