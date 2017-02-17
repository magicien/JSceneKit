import SCNScene from '../../../src/js/SceneKit/SCNScene'
import chai from '../../../node_modules/chai/chai'
import UnitTest from '../UnitTest'

const expect = chai.expect

describe('SCNScene class', () => {

  UnitTest.classFunctionsDefined(SCNScene, [
    'sceneWithMDLAsset',
    'sceneWithURLOptionsError',
    'sceneNamedInDirectoryOptions',
    'sceneNamed',
    'scene'
  ])

  UnitTest.functionsDefined(SCNScene, [
    'valueForKeyPath',
    'valueForKey',
    'setValueForKey',
    'setValueForKeyPath',
    'writeToURLOptionsDelegateProgressHandler',
    'setAttributeForKey',
    'attributeForKey',
    'removeParticleSystem',
    'removeAllParticleSystems',
    'addParticleSystemWithTransform'
  ])

  UnitTest.classPropertiesDefined(SCNScene, [
  ])

  UnitTest.propertiesDefined(SCNScene, [
    'frameRate',
    'endTime',
    'startTime',
    'isPaused',
    'fogColor',
    'fogDensityExponent',
    'fogEndDistance',
    'fogStartDistance',
    'lightingEnvironment',
    'background',
    'physicsWorld',
    'rootNode',
    'particleSystems'
  ])

  describe('sceneWithMDLAsset function', () => {
    it('should ', () => {
      // TODO: implement
    })
  })

  describe('scene function', () => {
    it('should return new instance', () => {
      const scene = SCNScene.scene()
      expect(scene).to.be.an.instanceof(SCNScene)
    })
  })
})

