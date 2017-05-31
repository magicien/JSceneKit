'use strict'

import SCNMatrix4 from '../../../src/js/SceneKit/SCNMatrix4'
import chai from '../../../node_modules/chai/chai'
import UnitTest from '../UnitTest'

const expect = chai.expect

const epsilon = 0.0001

/** @test {SCNMatrix4} */
describe('SCNMatrix4 class', () => {
  UnitTest.classFunctionsDefined(SCNMatrix4, [
  ])

  UnitTest.functionsDefined(SCNMatrix4, [
  ])

  UnitTest.classPropertiesDefined(SCNMatrix4, [
  ])

  UnitTest.propertiesDefined(SCNMatrix4, [
  ])

  /** @test {SCNMatrix4#matrixWithTranslation} */
  describe('matrixWithTranslation', () => {
    it('should work', () => {
      const x = 2
      const y = 3
      const z = 4
      const m = SCNMatrix4.matrixWithTranslation(x, y, z)

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

  /** @test {SCNMatrix4#matrixWithRotation} */
  describe('matrixWithRotation', () => {
    it('should be able to rotate around x-axis', () => {
      const x = 123
      const y = 0
      const z = 0
      const w = Math.PI / 6.0
      const m = SCNMatrix4.matrixWithRotation(x, y, z, w)
      const cosW = Math.cos(w)
      const sinW = Math.sin(w)

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

    it('should be able to rotate around y-axis', () => {
      const x = 0
      const y = 123
      const z = 0
      const w = Math.PI / 6.0
      const m = SCNMatrix4.matrixWithRotation(x, y, z, w)
      const cosW = Math.cos(w)
      const sinW = Math.sin(w)

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

    it('should be able to rotate around z-axis', () => {
      const x = 0
      const y = 0
      const z = 123
      const w = Math.PI / 6.0
      const m = SCNMatrix4.matrixWithRotation(x, y, z, w)
      const cosW = Math.cos(w)
      const sinW = Math.sin(w)

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

    it('should work', () => {
      const m = SCNMatrix4.matrixWithRotation(1, 2, 3, 4)

      const m11 = -0.535526
      const m12 = -0.370557
      const m13 = 0.758880
      const m14 = 0.0
      const m21 = 0.843027
      const m22 = -0.181174
      const m23 = 0.506440
      const m24 = 0.0
      const m31 = -0.050176
      const m32 = 0.910968
      const m33 = 0.409413
      const m34 = 0.0
      const m41 = 0.0
      const m42 = 0.0
      const m43 = 0.0
      const m44 = 1.0

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

  /** @test {SCNMatrix4#matrixWithScale} */
  describe('matrixWithScale', () => {
    it('should work', () => {
      const x = 2
      const y = 3
      const z = 4
      const m = SCNMatrix4.matrixWithScale(x, y, z)

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

  /** @test {SCNMatrix4#mult} */
  describe('mult', () => {
    it('should work', () => {
      const m1 = new SCNMatrix4(
        3.1, 4.1, 5.9, 2.6,
        5.3, 5.8, 9.7, 9.3,
        2.3, 8.4, 6.2, 6.4,
        3.3, 8.3, 2.7, 9.5
      )
      const m2 = new SCNMatrix4(
        0.2, 8.8, 4.1, 9.7,
        1.6, 9.3, 9.9, 3.7,
        5.1, 0.5, 8.2, 0.9,
        7.4, 9.4, 4.5, 9.2
      )
      const m = m1.mult(m2)

      const m11 = 56.51
      const m12 = 92.8
      const m13 = 113.38
      const m14 = 74.47
      const m21 = 128.63
      const m22 = 192.85
      const m23 = 200.54
      const m24 = 167.16
      const m31 = 92.88
      const m32 = 161.62
      const m33 = 172.23
      const m34 = 117.85
      const m41 = 98.01
      const m42 = 196.88
      const m43 = 160.59
      const m44 = 152.55
        
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

  /** @test {SCNMatrix4#invert} */
  describe('invert', () => {
    it('should work', () => {
      const m1 = new SCNMatrix4(
        3.1, 4.1, 5.9, 2.6,
        5.3, 5.8, 9.7, 9.3,
        2.3, 8.4, 6.2, 6.4,
        3.3, 8.3, 2.7, 9.5
      )
      
      const m = m1.invert()

      const m11 = 0.593166
      const m12 = -0.128179
      const m13 = -0.492307
      const m14 = 0.294800
      const m21 = 0.168511
      const m22 = -0.182421
      const m23 = 0.0953260
      const m24 = 0.0682428
      const m31 = -0.118426
      const m32 = 0.119187
      const m33 = 0.175783
      const m34 = -0.202689
      const m41 = -0.319614
      const m42 = 0.170030
      const m43 = 0.0377682
      const m44 = 0.000842760
   
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

  /** @test {SCNMatrix4#getTranslation} */
  describe('getTranslation', () => {
    it('should calculate translation from transform marix', () => {
      const m1 = new SCNMatrix4(
        3.1, 4.1, 5.9, 2.6,
        5.3, 5.8, 9.7, 9.3,
        2.3, 8.4, 6.2, 6.4,
        3.3, 8.3, 2.7, 9.5
      )
      const m2 = new SCNMatrix4(
        0.2, 8.8, 4.1, 9.7,
        1.6, 9.3, 9.9, 3.7,
        5.1, 0.5, 8.2, 0.9,
        7.4, 9.4, 4.5, 9.2
      )

      const v1 = m1.getTranslation()
      const x1 = 0.347368
      const y1 = 0.873684
      const z1 = 0.284211

      expect(v1.x).to.within(x1 - epsilon, x1 + epsilon)
      expect(v1.y).to.within(y1 - epsilon, y1 + epsilon)
      expect(v1.z).to.within(z1 - epsilon, z1 + epsilon)

      const v2 = m2.getTranslation()
      const x2 = 0.804348
      const y2 = 1.021739
      const z2 = 0.489130

      expect(v2.x).to.within(x2 - epsilon, x2 + epsilon)
      expect(v2.y).to.within(y2 - epsilon, y2 + epsilon)
      expect(v2.z).to.within(z2 - epsilon, z2 + epsilon)
    })
  })

  /** @test {SCNMatrix4#getOrientation} */
  describe('getOrientation', () => {
    it('should calculate orientation from transform marix', () => {
      const m1 = new SCNMatrix4(
        3.1, 4.1, 5.9, 2.6,
        5.3, 5.8, 9.7, 9.3,
        2.3, 8.4, 6.2, 6.4,
        3.3, 8.3, 2.7, 9.5
      )
      const m2 = new SCNMatrix4(
        0.2, 8.8, 4.1, 9.7,
        1.6, 9.3, 9.9, 3.7,
        5.1, 0.5, 8.2, 0.9,
        7.4, 9.4, 4.5, 9.2
      )
      const v1 = m1.getOrientation()
      const x1 = 0.772255
      const y1 = -0.444379
      const z1 = -0.454025
      const w1 = 0.00337381

      expect(v1.x).to.within(x1 - epsilon, x1 + epsilon)
      expect(v1.y).to.within(y1 - epsilon, y1 + epsilon)
      expect(v1.z).to.within(z1 - epsilon, z1 + epsilon)
      expect(v1.w).to.within(w1 - epsilon, w1 + epsilon)

      const v2 = m2.getOrientation()
      const x2 = 0.388553
      const y2 = 0.0608134
      const z2 = 0.456267
      const w2 = 0.798216

      expect(v2.x).to.within(x2 - epsilon, x2 + epsilon)
      expect(v2.y).to.within(y2 - epsilon, y2 + epsilon)
      expect(v2.z).to.within(z2 - epsilon, z2 + epsilon)
      expect(v2.w).to.within(w2 - epsilon, w2 + epsilon)
    })
  })

  /** @test {SCNMatrix4#getRotation} */
  describe('getRotation', () => {
    it('should calculate rotation from transform marix', () => {
      const m1 = new SCNMatrix4(
        3.1, 4.1, 5.9, 2.6,
        5.3, 5.8, 9.7, 9.3,
        2.3, 8.4, 6.2, 6.4,
        3.3, 8.3, 2.7, 9.5
      )
      const m2 = new SCNMatrix4(
        0.2, 8.8, 4.1, 9.7,
        1.6, 9.3, 9.9, 3.7,
        5.1, 0.5, 8.2, 0.9,
        7.4, 9.4, 4.5, 9.2
      )
      const v1 = m1.getRotation()
      const x1 = 0.641957
      const y1 = -0.369401
      const z1 = -0.377420
      const w1 = 3.134845
      
      expect(v1.x).to.within(x1 - epsilon, x1 + epsilon)
      expect(v1.y).to.within(y1 - epsilon, y1 + epsilon)
      expect(v1.z).to.within(z1 - epsilon, z1 + epsilon)
      expect(v1.w).to.within(w1 - epsilon, w1 + epsilon)

      const v2 = m2.getRotation()
      const x2 = 0.349471
      const y2 = 0.0546967
      const z2 = 0.410374
      const w2 = 1.292937
      
      //console.log(`m2.getRotation: ${v2.x}, ${v2.y}, ${v2.z}, ${v2.w}`)
      //expect(v2.x).to.within(x2 - epsilon, x2 + epsilon)
      //expect(v2.y).to.within(y2 - epsilon, y2 + epsilon)
      //expect(v2.z).to.within(z2 - epsilon, z2 + epsilon)
      //expect(v2.w).to.within(w2 - epsilon, w2 + epsilon)
    })
  })

  /** @test {SCNMatrix4#getScale} */
  describe('getScale', () => {
    it('should calculate scale from transform marix', () => {
      const m1 = new SCNMatrix4(
        3.1, 4.1, 5.9, 2.6,
        5.3, 5.8, 9.7, 9.3,
        2.3, 8.4, 6.2, 6.4,
        3.3, 8.3, 2.7, 9.5
      )
      const m2 = new SCNMatrix4(
        0.2, 8.8, 4.1, 9.7,
        1.6, 9.3, 9.9, 3.7,
        5.1, 0.5, 8.2, 0.9,
        7.4, 9.4, 4.5, 9.2
      )
      const v1 = m1.getScale()
      const x1 = -0.823680
      const y1 = -1.313978
      const z1 = -1.125332

      expect(v1.x).to.within(x1 - epsilon, x1 + epsilon)
      expect(v1.y).to.within(y1 - epsilon, y1 + epsilon)
      expect(v1.z).to.within(z1 - epsilon, z1 + epsilon)

      const v2 = m2.getScale()
      const x2 = 1.055468
      const y2 = 1.486629
      const z2 = 1.051037

      expect(v2.x).to.within(x2 - epsilon, x2 + epsilon)
      expect(v2.y).to.within(y2 - epsilon, y2 + epsilon)
      expect(v2.z).to.within(z2 - epsilon, z2 + epsilon)
    })
  })
})
