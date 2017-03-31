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

  /** @test {SCNNode#addChildNode} */
  describe('addChildNode', () => {
    it('should work', () => {
    })
  })

  /** @test {SCNNode#insertChildNodeAt} */
  describe('insertChildNodeAt', () => {
  })

  /** @test {SCNNode#removeFromParentNode} */
  describe('removeFromParentNode', () => {
    it('should work', () => {
      const parentNode = new SCNNode()
      const childNode1 = new SCNNode()
      const childNode2 = new SCNNode()
      const childNode3 = new SCNNode()

      parentNode.addChildNode(childNode1)
      parentNode.addChildNode(childNode2)
      parentNode.addChildNode(childNode3)

      expect(childNode2._parent).to.equal(parentNode)
      expect(parentNode._childNodes.length).to.equal(3)
      expect(parentNode._childNodes.indexOf(childNode2)).not.to.equal(-1)

      childNode2.removeFromParentNode()

      expect(childNode2._parent).to.be.null
      expect(parentNode._childNodes.length).to.equal(2)
      expect(parentNode._childNodes.indexOf(childNode2)).to.equal(-1)
    })
  })

  /** @test {SCNNode#transform} */
  describe('transform', () => {
    it('should be instanceof SCNMatrix4', () => {
      const node = new SCNNode()
      expect(node.transform).to.be.instanceof(SCNMatrix4)
    })

    it('should apply position and rotation values', () => {
      const node = new SCNNode()
      node.position = new SCNVector3(1, 2, 3)
      node.rotation = new SCNVector4(4, 5, 6, 7)

      const m11 = 0.805039
      const m12 = 0.513145
      const m13 = -0.297647
      const m14 = 0.0
      const m21 = -0.385302
      const m22 = 0.833804
      const m23 = 0.395365
      const m24 = 0.0
      const m31 = 0.451059
      const m32 = -0.203600
      const m33 = 0.868961
      const m34 = 0.0
      const m41 = 1.0
      const m42 = 2.0
      const m43 = 3.0
      const m44 = 1.0

      const m = node.transform
      expect(m.m11).to.within(m11 - epsilon, m11 + epsilon)
      expect(m.m12).to.within(m12 - epsilon, m12 + epsilon)
      expect(m.m13).to.within(m13 - epsilon, m13 + epsilon)
      expect(m.m14).to.within(m14 - epsilon, m14 + epsilon)
      expect(m.m21).to.within(m21 - epsilon, m21 + epsilon)
      expect(m.m22).to.within(m22 - epsilon, m22 + epsilon)
      expect(m.m23).to.within(m23 - epsilon, m23 + epsilon)
      expect(m.m24).to.within(m24 - epsilon, m24 + epsilon)
      expect(m.m31).to.within(m31 - epsilon, m31 + epsilon)
      expect(m.m32).to.within(m32 - epsilon, m32 + epsilon)
      expect(m.m33).to.within(m33 - epsilon, m33 + epsilon)
      expect(m.m34).to.within(m34 - epsilon, m34 + epsilon)
      expect(m.m41).to.within(m41 - epsilon, m41 + epsilon)
      expect(m.m42).to.within(m42 - epsilon, m42 + epsilon)
      expect(m.m43).to.within(m43 - epsilon, m43 + epsilon)
      expect(m.m44).to.within(m44 - epsilon, m44 + epsilon)
    })

    it('should apply position and scale values', () => {
      const node = new SCNNode()
      node.scale = new SCNVector3(2, 3, 4)
      node.position = new SCNVector3(5, 6, 7)

      const m11 = 2.0
      const m12 = 0.0
      const m13 = 0.0
      const m14 = 0.0
      const m21 = 0.0
      const m22 = 3.0
      const m23 = 0.0
      const m24 = 0.0
      const m31 = 0.0
      const m32 = 0.0
      const m33 = 4.0
      const m34 = 0.0
      const m41 = 5.0
      const m42 = 6.0
      const m43 = 7.0
      const m44 = 1.0

      const m = node.transform
      expect(m.m11).to.within(m11 - epsilon, m11 + epsilon)
      expect(m.m12).to.within(m12 - epsilon, m12 + epsilon)
      expect(m.m13).to.within(m13 - epsilon, m13 + epsilon)
      expect(m.m14).to.within(m14 - epsilon, m14 + epsilon)
      expect(m.m21).to.within(m21 - epsilon, m21 + epsilon)
      expect(m.m22).to.within(m22 - epsilon, m22 + epsilon)
      expect(m.m23).to.within(m23 - epsilon, m23 + epsilon)
      expect(m.m24).to.within(m24 - epsilon, m24 + epsilon)
      expect(m.m31).to.within(m31 - epsilon, m31 + epsilon)
      expect(m.m32).to.within(m32 - epsilon, m32 + epsilon)
      expect(m.m33).to.within(m33 - epsilon, m33 + epsilon)
      expect(m.m34).to.within(m34 - epsilon, m34 + epsilon)
      expect(m.m41).to.within(m41 - epsilon, m41 + epsilon)
      expect(m.m42).to.within(m42 - epsilon, m42 + epsilon)
      expect(m.m43).to.within(m43 - epsilon, m43 + epsilon)
      expect(m.m44).to.within(m44 - epsilon, m44 + epsilon)
    })

    it('should apply rotation and scale values', () => {
      const node = new SCNNode()
      node.scale = new SCNVector3(2, 3, 4)
      node.rotation = new SCNVector4(5, 6, 7, 8)

      const m11 = 0.229682
      const m12 = 1.945461
      const m13 = -0.403025
      const m14 = 0.0
      const m21 = -1.043736
      const m22 = 0.688172
      const m23 = 2.727092
      const m24 = 0.0
      const m31 = 3.721868
      const m32 = -0.137141
      const m33 = 1.459072
      const m34 = 0.0
      const m41 = 0.0
      const m42 = 0.0
      const m43 = 0.0
      const m44 = 1.0

      const m = node.transform
      expect(m.m11).to.within(m11 - epsilon, m11 + epsilon)
      expect(m.m12).to.within(m12 - epsilon, m12 + epsilon)
      expect(m.m13).to.within(m13 - epsilon, m13 + epsilon)
      expect(m.m14).to.within(m14 - epsilon, m14 + epsilon)
      expect(m.m21).to.within(m21 - epsilon, m21 + epsilon)
      expect(m.m22).to.within(m22 - epsilon, m22 + epsilon)
      expect(m.m23).to.within(m23 - epsilon, m23 + epsilon)
      expect(m.m24).to.within(m24 - epsilon, m24 + epsilon)
      expect(m.m31).to.within(m31 - epsilon, m31 + epsilon)
      expect(m.m32).to.within(m32 - epsilon, m32 + epsilon)
      expect(m.m33).to.within(m33 - epsilon, m33 + epsilon)
      expect(m.m34).to.within(m34 - epsilon, m34 + epsilon)
      expect(m.m41).to.within(m41 - epsilon, m41 + epsilon)
      expect(m.m42).to.within(m42 - epsilon, m42 + epsilon)
      expect(m.m43).to.within(m43 - epsilon, m43 + epsilon)
      expect(m.m44).to.within(m44 - epsilon, m44 + epsilon)
    })

    it('should apply position, rotation, scale values', () => {
      const node = new SCNNode()
      node.position = new SCNVector3(1, 2, 3)
      node.rotation = new SCNVector4(4, 5, 6, 7)
      node.scale = new SCNVector3(8, 9, 10)

      const m11 = 6.440315
      const m12 = 4.105160
      const m13 = -2.381176
      const m14 = 0.0
      const m21 = -3.467718
      const m22 = 7.504237
      const m23 = 3.558280
      const m24 = 0.0
      const m31 = 4.510587
      const m32 = -2.036000
      const m33 = 8.689610
      const m34 = 0.0
      const m41 = 1.0
      const m42 = 2.0
      const m43 = 3.0
      const m44 = 1.0

      const m = node.transform
      expect(m.m11).to.within(m11 - epsilon, m11 + epsilon)
      expect(m.m12).to.within(m12 - epsilon, m12 + epsilon)
      expect(m.m13).to.within(m13 - epsilon, m13 + epsilon)
      expect(m.m14).to.within(m14 - epsilon, m14 + epsilon)
      expect(m.m21).to.within(m21 - epsilon, m21 + epsilon)
      expect(m.m22).to.within(m22 - epsilon, m22 + epsilon)
      expect(m.m23).to.within(m23 - epsilon, m23 + epsilon)
      expect(m.m24).to.within(m24 - epsilon, m24 + epsilon)
      expect(m.m31).to.within(m31 - epsilon, m31 + epsilon)
      expect(m.m32).to.within(m32 - epsilon, m32 + epsilon)
      expect(m.m33).to.within(m33 - epsilon, m33 + epsilon)
      expect(m.m34).to.within(m34 - epsilon, m34 + epsilon)
      expect(m.m41).to.within(m41 - epsilon, m41 + epsilon)
      expect(m.m42).to.within(m42 - epsilon, m42 + epsilon)
      expect(m.m43).to.within(m43 - epsilon, m43 + epsilon)
      expect(m.m44).to.within(m44 - epsilon, m44 + epsilon)
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
      expect(m.m14).to.equal(0)
      expect(m.m21).to.equal(0)
      expect(m.m22).to.equal(1)
      expect(m.m23).to.equal(0)
      expect(m.m24).to.equal(0)
      expect(m.m31).to.equal(0)
      expect(m.m32).to.equal(0)
      expect(m.m33).to.equal(1)
      expect(m.m34).to.equal(0)
      expect(m.m41).to.equal(x)
      expect(m.m42).to.equal(y)
      expect(m.m43).to.equal(z)
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
      expect(m.m23).to.within(sinW - epsilon, sinW + epsilon)
      expect(m.m24).to.equal(0)
      expect(m.m31).to.equal(0)
      expect(m.m32).to.within(-sinW - epsilon, -sinW + epsilon)
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
      expect(m.m13).to.within(-sinW - epsilon, -sinW + epsilon)
      expect(m.m14).to.equal(0)
      expect(m.m21).to.equal(0)
      expect(m.m22).to.equal(1)
      expect(m.m23).to.equal(0)
      expect(m.m24).to.equal(0)
      expect(m.m31).to.within(sinW - epsilon, sinW + epsilon)
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
      expect(m.m12).to.within(sinW - epsilon, sinW + epsilon)
      expect(m.m13).to.equal(0)
      expect(m.m14).to.equal(0)
      expect(m.m21).to.within(-sinW - epsilon, -sinW + epsilon)
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
  
  /** @test {SCNNode#transform} */
  describe('eulerAngles', () => {
    it('should change transform matrix correctly', () => {
      const node = new SCNNode()
      node.eulerAngles = new SCNVector3(1, 2, 3)

      const m11 = 0.411982
      const m12 = -0.0587266
      const m13 = -0.909297
      const m14 = 0.0
      const m21 = -0.833738
      const m22 = -0.426918
      const m23 = -0.350175
      const m24 = 0.0
      const m31 = -0.367630
      const m32 = 0.902382
      const m33 = -0.224845
      const m34 = 0.0
      const m41 = 0.0
      const m42 = 0.0
      const m43 = 0.0
      const m44 = 1.0

      const m = node.transform
      expect(m.m11).to.within(m11 - epsilon, m11 + epsilon)
      expect(m.m12).to.within(m12 - epsilon, m12 + epsilon)
      expect(m.m13).to.within(m13 - epsilon, m13 + epsilon)
      expect(m.m14).to.within(m14 - epsilon, m14 + epsilon)
      expect(m.m21).to.within(m21 - epsilon, m21 + epsilon)
      expect(m.m22).to.within(m22 - epsilon, m22 + epsilon)
      expect(m.m23).to.within(m23 - epsilon, m23 + epsilon)
      expect(m.m24).to.within(m24 - epsilon, m24 + epsilon)
      expect(m.m31).to.within(m31 - epsilon, m31 + epsilon)
      expect(m.m32).to.within(m32 - epsilon, m32 + epsilon)
      expect(m.m33).to.within(m33 - epsilon, m33 + epsilon)
      expect(m.m34).to.within(m34 - epsilon, m34 + epsilon)
      expect(m.m41).to.within(m41 - epsilon, m41 + epsilon)
      expect(m.m42).to.within(m42 - epsilon, m42 + epsilon)
      expect(m.m43).to.within(m43 - epsilon, m43 + epsilon)
      expect(m.m44).to.within(m44 - epsilon, m44 + epsilon)
    })

    it('should be calculated from rotation', () => {
      const node = new SCNNode()
      node.rotation = new SCNVector4(1, 2, 3, 4)
      const euler = node.eulerAngles

      const x = 0.890947
      const y = -0.861592
      const z = -2.536290

      expect(euler.x).to.within(x - epsilon, x + epsilon)
      expect(euler.y).to.within(y - epsilon, y + epsilon)
      expect(euler.z).to.within(z - epsilon, z + epsilon)
    })

    it('should be calculated from rotation 2', () => {
      const node = new SCNNode()
      node.rotation = new SCNVector4(4, 3, 2, 1)
      const euler = node.eulerAngles

      const x = 0.873121
      const y = 0.349000
      const z = 0.564491

      expect(euler.x).to.within(x - epsilon, x + epsilon)
      expect(euler.y).to.within(y - epsilon, y + epsilon)
      expect(euler.z).to.within(z - epsilon, z + epsilon)
    })

    it('should be calculated from rotation 3', () => {
      const node = new SCNNode()
      node.rotation = new SCNVector4(0, 1, 0, Math.PI * 0.5)
      const euler = node.eulerAngles

      const x = 0.0
      const y = -1.570796
      const z = 0.0

      expect(euler.x).to.within(x - epsilon, x + epsilon)
      expect(euler.y).to.within(y - epsilon, y + epsilon)
      expect(euler.z).to.within(z - epsilon, z + epsilon)
    })

    it('should return zero vector when rotation is zero', () => {
      const node = new SCNNode()
      node.rotation = new SCNVector4(0, 0, 0, 0)
      const euler = node.eulerAngles

      expect(euler.x).to.equal(0)
      expect(euler.y).to.equal(0)
      expect(euler.z).to.equal(0)
    })


  })

})

