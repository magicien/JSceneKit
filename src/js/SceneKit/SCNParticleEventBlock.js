'use strict'


/**
 * The signature for blocks called by SceneKit in response to significant events during particle simulation, used by the handle(_:forProperties:handler:) method.
 * @type {function(data: UnsafeMutablePointer<UnsafeMutableRawPointer>, dataStride: UnsafeMutablePointer<Int>, indices: ?UnsafeMutablePointer<UInt32>, count: number): void}
 * @param {UnsafeMutablePointer<UnsafeMutableRawPointer>} data - An array of floating-point values containing stripes of property data for the system’s particles. The width and format of each data stripe depend on the properties you specify when calling the handle(_:forProperties:handler:) method.
 * @param {UnsafeMutablePointer<Int>} dataStride - An array identifying the offset, in bytes, of each property’s value in the data stripe for each particle. The order of offsets in this array corresponds to the order of the properties array you specify when calling the handle(_:forProperties:handler:) method.
 * @param {?UnsafeMutablePointer<UInt32>} indices - An array in which each element is an index that identifies (in the data array) the data stripe for each particle affected by the event that caused SceneKit to call the handler block.When SceneKit calls your handler block for the birth event, you need not use this parameter—at that time, the affected particles are indexed from 0 to the count parameter’s value.
 * @param {number} count - The number of particles affected by the current event.
 * @returns {void}
 * @desc Use this block to change properties of individual particles when they are spawned, when they collide with scene geometry, or when they die (that is, reach the end of their life spans and are removed from the scene). The following example illustrates setting up a handler block for particle collision events:[system handleEvent:SCNParticleEventCollision
      forProperties:@[SCNParticlePropertyAngle,
                      SCNParticlePropertyRotationAxis,
                      SCNParticlePropertyContactNormal]
          withBlock:^(void **data, size_t *dataStride, uint32_t *indices, NSInteger count) {
              // For each particle affected by the collision event,
              // calculate pointers in the data to each property's value.
              for (NSInteger i = 0; i < count; ++i) {
                  // SCNParticlePropertyAngle (float)
                  float *angle = (float *)((char *)data[0] + dataStride[0] * indices[i]);
                  // angle[0] is the particle's rotation angle in radians.
 
                  // SCNParticlePropertyRotationAxis (float3)
                  float *axis = (float *)((char *)data[1] + dataStride[1] * indices[i]);
                  // axis[0..2] are the xyz components of the particle's rotation axis.
 
                  // SCNParticlePropertyContactNormal (float3)
                  float *norm = (float *)((char *)data[2] + dataStride[2] * indices[i]);
                  // norm[0..2] are the xyz components of the contact normal vector.
 
                  // Now, use the norm vector to rotate the particle's axis/angle (not shown).
              }
          }];

 * @see https://developer.apple.com/documentation/scenekit/scnparticleeventblock
 */
const SCNParticleEventBlock = (data, dataStride, indices, count) => {}

export default SCNParticleEventBlock
