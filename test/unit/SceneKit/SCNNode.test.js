import SCNNode from '../../../src/js/SceneKit/SCNNode'
import SCNMatrix4 from '../../../src/js/SceneKit/SCNMatrix4'
import SCNVector3 from '../../../src/js/SceneKit/SCNVector3'
import SCNVector4 from '../../../src/js/SceneKit/SCNVector4'
import chai from '../../../node_modules/chai/chai'
import UnitTest from '../UnitTest'

const expect = chai.expect

const epsilon = 0.0001

/** @test {SCNNode} */
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

  /** @test {SCNNode#transform} */
  describe('transform', () => {
    it('should be instanceof SCNMatrix4', () => {
      const node = new SCNNode()
      expect(node.transform).to.be.instanceof(SCNMatrix4)
    })
  })

  /** @test {SCNNode#childNodeWithName} */
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

  /** @test {SCNNode#childNodeWithNameRecursively} */
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

  /** @test {SCNNode#position} */
  describe('position', () => {
    it('should change transform matrix correctly', () => {
      const node = new SCNNode()
      const x = 2
      const y = 3
      const z = 4
      node.position = new SCNVector3(x, y, z)
      const m = node.transform

      expect(m.m11).to.equal(1)
      expect(m.m12).to.equal(0)
      expect(m.m13).to.equal(0)
      expect(m.m14).to.equal(x)
      expect(m.m21).to.equal(0)
      expect(m.m22).to.equal(1)
      expect(m.m23).to.equal(0)
      expect(m.m24).to.equal(y)
      expect(m.m31).to.equal(0)
      expect(m.m32).to.equal(0)
      expect(m.m33).to.equal(1)
      expect(m.m34).to.equal(z)
      expect(m.m41).to.equal(0)
      expect(m.m42).to.equal(0)
      expect(m.m43).to.equal(0)
      expect(m.m44).to.equal(1)
    })
  })

  /** @test {SCNNode#rotation} */
  describe('rotation', () => {
    it('should change transform matrix correctly when it rotates around x-axis', () => {
      const node = new SCNNode()
      const x = 123
      const y = 0
      const z = 0
      const w = Math.PI / 6.0
      const cosW = Math.cos(w)
      const sinW = Math.sin(w)

      node.rotation = new SCNVector4(x, y, z, w)
      const m = node.transform

      expect(m.m11).to.equal(1)
      expect(m.m12).to.equal(0)
      expect(m.m13).to.equal(0)
      expect(m.m14).to.equal(0)
      expect(m.m21).to.equal(0)
      expect(m.m22).to.within(cosW - epsilon, cosW + epsilon)
      expect(m.m23).to.within(-sinW - epsilon, -sinW + epsilon)
      expect(m.m24).to.equal(0)
      expect(m.m31).to.equal(0)
      expect(m.m32).to.within(sinW - epsilon, sinW + epsilon)
      expect(m.m33).to.within(cosW - epsilon, cosW + epsilon)
      expect(m.m34).to.equal(0)
      expect(m.m41).to.equal(0)
      expect(m.m42).to.equal(0)
      expect(m.m43).to.equal(0)
      expect(m.m44).to.equal(1)
    })

    it('should change transform matrix correctly when it rotates around y-axis', () => {
      const node = new SCNNode()
      const x = 0
      const y = 123
      const z = 0
      const w = Math.PI / 6.0
      const cosW = Math.cos(w)
      const sinW = Math.sin(w)

      node.rotation = new SCNVector4(x, y, z, w)
      const m = node.transform

      expect(m.m11).to.within(cosW - epsilon, cosW + epsilon)
      expect(m.m12).to.equal(0)
      expect(m.m13).to.within(sinW - epsilon, sinW + epsilon)
      expect(m.m14).to.equal(0)
      expect(m.m21).to.equal(0)
      expect(m.m22).to.equal(1)
      expect(m.m23).to.equal(0)
      expect(m.m24).to.equal(0)
      expect(m.m31).to.within(-sinW - epsilon, -sinW + epsilon)
      expect(m.m32).to.equal(0)
      expect(m.m33).to.within(cosW - epsilon, cosW + epsilon)
      expect(m.m34).to.equal(0)
      expect(m.m41).to.equal(0)
      expect(m.m42).to.equal(0)
      expect(m.m43).to.equal(0)
      expect(m.m44).to.equal(1)
    })

    it('should change transform matrix correctly when it rotates around z-axis', () => {
      const node = new SCNNode()
      const x = 0
      const y = 0
      const z = 123
      const w = Math.PI / 6.0
      const cosW = Math.cos(w)
      const sinW = Math.sin(w)

      node.rotation = new SCNVector4(x, y, z, w)
      const m = node.transform

      expect(m.m11).to.within(cosW - epsilon, cosW + epsilon)
      expect(m.m12).to.within(-sinW - epsilon, -sinW + epsilon)
      expect(m.m13).to.equal(0)
      expect(m.m14).to.equal(0)
      expect(m.m21).to.within(sinW - epsilon, sinW + epsilon)
      expect(m.m22).to.within(cosW - epsilon, cosW + epsilon)
      expect(m.m23).to.equal(0)
      expect(m.m24).to.equal(0)
      expect(m.m31).to.equal(0)
      expect(m.m32).to.equal(0)
      expect(m.m33).to.equal(1)
      expect(m.m34).to.equal(0)
      expect(m.m41).to.equal(0)
      expect(m.m42).to.equal(0)
      expect(m.m43).to.equal(0)
      expect(m.m44).to.equal(1)
    })
  })

  /** @test {SCNNode#scale} */
  describe('scale', () => {
    it('should change transform matrix correctly', () => {
      const node = new SCNNode()
      const x = 2
      const y = 3
      const z = 4
      node.scale = new SCNVector3(x, y, z)
      const m = node.transform

      expect(m.m11).to.equal(x)
      expect(m.m12).to.equal(0)
      expect(m.m13).to.equal(0)
      expect(m.m14).to.equal(0)
      expect(m.m21).to.equal(0)
      expect(m.m22).to.equal(y)
      expect(m.m23).to.equal(0)
      expect(m.m24).to.equal(0)
      expect(m.m31).to.equal(0)
      expect(m.m32).to.equal(0)
      expect(m.m33).to.equal(z)
      expect(m.m34).to.equal(0)
      expect(m.m41).to.equal(0)
      expect(m.m42).to.equal(0)
      expect(m.m43).to.equal(0)
      expect(m.m44).to.equal(1)
    })
  })
})

