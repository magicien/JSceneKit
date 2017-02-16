'use strict'

import chai from '../../node_modules/chai/chai'
const expect = chai.expect

/**
 * UnitTest class
 */
export default class UnitTest {
  constructor() {
  }

  static classFunctionsDefined(classObj, funcArray) {
    funcArray.forEach((func) => {
      describe(func + ' class function', () => {
        it('should be defined', () => {
          expect(classObj).itself.to.respondTo(func)
        })
      })
    })
  }

  static functionsDefined(classObj, funcArray) {
    funcArray.forEach((func) => {
      describe(func + ' function', () => {
        it('should be defined', () => {
          expect(classObj).to.respondTo(func)
        })
      })
    })
  }

  static classPropertiesDefined(classObj, propertyArray) {
    propertyArray.forEach((prop) => {
      describe(prop + ' class property', () => {
        it('should be defined', () => {
          expect(classObj).itself.to.have.property(prop)
        })
      })
    })
  }

  static propertiesDefined(classObj, propertyArray) {
    let instance = new classObj()

    propertyArray.forEach((prop) => {
      describe(prop + ' property', () => {
        it('should be defined', () => {
          expect(instance).to.have.property(prop)
        })
      })
    })
  }
}
