import SCNPyramid from '../../../src/js/SceneKit/SCNPyramid'
import _Data from './_SCNPyramidData'
import chai from '../../../node_modules/chai/chai'
import UnitTest from '../UnitTest'

const expect = chai.expect

const epsilon = 0.0001

describe('SCNPyramid class', () => {

  /*
  UnitTest.classFunctionsDefined(SCNPyramid, [
  ])

  UnitTest.functionsDefined(SCNPyramid, [
  ])

  UnitTest.classPropertiesDefined(SCNPyramid, [
  ])

  UnitTest.propertiesDefined(SCNPyramid, [
  ])
  */

  describe('constructor function', () => {
    const shape = new SCNPyramid()

    it('should create the proper geometry data', () => {
      const source = shape.geometrySources[0]
      const data = source.data
      const answer = _Data.source

      expect(data.length, 'data length').to.equal(answer.length)

      for(let i=0; i<data.length; i++){
        expect(data[i], `source at ${i}`).to.within(answer[i] - epsilon, answer[i] + epsilon)
      }
    })

    it('should create the proper index data', () => {
      const elements = shape.geometryElements

      expect(elements.length, 'num of elements').to.equal(_Data.elements.length)

      for(let i=0; i<elements.length; i++){
        const data = elements[i].data
        const answer = _Data.elements[i]

        expect(data.length, `element ${i} length`).to.equal(answer.length)

        for(let j=0; j<data.length; j++){
          expect(data[j], `element ${i} index ${j}`).to.equal(answer[j])
        }
      }
    })
  })
})

