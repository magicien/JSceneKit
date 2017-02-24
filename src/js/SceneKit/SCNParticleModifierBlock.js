'use strict'


/**
 * The signature for blocks called by SceneKit to modify particle properties on each frame of simulation, used by the addModifier(forProperties:at:modifier:) method.
 * @type {function(data: UnsafeMutablePointer<UnsafeMutableRawPointer>, dataStride: UnsafeMutablePointer<Int>, start: number, end: number, deltaTime: number): void}
 * @param {UnsafeMutablePointer<UnsafeMutableRawPointer>} data - An array of floating-point values containing stripes of property data for the system’s particles. The width and format of each data stripe depend on the properties you specify when calling the addModifier(forProperties:at:modifier:) method.
 * @param {UnsafeMutablePointer<Int>} dataStride - An array identifying the offset, in bytes, of each property’s value in the data stripe for each particle. The order of offsets in this array corresponds to the order of the properties array you specify when calling the addModifier(forProperties:at:modifier:) method.
 * @param {number} start - The index of the first particle’s data stripe in the data array.
 * @param {number} end - The index of the last particle’s data stripe in the data array.
 * @param {number} deltaTime - The elapsed time, in seconds, since the last frame of simulation.
 * @returns {void}
 * @desc Use this block to change properties of individual particles on each frame of simulation.ImportantRunning your own code to update particle properties every frame can have a severe impact on rendering performance. If the behavior over time that you want for your particle system can be described more declaratively, use the propertyControllers property and SCNParticlePropertyController class instead. If you need to change particle properties only at certain times (rather than continuously), add a handler block for an event using the handle(_:forProperties:handler:) method.The following example illustrates setting up a modifier block that alters particle’s position and velocity:[system addModifierForProperties:@[SCNParticlePropertyPosition,
                                   SCNParticlePropertyVelocity]
                         atStage:SCNParticleModifierStagePostDynamics
                       withBlock:^(void **data, size_t *dataStride, NSInteger start, NSInteger end, float deltaTime) {
                           // For each particle to be processed,
                           // calculate pointers in the data to each property's value:
                           for (NSInteger i = start; i < end; ++i) {
                               // SCNParticlePropertyPosition (float3)
                               float *pos = (float *)((char *)data[0] + dataStride[0] * i);
                               // pos[0..2] are the xyz components of the particle's position.
 
                               // SCNParticlePropertyVelocity (float3)
                               float *vel = (float *)((char *)data[1] + dataStride[1] * i);
                               // vel[0..2] are the xyz components of the particle's position.
 
                               // Now, compute a new position and velocity (not shown).
                           }
                       }];

 * @see https://developer.apple.com/reference/scenekit/scnparticlemodifierblock
 */
const SCNParticleModifierBlock = (data, dataStride, start, end, deltaTime) => {}

export default SCNParticleModifierBlock
