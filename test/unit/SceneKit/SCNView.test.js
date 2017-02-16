import SCNView from '../../../src/js/SceneKit/SCNView'
import chai from '../../../node_modules/chai/chai'
import sinon from '../../../node_modules/sinon'
import sinon_chai from '../../../node_modules/sinon-chai'
import mocha_sinon from '../../../node_modules/mocha-sinon'
import UnitTest from '../UnitTest'

const expect = chai.expect
const server = sinon.fakeServer.create()

describe('SCNView class', () => {

  UnitTest.classFunctionsDefined(SCNView, [
  ])

  UnitTest.functionsDefined(SCNView, [
    "stop",
    "pause",
    "play",
    "snapshot"
  ])

  UnitTest.classPropertiesDefined(SCNView, [
  ])

  UnitTest.propertiesDefined(SCNView, [
    "showsStatistics",
    "pointOfView",
    "loops",
    "isPlaying",
    "delegate",
    "currentTime",
    "antialiasingMode",
    "preferredFramesPerSecond",
    "allowsCameraControl",
    "backgroundColor",
    "scene"
  ])
})

