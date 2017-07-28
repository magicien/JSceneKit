'use strict'

import SCNVector3 from '../../../src/js/SceneKit/SCNVector3'
import chai from '../../../node_modules/chai/chai'
import UnitTest from '../UnitTest'

const expect = chai.expect

const epsilon = 0.0001

/** @test {SCNVector3} */
describe('SCNVector3 class', () => {
  UnitTest.classFunctionsDefined(SCNVector3, [
  ])

  UnitTest.functionsDefined(SCNVector3, [
  ])

  UnitTest.classPropertiesDefined(SCNVector3, [
  ])

  UnitTest.propertiesDefined(SCNVector3, [
  ])

  /** @test {SCNVector3#eulerAnglesToQuat} */
  describe('eulerAnglesToQuat', () => {
    it('should work', () => {
      const euler = new SCNVector3(0, 0, 0)
      const quat = euler.eulerAnglesToQuat()
      const expectX = 0
      const expectY = 0
      const expectZ = 0
      const expectW = 1

      expect(quat.x).to.within(expectX - epsilon, expectX + epsilon)
      expect(quat.y).to.within(expectY - epsilon, expectY + epsilon)
      expect(quat.z).to.within(expectZ - epsilon, expectZ + epsilon)
      expect(quat.w).to.within(expectW - epsilon, expectW + epsilon)
    })

    it('should convert y-axis rotation to quaternion', () => {
      const euler = new SCNVector3(0, 0.2, 0)
      const quat = euler.eulerAnglesToQuat()
      const expectX = 0
      const expectY = 0.0998333
      const expectZ = 0
      const expectW = 0.995004

      expect(quat.x).to.within(expectX - epsilon, expectX + epsilon)
      expect(quat.y).to.within(expectY - epsilon, expectY + epsilon)
      expect(quat.z).to.within(expectZ - epsilon, expectZ + epsilon)
      expect(quat.w).to.within(expectW - epsilon, expectW + epsilon)
    })

    it('should convert minus y-axis rotation to quaternion', () => {
      const euler = new SCNVector3(0, -2.1, 0)
      const quat = euler.eulerAnglesToQuat()
      const expectX = 0
      const expectY = -0.867423
      const expectZ = 0
      const expectW = 0.497571

      expect(quat.x).to.within(expectX - epsilon, expectX + epsilon)
      expect(quat.y).to.within(expectY - epsilon, expectY + epsilon)
      expect(quat.z).to.within(expectZ - epsilon, expectZ + epsilon)
      expect(quat.w).to.within(expectW - epsilon, expectW + epsilon)
    })
  })

  /** @test {SCNVector3#eulerAnglesToRotation} */
  describe('eulerAnglesToRotation', () => {
    it('should convert x-axis rotation', () => {
      const euler = new SCNVector3(1.5, 0, 0)
      const quat = euler.eulerAnglesToRotation()
      const expectX = 1
      const expectY = 0
      const expectZ = 0
      const expectW = 1.5

      expect(quat.x).to.within(expectX - epsilon, expectX + epsilon)
      expect(quat.y).to.within(expectY - epsilon, expectY + epsilon)
      expect(quat.z).to.within(expectZ - epsilon, expectZ + epsilon)
      expect(quat.w).to.within(expectW - epsilon, expectW + epsilon)
    })

    it('should convert y-axis rotation', () => {
      const euler = new SCNVector3(0, 1.7, 0)
      const quat = euler.eulerAnglesToRotation()
      const expectX = 0
      const expectY = 1
      const expectZ = 0
      const expectW = 1.7

      expect(quat.x).to.within(expectX - epsilon, expectX + epsilon)
      expect(quat.y).to.within(expectY - epsilon, expectY + epsilon)
      expect(quat.z).to.within(expectZ - epsilon, expectZ + epsilon)
      expect(quat.w).to.within(expectW - epsilon, expectW + epsilon)
    })

    it('should convert z-axis rotation', () => {
      const euler = new SCNVector3(0, 0, 1.9)
      const quat = euler.eulerAnglesToRotation()
      const expectX = 0
      const expectY = 0
      const expectZ = 1
      const expectW = 1.9

      expect(quat.x).to.within(expectX - epsilon, expectX + epsilon)
      expect(quat.y).to.within(expectY - epsilon, expectY + epsilon)
      expect(quat.z).to.within(expectZ - epsilon, expectZ + epsilon)
      expect(quat.w).to.within(expectW - epsilon, expectW + epsilon)
    })

    it('should convert minus x-axis rotation', () => {
      const euler = new SCNVector3(-0.5, 0, 0)
      const quat = euler.eulerAnglesToRotation()
      const expectX = -1
      const expectY = 0
      const expectZ = 0
      const expectW = 0.5

      expect(quat.x).to.within(expectX - epsilon, expectX + epsilon)
      expect(quat.y).to.within(expectY - epsilon, expectY + epsilon)
      expect(quat.z).to.within(expectZ - epsilon, expectZ + epsilon)
      expect(quat.w).to.within(expectW - epsilon, expectW + epsilon)
    })

    it('should convert minus y-axis rotation', () => {
      const euler = new SCNVector3(0, -2.1, 0)
      const quat = euler.eulerAnglesToRotation()
      const expectX = 0
      const expectY = -1
      const expectZ = 0
      const expectW = 2.1

      expect(quat.x).to.within(expectX - epsilon, expectX + epsilon)
      expect(quat.y).to.within(expectY - epsilon, expectY + epsilon)
      expect(quat.z).to.within(expectZ - epsilon, expectZ + epsilon)
      expect(quat.w).to.within(expectW - epsilon, expectW + epsilon)
    })

    it('should convert minus z-axis rotation', () => {
      const euler = new SCNVector3(0, 0, -0.1)
      const quat = euler.eulerAnglesToRotation()
      const expectX = 0
      const expectY = 0
      const expectZ = -1
      const expectW = 0.1

      expect(quat.x).to.within(expectX - epsilon, expectX + epsilon)
      expect(quat.y).to.within(expectY - epsilon, expectY + epsilon)
      expect(quat.z).to.within(expectZ - epsilon, expectZ + epsilon)
      expect(quat.w).to.within(expectW - epsilon, expectW + epsilon)
    })

    it('should convert zero vector rotation', () => {
      const euler = new SCNVector3(0, 0, 0)
      const quat = euler.eulerAnglesToRotation()
      const expectX = 0
      const expectY = 0
      const expectZ = 0
      const expectW = 0

      expect(quat.x).to.within(expectX - epsilon, expectX + epsilon)
      expect(quat.y).to.within(expectY - epsilon, expectY + epsilon)
      expect(quat.z).to.within(expectZ - epsilon, expectZ + epsilon)
      expect(quat.w).to.within(expectW - epsilon, expectW + epsilon)
    })
  })
})
