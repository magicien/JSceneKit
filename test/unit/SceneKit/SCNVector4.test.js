'use strict'

import SCNVector4 from '../../../src/js/SceneKit/SCNVector4'
import chai from '../../../node_modules/chai/chai'
import UnitTest from '../UnitTest'

const expect = chai.expect

const epsilon = 0.0001

/** @test {SCNVector4} */
describe('SCNVector4 class', () => {
  UnitTest.classFunctionsDefined(SCNVector4, [
  ])

  UnitTest.functionsDefined(SCNVector4, [
  ])

  UnitTest.classPropertiesDefined(SCNVector4, [
  ])

  UnitTest.propertiesDefined(SCNVector4, [
  ])

  /** @test {SCNVector4#quatToRotation} */
  describe('quatToRotation', () => {
    it('should work', () => {
      const quat = new SCNVector4(1, 2, 3, 4)
      const rotation = quat.quatToRotation()
      const expectX = 0.267261
      const expectY = 0.534522
      const expectZ = 0.801784
      const expectW = 1.504080

      expect(rotation.x).to.within(expectX - epsilon, expectX + epsilon)
      expect(rotation.y).to.within(expectY - epsilon, expectY + epsilon)
      expect(rotation.z).to.within(expectZ - epsilon, expectZ + epsilon)
      expect(rotation.w).to.within(expectW - epsilon, expectW + epsilon)
    })

    it('should be able to handle a zero vector', () => {
      const quat = new SCNVector4(0, 0, 0, 0)
      const rotation = quat.quatToRotation()
      const expectX = 0
      const expectY = 0
      const expectZ = 0
      const expectW = 3.1415927

      expect(rotation.x).to.within(expectX - epsilon, expectX + epsilon)
      expect(rotation.y).to.within(expectY - epsilon, expectY + epsilon)
      expect(rotation.z).to.within(expectZ - epsilon, expectZ + epsilon)
      expect(rotation.w).to.within(expectW - epsilon, expectW + epsilon)
    })
  })

  /** @test {SCNVector4#rotationToQuat} */
  describe('rotationToQuat', () => {
    it('should work', () => {
      const rotation = new SCNVector4(1, 2, 3, 4)
      const quat = rotation.rotationToQuat()
      const expectX = 0.243020
      const expectY = 0.486040
      const expectZ = 0.729060
      const expectW = -0.416147

      expect(quat.x).to.within(expectX - epsilon, expectX + epsilon)
      expect(quat.y).to.within(expectY - epsilon, expectY + epsilon)
      expect(quat.z).to.within(expectZ - epsilon, expectZ + epsilon)
      expect(quat.w).to.within(expectW - epsilon, expectW + epsilon)
    })

    it('should be able to handle a zero vector', () => {
      const rotation = new SCNVector4(0, 0, 0, 0)
      const quat = rotation.rotationToQuat()
      const expectX = 0
      const expectY = 0
      const expectZ = 0
      const expectW = 1

      expect(quat.x).to.within(expectX - epsilon, expectX + epsilon)
      expect(quat.y).to.within(expectY - epsilon, expectY + epsilon)
      expect(quat.z).to.within(expectZ - epsilon, expectZ + epsilon)
      expect(quat.w).to.within(expectW - epsilon, expectW + epsilon)

    })
  })

})
