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

    it('should be able to rotate around z-axis', () => {
      const x = 0
      const y = 0
      const z = 123
      const w = Math.PI / 6.0
      const m = SCNMatrix4.matrixWithRotation(x, y, z, w)
      const cosW = Math.cos(w)
      const sinW = Math.sin(w)

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
})
