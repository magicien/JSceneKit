import SCNNode from '../../../src/js/SceneKit/SCNNode'
import SCNMatrix4 from '../../../src/js/SceneKit/SCNMatrix4'
import SCNVector3 from '../../../src/js/SceneKit/SCNVector3'
import chai from '../../../node_modules/chai/chai'
import UnitTest from '../UnitTest'

const expect = chai.expect

describe('SCNNode class', () => {

  /*
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
  */

  describe('transform', () => {
    it('should be instanceof SCNMatrix4', () => {
      const node = new SCNNode()
      expect(node.transform).to.be.instanceof(SCNMatrix4)
    })
  })

  describe('childNodeWithName', () => {
    const rootNode = new SCNNode()
    const node1 = new SCNNode()
    const node2 = new SCNNode()
    const node3 = new SCNNode()
    const node1_1 = new SCNNode()
    const node1_2 = new SCNNode()
    const node1_3 = new SCNNode()
    node1.name = 'typeA'
    node2.name = 'typeB'
    node3.name = 'typeB'
    node1_1.name = 'typeB'
    node1_2.name = 'typeA'
    node1_3.name = 'typeC'

    rootNode.addChildNode(node1)
    rootNode.addChildNode(node2)
    rootNode.addChildNode(node3)
    node1.addChildNode(node1_1)
    node1.addChildNode(node1_2)
    node1.addChildNode(node1_3)

    it('should be able to find a node', () => {
      expect(rootNode.childNodeWithName('typeA')).to.equal(node1)
      expect(rootNode.childNodeWithName('typeB')).to.equal(node2)
      expect(rootNode.childNodeWithName('typeC')).to.be.null
    })
  })

  describe('childNodeWithNameRecursively', () => {
    const rootNode = new SCNNode()
    const node1 = new SCNNode()
    const node2 = new SCNNode()
    const node3 = new SCNNode()
    const node1_1 = new SCNNode()
    const node1_2 = new SCNNode()
    const node1_3 = new SCNNode()
    node1.name = 'typeA'
    node2.name = 'typeB'
    node3.name = 'typeB'
    node1_1.name = 'typeB'
    node1_2.name = 'typeA'
    node1_3.name = 'typeC'

    rootNode.addChildNode(node1)
    rootNode.addChildNode(node2)
    rootNode.addChildNode(node3)
    node1.addChildNode(node1_1)
    node1.addChildNode(node1_2)
    node1.addChildNode(node1_3)

    it('should be able to find a node', () => {
      expect(rootNode.childNodeWithNameRecursively('typeA')).to.equal(node1)
      expect(rootNode.childNodeWithNameRecursively('typeB')).to.equal(node1_1)
      expect(rootNode.childNodeWithNameRecursively('typeC')).to.equal(node1_3)
    })
  })

})

