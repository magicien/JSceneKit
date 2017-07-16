import SCNPhysicsWorld from '../../../src/js/SceneKit/SCNPhysicsWorld'
import SCNVector3 from '../../../src/js/SceneKit/SCNVector3'
import chai from '../../../node_modules/chai/chai'
import UnitTest from '../UnitTest'

const expect = chai.expect

const epsilon = 0.0001

describe('SCNPhysicsWorld class', () => {

  /*
  UnitTest.classFunctionsDefined(SCNPhysicsWorld, [
  ])

  UnitTest.functionsDefined(SCNPhysicsWorld, [
  ])

  UnitTest.classPropertiesDefined(SCNPhysicsWorld, [
  ])

  UnitTest.propertiesDefined(SCNPhysicsWorld, [
  ])
  */
  const world = new SCNPhysicsWorld()

  describe('constructor function', () => {
  })

  describe('_contactTestBetweenBoxes function', () => {
    // boxA, boxB, options
  })

  describe('_contactTestBetweenSpheres function', () => {
    // sphereA, sphereB, options
  })

  describe('_contactTestBetweenBoxAndSphere function', () => {
    // box, sphere, reverse
  })

  describe('_intersectsBoundingBox function', () => {
    // node1, node2
  })

  describe('_contactTestCapsuleAndConcave function', () => {
    // capNode, conNode
  })

  describe('_capsuleTriangleContact function', () => {
    it('should return null when it does not have a contact point', () => {
      const p0 = new SCNVector3(0, 40, 0)
      const p1 = new SCNVector3(0, 20, 0)
      const capSize = 5
      const v0 = new SCNVector3(0, 0, 0)
      const v1 = new SCNVector3(0, 0, 100)
      const v2 = new SCNVector3(100, 0, 0)
      const result = world._capsuleTriangleContact(p0, p1, capSize, v0, v1, v2)

      expect(result).to.be.null
    })

    it('should return one of the contact points when the capsule and the triangle are parallel', () => {
      const p0 = new SCNVector3(0, 10, 0)
      const p1 = new SCNVector3(0, -10, 0)
      const capSize = 5
      const v0 = new SCNVector3(-100, -100, -3)
      const v1 = new SCNVector3(200, -100, -3)
      const v2 = new SCNVector3(-100, 200, -3)
      const result = world._capsuleTriangleContact(p0, p1, capSize, v0, v1, v2)
      const answer = {
        point: new SCNVector3(0, 10, -3),
        normal: new SCNVector3(0, 0, 1),
        distance: 0,
        penetration: 2
      }
      expect(result.point.x).to.within(answer.point.x - epsilon, answer.point.x + epsilon)
      expect(result.point.y).to.within(answer.point.y - epsilon, answer.point.y + epsilon)
      expect(result.point.z).to.within(answer.point.z - epsilon, answer.point.z + epsilon)
      expect(result.normal.x).to.within(answer.normal.x - epsilon, answer.normal.x + epsilon)
      expect(result.normal.y).to.within(answer.normal.y - epsilon, answer.normal.y + epsilon)
      expect(result.normal.z).to.within(answer.normal.z - epsilon, answer.normal.z + epsilon)
      expect(result.distance).to.within(answer.distance - epsilon, answer.distance + epsilon)
      expect(result.penetration).to.within(answer.penetration - epsilon, answer.penetration + epsilon)
    })

    it('should return the contact point when the capsule intersects the triangle', () => {
      const p0 = new SCNVector3(20, 40, 20)
      const p1 = new SCNVector3(50, -20, 50)
      const capSize = 5
      const v0 = new SCNVector3(0, 0, 0)
      const v1 = new SCNVector3(0, 0, 100)
      const v2 = new SCNVector3(100, 0, 0)
      const result = world._capsuleTriangleContact(p0, p1, capSize, v0, v1, v2)
      const answer = {
        point: new SCNVector3(40, 0, 40), // FIXME: it might not be correct.
        normal: new SCNVector3(0, 1, 0),
        distance: 0,
        penetration: 25
      }
      expect(result.point.x).to.within(answer.point.x - epsilon, answer.point.x + epsilon)
      expect(result.point.y).to.within(answer.point.y - epsilon, answer.point.y + epsilon)
      expect(result.point.z).to.within(answer.point.z - epsilon, answer.point.z + epsilon)
      expect(result.normal.x).to.within(answer.normal.x - epsilon, answer.normal.x + epsilon)
      expect(result.normal.y).to.within(answer.normal.y - epsilon, answer.normal.y + epsilon)
      expect(result.normal.z).to.within(answer.normal.z - epsilon, answer.normal.z + epsilon)
      expect(result.distance).to.within(answer.distance - epsilon, answer.distance + epsilon)
      expect(result.penetration).to.within(answer.penetration - epsilon, answer.penetration + epsilon)
    })

    it('should return the contact point between the cylinder and the triangle', () => {
      const p0 = new SCNVector3(50, 30, 20)
      const p1 = new SCNVector3(50, -20, -30)
      const capSize = 20
      const v0 = new SCNVector3(0, 0, 0)
      const v1 = new SCNVector3(0, 0, 100)
      const v2 = new SCNVector3(100, 0, 0)
      const result = world._capsuleTriangleContact(p0, p1, capSize, v0, v1, v2)
      const answer = {
        point: new SCNVector3(50, 0, 0),
        normal: new SCNVector3(0, 1, 0),
        distance: 0,
        penetration: (capSize - 5 * Math.sqrt(2))
      }
      expect(result.point.x).to.within(answer.point.x - epsilon, answer.point.x + epsilon)
      expect(result.point.y).to.within(answer.point.y - epsilon, answer.point.y + epsilon)
      expect(result.point.z).to.within(answer.point.z - epsilon, answer.point.z + epsilon)
      expect(result.normal.x).to.within(answer.normal.x - epsilon, answer.normal.x + epsilon)
      expect(result.normal.y).to.within(answer.normal.y - epsilon, answer.normal.y + epsilon)
      expect(result.normal.z).to.within(answer.normal.z - epsilon, answer.normal.z + epsilon)
      expect(result.distance).to.within(answer.distance - epsilon, answer.distance + epsilon)
      expect(result.penetration).to.within(answer.penetration - epsilon, answer.penetration + epsilon)
    })

    it('should return the contact point between the sphere and the triangle', () => {
      const p0 = new SCNVector3(50, 30, 50)
      const p1 = new SCNVector3(30, 10, 30)
      const capSize = 20
      const v0 = new SCNVector3(0, 0, 0)
      const v1 = new SCNVector3(0, 0, 100)
      const v2 = new SCNVector3(100, 0, 0)
      const result = world._capsuleTriangleContact(p0, p1, capSize, v0, v1, v2)
      const answer = {
        point: new SCNVector3(30, 0, 30),
        normal: new SCNVector3(0, 1, 0),
        distance: 0,
        penetration: 10
      }
      expect(result.point.x).to.within(answer.point.x - epsilon, answer.point.x + epsilon)
      expect(result.point.y).to.within(answer.point.y - epsilon, answer.point.y + epsilon)
      expect(result.point.z).to.within(answer.point.z - epsilon, answer.point.z + epsilon)
      expect(result.normal.x).to.within(answer.normal.x - epsilon, answer.normal.x + epsilon)
      expect(result.normal.y).to.within(answer.normal.y - epsilon, answer.normal.y + epsilon)
      expect(result.normal.z).to.within(answer.normal.z - epsilon, answer.normal.z + epsilon)
      expect(result.distance).to.within(answer.distance - epsilon, answer.distance + epsilon)
      expect(result.penetration).to.within(answer.penetration - epsilon, answer.penetration + epsilon)
    })
  })

  describe('_segmentTriangleIntersection function', () => {
    it('should return null when it does not have an intersection point', () => {
      const p0 = new SCNVector3(20, 10, 20)
      const p1 = new SCNVector3(40, 30, 40)
      const v0 = new SCNVector3(0, 0, 0)
      const v1 = new SCNVector3(0, 0, 100)
      const v2 = new SCNVector3(100, 0, 0)
      const answer = {
        normal: new SCNVector3(0, 1, 0),
        d0: 10,
        d1: 30,
        intersection: null
      }

      const result = world._segmentTriangleIntersection(p0, p1, v0, v1, v2)

      expect(result.normal.x).to.within(answer.normal.x - epsilon, answer.normal.x + epsilon)
      expect(result.normal.y).to.within(answer.normal.y - epsilon, answer.normal.y + epsilon)
      expect(result.normal.z).to.within(answer.normal.z - epsilon, answer.normal.z + epsilon)
      expect(result.d0).to.within(answer.d0 - epsilon, answer.d0 + epsilon)
      expect(result.d1).to.within(answer.d1 - epsilon, answer.d1 + epsilon)
      expect(result.intersection).to.be.null
    })

    it('should return the intersection point', () => {
      const p0 = new SCNVector3(10, 20, 10)
      const p1 = new SCNVector3(40, -10, 40)
      const v0 = new SCNVector3(0, 0, 0)
      const v1 = new SCNVector3(0, 0, 100)
      const v2 = new SCNVector3(100, 0, 0)
      const answer = {
        normal: new SCNVector3(0, 1, 0),
        d0: 20,
        d1: -10,
        intersection: new SCNVector3(30, 0, 30)
      }

      const result = world._segmentTriangleIntersection(p0, p1, v0, v1, v2)

      expect(result.normal.x).to.within(answer.normal.x - epsilon, answer.normal.x + epsilon)
      expect(result.normal.y).to.within(answer.normal.y - epsilon, answer.normal.y + epsilon)
      expect(result.normal.z).to.within(answer.normal.z - epsilon, answer.normal.z + epsilon)
      expect(result.d0).to.within(answer.d0 - epsilon, answer.d0 + epsilon)
      expect(result.d1).to.within(answer.d1 - epsilon, answer.d1 + epsilon)
      expect(result.intersection.x).to.within(answer.intersection.x - epsilon, answer.intersection.x + epsilon)
      expect(result.intersection.y).to.within(answer.intersection.y - epsilon, answer.intersection.y + epsilon)
      expect(result.intersection.z).to.within(answer.intersection.z - epsilon, answer.intersection.z + epsilon)
    })
  })

  describe('_normalOfTriangle function', () => {
    it('should return the normalized normal vector', () => {
      const p0 = new SCNVector3(0, 0, 0)
      const p1 = new SCNVector3(100, 0, 0)
      const p2 = new SCNVector3(0, 100, 0)
      const n = world._normalOfTriangle(p0, p1, p2)
      const answer = new SCNVector3(0, 0, 1)

      expect(n.x).to.within(answer.x - epsilon, answer.x + epsilon)
      expect(n.y).to.within(answer.y - epsilon, answer.y + epsilon)
      expect(n.z).to.within(answer.z - epsilon, answer.z + epsilon)
    })
  })

  describe('_pointIsInsideTriangle function', () => {
    // p, p0, p1, p2
  })

  describe('_pointLineDist function', () => {
    it('should return the distance', () => {
      const p = new SCNVector3(50, 0, -10)
      const lp = new SCNVector3(0, 0, 0)
      const lv = new SCNVector3(0, 0, 100)
      const result = world._pointLineDist(p, lp, lv)
      const answer = {
        coeff: -0.1,
        nearestPos: new SCNVector3(0, 0, -10),
        distance: 50
      }
      expect(result.coeff).to.within(answer.coeff - epsilon, answer.coeff + epsilon)
      expect(result.nearestPos.x).to.within(answer.nearestPos.x - epsilon, answer.nearestPos.x + epsilon)
      expect(result.nearestPos.y).to.within(answer.nearestPos.y - epsilon, answer.nearestPos.y + epsilon)
      expect(result.nearestPos.z).to.within(answer.nearestPos.z - epsilon, answer.nearestPos.z + epsilon)
      expect(result.distance).to.within(answer.distance - epsilon, answer.distance + epsilon)
    })
  })

  describe('_pointSegmentDist function', () => {
    it('should return the distance: case 1', () => {
      const p = new SCNVector3(0, 0, 0)
      const s0 = new SCNVector3(50, 30, 20)
      const s1 = new SCNVector3(50, -20, -30)
      const result = world._pointSegmentDist(p, s0, s1)
      const answer = {
        coeff: 0.5,
        nearestPos: new SCNVector3(50, 5, -5),
        distance: 5 * Math.sqrt(102)
      }
      expect(result.coeff).to.within(answer.coeff - epsilon, answer.coeff + epsilon)
      expect(result.nearestPos.x).to.within(answer.nearestPos.x - epsilon, answer.nearestPos.x + epsilon)
      expect(result.nearestPos.y).to.within(answer.nearestPos.y - epsilon, answer.nearestPos.y + epsilon)
      expect(result.nearestPos.z).to.within(answer.nearestPos.z - epsilon, answer.nearestPos.z + epsilon)
      expect(result.distance).to.within(answer.distance - epsilon, answer.distance + epsilon)
    })

    it('should return the distance: case 2', () => {
      const p = new SCNVector3(50, 0, -10)
      const s0 = new SCNVector3(0, 0, 0)
      const s1 = new SCNVector3(0, 0, 100)
      const result = world._pointSegmentDist(p, s0, s1)
      const answer = {
        coeff: -0.1,
        nearestPos: new SCNVector3(0, 0, 0),
        distance: 10 * Math.sqrt(26)
      }
      expect(result.coeff).to.within(answer.coeff - epsilon, answer.coeff + epsilon)
      expect(result.nearestPos.x).to.within(answer.nearestPos.x - epsilon, answer.nearestPos.x + epsilon)
      expect(result.nearestPos.y).to.within(answer.nearestPos.y - epsilon, answer.nearestPos.y + epsilon)
      expect(result.nearestPos.z).to.within(answer.nearestPos.z - epsilon, answer.nearestPos.z + epsilon)
      expect(result.distance).to.within(answer.distance - epsilon, answer.distance + epsilon)
    })

  })

  describe('_lineLineDist function', () => {
    it('should return one of the nearest points and distance when the lines are parallel: case 1', () => {
      const a0 = new SCNVector3(-30, -80, -70)
      const a1 = new SCNVector3(170, 120, 130)
      const b0 = new SCNVector3(-10, 20, -10)
      const b1 = new SCNVector3(10, 40, 10)

      const va = a1.sub(a0)
      const vb = b1.sub(b0)

      const dist = world._lineLineDist(a0, va, b0, vb)
      const answer = {
        coeff0: 0.0,
        nearestPos0: a0,
        coeff1: -3.0,
        nearestPos1: new SCNVector3(-70, -40, -70),
        distance: 40 * Math.sqrt(2)
      }
      expect(dist.coeff0).to.within(answer.coeff0 - epsilon, answer.coeff0 + epsilon)
      expect(dist.nearestPos0.x).to.within(answer.nearestPos0.x - epsilon, answer.nearestPos0.x + epsilon)
      expect(dist.nearestPos0.y).to.within(answer.nearestPos0.y - epsilon, answer.nearestPos0.y + epsilon)
      expect(dist.nearestPos0.z).to.within(answer.nearestPos0.z - epsilon, answer.nearestPos0.z + epsilon)
      expect(dist.coeff1).to.within(answer.coeff1 - epsilon, answer.coeff1 + epsilon)
      expect(dist.nearestPos1.x).to.within(answer.nearestPos1.x - epsilon, answer.nearestPos1.x + epsilon)
      expect(dist.nearestPos1.y).to.within(answer.nearestPos1.y - epsilon, answer.nearestPos1.y + epsilon)
      expect(dist.nearestPos1.z).to.within(answer.nearestPos1.z - epsilon, answer.nearestPos1.z + epsilon)
      expect(dist.distance).to.within(answer.distance - epsilon, answer.distance + epsilon)
    })

    it('should return one of the nearest points and distance when the lines are parallel: case 2', () => {
      const a0 = new SCNVector3(-30, -80, -70)
      const a1 = new SCNVector3(170, 120, 130)
      const b0 = new SCNVector3(-10, 20, -10)
      const b1 = new SCNVector3(10, 40, 10)

      const va = a1.sub(a0)
      const vb = b1.sub(b0)

      const dist = world._lineLineDist(b0, vb, a0, va)
      const answer = {
        coeff0: 0.0,
        nearestPos0: b0,
        coeff1: 0.3,
        nearestPos1: new SCNVector3(30, -20, -10),
        distance: 40 * Math.sqrt(2)
      }
      expect(dist.coeff0).to.within(answer.coeff0 - epsilon, answer.coeff0 + epsilon)
      expect(dist.nearestPos0.x).to.within(answer.nearestPos0.x - epsilon, answer.nearestPos0.x + epsilon)
      expect(dist.nearestPos0.y).to.within(answer.nearestPos0.y - epsilon, answer.nearestPos0.y + epsilon)
      expect(dist.nearestPos0.z).to.within(answer.nearestPos0.z - epsilon, answer.nearestPos0.z + epsilon)
      expect(dist.coeff1).to.within(answer.coeff1 - epsilon, answer.coeff1 + epsilon)
      expect(dist.nearestPos1.x).to.within(answer.nearestPos1.x - epsilon, answer.nearestPos1.x + epsilon)
      expect(dist.nearestPos1.y).to.within(answer.nearestPos1.y - epsilon, answer.nearestPos1.y + epsilon)
      expect(dist.nearestPos1.z).to.within(answer.nearestPos1.z - epsilon, answer.nearestPos1.z + epsilon)
      expect(dist.distance).to.within(answer.distance - epsilon, answer.distance + epsilon)
    })

    it('should return the nearest points and distance: case 1', () => {
      const a0 = new SCNVector3(0, 0, 0)
      const a1 = new SCNVector3(1, 0, 0)
      const b0 = new SCNVector3(2, 4, 1)
      const b1 = new SCNVector3(3, 4, 2)

      const va = a1.sub(a0)
      const vb = b1.sub(b0)

      const dist = world._lineLineDist(a0, va, b0, vb)
      const answer = {
        coeff0: 1.0,
        nearestPos0: a1,
        coeff1: -1.0,
        nearestPos1: new SCNVector3(1, 4, 0),
        distance: 4.0
      }
      expect(dist.coeff0).to.within(answer.coeff0 - epsilon, answer.coeff0 + epsilon)
      expect(dist.nearestPos0.x).to.within(answer.nearestPos0.x - epsilon, answer.nearestPos0.x + epsilon)
      expect(dist.nearestPos0.y).to.within(answer.nearestPos0.y - epsilon, answer.nearestPos0.y + epsilon)
      expect(dist.nearestPos0.z).to.within(answer.nearestPos0.z - epsilon, answer.nearestPos0.z + epsilon)
      expect(dist.coeff1).to.within(answer.coeff1 - epsilon, answer.coeff1 + epsilon)
      expect(dist.nearestPos1.x).to.within(answer.nearestPos1.x - epsilon, answer.nearestPos1.x + epsilon)
      expect(dist.nearestPos1.y).to.within(answer.nearestPos1.y - epsilon, answer.nearestPos1.y + epsilon)
      expect(dist.nearestPos1.z).to.within(answer.nearestPos1.z - epsilon, answer.nearestPos1.z + epsilon)
      expect(dist.distance).to.within(answer.distance - epsilon, answer.distance + epsilon)
    })

    it('should return the nearest points and distance: case 2', () => {
      const a0 = new SCNVector3(50, 30, 20)
      const a1 = new SCNVector3(50, -20, -30)
      const b0 = new SCNVector3(0, 0, 100)
      const b1 = new SCNVector3(100, 0, 0)

      const va = a1.sub(a0)
      const vb = b1.sub(b0)

      const dist = world._lineLineDist(a0, va, b0, vb)
      const answer = {
        coeff0: 0.2,
        nearestPos0: new SCNVector3(50, 20, 10),
        coeff1: 0.7,
        nearestPos1: new SCNVector3(70, 0, 30),
        distance: 20 * Math.sqrt(3)
      }
      expect(dist.coeff0).to.within(answer.coeff0 - epsilon, answer.coeff0 + epsilon)
      expect(dist.nearestPos0.x).to.within(answer.nearestPos0.x - epsilon, answer.nearestPos0.x + epsilon)
      expect(dist.nearestPos0.y).to.within(answer.nearestPos0.y - epsilon, answer.nearestPos0.y + epsilon)
      expect(dist.nearestPos0.z).to.within(answer.nearestPos0.z - epsilon, answer.nearestPos0.z + epsilon)
      expect(dist.coeff1).to.within(answer.coeff1 - epsilon, answer.coeff1 + epsilon)
      expect(dist.nearestPos1.x).to.within(answer.nearestPos1.x - epsilon, answer.nearestPos1.x + epsilon)
      expect(dist.nearestPos1.y).to.within(answer.nearestPos1.y - epsilon, answer.nearestPos1.y + epsilon)
      expect(dist.nearestPos1.z).to.within(answer.nearestPos1.z - epsilon, answer.nearestPos1.z + epsilon)
      expect(dist.distance).to.within(answer.distance - epsilon, answer.distance + epsilon)
    })

    it('should return the nearest points and distance: case 2', () => {
      const a0 = new SCNVector3(50, 30, 20)
      const a1 = new SCNVector3(50, -20, -30)
      const b0 = new SCNVector3(0, 0, 0)
      const b1 = new SCNVector3(0, 0, 100)

      const va = a1.sub(a0)
      const vb = b1.sub(b0)

      const dist = world._lineLineDist(a0, va, b0, vb)
      const answer = {
        coeff0: 0.6,
        nearestPos0: new SCNVector3(50, 0, -10),
        coeff1: -0.1,
        nearestPos1: new SCNVector3(0, 0, -10),
        distance: 50
      }
      expect(dist.coeff0).to.within(answer.coeff0 - epsilon, answer.coeff0 + epsilon)
      expect(dist.nearestPos0.x).to.within(answer.nearestPos0.x - epsilon, answer.nearestPos0.x + epsilon)
      expect(dist.nearestPos0.y).to.within(answer.nearestPos0.y - epsilon, answer.nearestPos0.y + epsilon)
      expect(dist.nearestPos0.z).to.within(answer.nearestPos0.z - epsilon, answer.nearestPos0.z + epsilon)
      expect(dist.coeff1).to.within(answer.coeff1 - epsilon, answer.coeff1 + epsilon)
      expect(dist.nearestPos1.x).to.within(answer.nearestPos1.x - epsilon, answer.nearestPos1.x + epsilon)
      expect(dist.nearestPos1.y).to.within(answer.nearestPos1.y - epsilon, answer.nearestPos1.y + epsilon)
      expect(dist.nearestPos1.z).to.within(answer.nearestPos1.z - epsilon, answer.nearestPos1.z + epsilon)
      expect(dist.distance).to.within(answer.distance - epsilon, answer.distance + epsilon)
    })

    it('should return the intersection point when the lines are cross', () => {
      const a0 = new SCNVector3(-1, 4, 0)
      const a1 = new SCNVector3(0, 4, 0)
      const b0 = new SCNVector3(2, 4, 1)
      const b1 = new SCNVector3(3, 4, 2)

      const va = a1.sub(a0)
      const vb = b1.sub(b0)

      const dist = world._lineLineDist(a0, va, b0, vb)
      const answer = {
        coeff0: 2.0,
        nearestPos0: new SCNVector3(1, 4, 0),
        coeff1: -1.0,
        nearestPos1: new SCNVector3(1, 4, 0),
        distance: 0.0
      }
      expect(dist.coeff0).to.within(answer.coeff0 - epsilon, answer.coeff0 + epsilon)
      expect(dist.nearestPos0.x).to.within(answer.nearestPos0.x - epsilon, answer.nearestPos0.x + epsilon)
      expect(dist.nearestPos0.y).to.within(answer.nearestPos0.y - epsilon, answer.nearestPos0.y + epsilon)
      expect(dist.nearestPos0.z).to.within(answer.nearestPos0.z - epsilon, answer.nearestPos0.z + epsilon)
      expect(dist.coeff1).to.within(answer.coeff1 - epsilon, answer.coeff1 + epsilon)
      expect(dist.nearestPos1.x).to.within(answer.nearestPos1.x - epsilon, answer.nearestPos1.x + epsilon)
      expect(dist.nearestPos1.y).to.within(answer.nearestPos1.y - epsilon, answer.nearestPos1.y + epsilon)
      expect(dist.nearestPos1.z).to.within(answer.nearestPos1.z - epsilon, answer.nearestPos1.z + epsilon)
      expect(dist.distance).to.within(answer.distance - epsilon, answer.distance + epsilon)
    })
  })

  describe('_isParallel function', () => {
    it('should return true when the lines are parallel', () => {
      let v0 = new SCNVector3(1, 0, 0)
      let v1 = new SCNVector3(-1, 0, 0)

      let isParallel = world._isParallel(v0, v0)
      expect(isParallel, 'the same x vectors').to.be.true

      isParallel = world._isParallel(v0, v1)
      expect(isParallel, 'the opposite x vectors').to.be.true

      v0 = new SCNVector3(0, 1, 0)
      v1 = new SCNVector3(0, -1, 0)

      isParallel = world._isParallel(v0, v0)
      expect(isParallel, 'the same y vectors').to.be.true

      isParallel = world._isParallel(v0, v1)
      expect(isParallel, 'the opposite y vectors').to.be.true
      
      v0 = new SCNVector3(0, 0, 1)
      v1 = new SCNVector3(0, 0, -1)

      isParallel = world._isParallel(v0, v0)
      expect(isParallel, 'the same z vectors').to.be.true

      isParallel = world._isParallel(v0, v1)
      expect(isParallel, 'the opposite z vectors').to.be.true

      v0 = new SCNVector3(3.1, -4.1, 5.9)
      v1 = v0.mul(-1)

      isParallel = world._isParallel(v0, v0)
      expect(isParallel, 'the same vectors').to.be.true

      isParallel = world._isParallel(v0, v1)
      expect(isParallel, 'the opposite vectors').to.be.true

      v1 = v0.mul(1.5)

      isParallel = world._isParallel(v0, v1)
      expect(isParallel, 'the different size vectors').to.be.true
    })

    it('should return false when the lines are not parallel', () => {
      let v0 = new SCNVector3(0, -50, -50)
      let v1 = new SCNVector3(0, 0, 100)

      let isParallel = world._isParallel(v0, v1)
      expect(isParallel).to.be.false
    })
  })

  describe('_clamp function', () => {
    it('should return the original value when it is between 0 and 1', () => {
      expect(world._clamp(0)).to.equal(0)
      expect(world._clamp(1)).to.equal(1)
      expect(world._clamp(0.6)).to.equal(0.6)
    })

    it('should return 1 when it is bigger then 1', () => {
      expect(world._clamp(1.01)).to.equal(1)
      expect(world._clamp(2.5)).to.equal(1)
    })

    it('should return 0 when it is smaller than 0', () => {
      expect(world._clamp(-0.01)).to.equal(0)
      expect(world._clamp(-2.5)).to.equal(0)
    })
  })

  describe('_segmentSegmentDist function', () => {
    it('should return one of the nearest points when the lines are parallel', () => {
      const s00 = new SCNVector3(-30, -80, -70)
      const s01 = new SCNVector3(170, 120, 130)
      const s10 = new SCNVector3(-10, 20, -10)
      const s11 = new SCNVector3(10, 40, 10)
      const result = world._segmentSegmentDist(s00, s01, s10, s11)
      const answer = {
        coeff0: 0.3,
        nearestPos0: new SCNVector3(30, -20, -10),
        coeff1: 0,
        nearestPos1: s10,
        distance: 40 * Math.sqrt(2)
      }
      expect(result.coeff0).to.within(answer.coeff0 - epsilon, answer.coeff0 + epsilon)
      expect(result.nearestPos0.x).to.within(answer.nearestPos0.x - epsilon, answer.nearestPos0.x + epsilon)
      expect(result.nearestPos0.y).to.within(answer.nearestPos0.y - epsilon, answer.nearestPos0.y + epsilon)
      expect(result.nearestPos0.z).to.within(answer.nearestPos0.z - epsilon, answer.nearestPos0.z + epsilon)
      expect(result.coeff1).to.within(answer.coeff1 - epsilon, answer.coeff1 + epsilon)
      expect(result.nearestPos1.x).to.within(answer.nearestPos1.x - epsilon, answer.nearestPos1.x + epsilon)
      expect(result.nearestPos1.y).to.within(answer.nearestPos1.y - epsilon, answer.nearestPos1.y + epsilon)
      expect(result.nearestPos1.z).to.within(answer.nearestPos1.z - epsilon, answer.nearestPos1.z + epsilon)
      expect(result.distance).to.within(answer.distance - epsilon, answer.distance + epsilon)
    })

    it('should return 0 when the lines cross', () => {
      const s00 = new SCNVector3(-10, -30, 20)
      const s01 = new SCNVector3(10, 30, -20)
      const s10 = new SCNVector3(20, -50, 10)
      const s11 = new SCNVector3(-20, 50, -10)
      const result = world._segmentSegmentDist(s00, s01, s10, s11)
      const answer = {
        coeff0: 0.5,
        nearestPos0: new SCNVector3(0, 0, 0),
        coeff1: 0.5,
        nearestPos1: new SCNVector3(0, 0, 0),
        distance: 0
      }
      expect(result.coeff0).to.within(answer.coeff0 - epsilon, answer.coeff0 + epsilon)
      expect(result.nearestPos0.x).to.within(answer.nearestPos0.x - epsilon, answer.nearestPos0.x + epsilon)
      expect(result.nearestPos0.y).to.within(answer.nearestPos0.y - epsilon, answer.nearestPos0.y + epsilon)
      expect(result.nearestPos0.z).to.within(answer.nearestPos0.z - epsilon, answer.nearestPos0.z + epsilon)
      expect(result.coeff1).to.within(answer.coeff1 - epsilon, answer.coeff1 + epsilon)
      expect(result.nearestPos1.x).to.within(answer.nearestPos1.x - epsilon, answer.nearestPos1.x + epsilon)
      expect(result.nearestPos1.y).to.within(answer.nearestPos1.y - epsilon, answer.nearestPos1.y + epsilon)
      expect(result.nearestPos1.z).to.within(answer.nearestPos1.z - epsilon, answer.nearestPos1.z + epsilon)
      expect(result.distance).to.within(answer.distance - epsilon, answer.distance + epsilon)
    })

    it('should return the nearestPoint', () => {
      const s00 = new SCNVector3(-20, 0, 20)
      const s01 = new SCNVector3(20, 0, -20)
      const s10 = new SCNVector3(40, 10, 80)
      const s11 = new SCNVector3(-10, 10, -20)
      const result = world._segmentSegmentDist(s00, s01, s10, s11)
      const answer = {
        coeff0: 0.5,
        nearestPos0: new SCNVector3(0, 0, 0),
        coeff1: 0.8,
        nearestPos1: new SCNVector3(0, 10, 0),
        distance: 10
      }
      expect(result.coeff0).to.within(answer.coeff0 - epsilon, answer.coeff0 + epsilon)
      expect(result.nearestPos0.x).to.within(answer.nearestPos0.x - epsilon, answer.nearestPos0.x + epsilon)
      expect(result.nearestPos0.y).to.within(answer.nearestPos0.y - epsilon, answer.nearestPos0.y + epsilon)
      expect(result.nearestPos0.z).to.within(answer.nearestPos0.z - epsilon, answer.nearestPos0.z + epsilon)
      expect(result.coeff1).to.within(answer.coeff1 - epsilon, answer.coeff1 + epsilon)
      expect(result.nearestPos1.x).to.within(answer.nearestPos1.x - epsilon, answer.nearestPos1.x + epsilon)
      expect(result.nearestPos1.y).to.within(answer.nearestPos1.y - epsilon, answer.nearestPos1.y + epsilon)
      expect(result.nearestPos1.z).to.within(answer.nearestPos1.z - epsilon, answer.nearestPos1.z + epsilon)
      expect(result.distance).to.within(answer.distance - epsilon, answer.distance + epsilon)
    })

    it('should return the nearestPoint: case 2.1', () => {
      const p0 = new SCNVector3(50, 30, 20)
      const p1 = new SCNVector3(50, -20, -30)
      const v0 = new SCNVector3(0, 0, 0)
      const v1 = new SCNVector3(0, 0, 100)
      const result = world._segmentSegmentDist(p0, p1, v0, v1)
      const answer = {
        coeff0: 0.5,
        nearestPos0: new SCNVector3(50, 5, -5),
        coeff1: 0,
        nearestPos1: new SCNVector3(0, 0, 0),
        distance: (5 * Math.sqrt(102))
      }
      expect(result.coeff0).to.within(answer.coeff0 - epsilon, answer.coeff0 + epsilon)
      expect(result.nearestPos0.x).to.within(answer.nearestPos0.x - epsilon, answer.nearestPos0.x + epsilon)
      expect(result.nearestPos0.y).to.within(answer.nearestPos0.y - epsilon, answer.nearestPos0.y + epsilon)
      expect(result.nearestPos0.z).to.within(answer.nearestPos0.z - epsilon, answer.nearestPos0.z + epsilon)
      expect(result.coeff1).to.within(answer.coeff1 - epsilon, answer.coeff1 + epsilon)
      expect(result.nearestPos1.x).to.within(answer.nearestPos1.x - epsilon, answer.nearestPos1.x + epsilon)
      expect(result.nearestPos1.y).to.within(answer.nearestPos1.y - epsilon, answer.nearestPos1.y + epsilon)
      expect(result.nearestPos1.z).to.within(answer.nearestPos1.z - epsilon, answer.nearestPos1.z + epsilon)
      expect(result.distance).to.within(answer.distance - epsilon, answer.distance + epsilon)
    })

    it('should return the nearestPoint: case 2.2', () => {
      const p0 = new SCNVector3(50, 30, 20)
      const p1 = new SCNVector3(50, -20, -30)
      const v1 = new SCNVector3(0, 0, 100)
      const v2 = new SCNVector3(100, 0, 0)
      const result = world._segmentSegmentDist(p0, p1, v1, v2)
      const answer = {
        coeff0: 0.2,
        nearestPos0: new SCNVector3(50, 20, 10),
        coeff1: 0.7,
        nearestPos1: new SCNVector3(70, 0, 30),
        distance: (20 * Math.sqrt(3))
      }
      expect(result.coeff0).to.within(answer.coeff0 - epsilon, answer.coeff0 + epsilon)
      expect(result.nearestPos0.x).to.within(answer.nearestPos0.x - epsilon, answer.nearestPos0.x + epsilon)
      expect(result.nearestPos0.y).to.within(answer.nearestPos0.y - epsilon, answer.nearestPos0.y + epsilon)
      expect(result.nearestPos0.z).to.within(answer.nearestPos0.z - epsilon, answer.nearestPos0.z + epsilon)
      expect(result.coeff1).to.within(answer.coeff1 - epsilon, answer.coeff1 + epsilon)
      expect(result.nearestPos1.x).to.within(answer.nearestPos1.x - epsilon, answer.nearestPos1.x + epsilon)
      expect(result.nearestPos1.y).to.within(answer.nearestPos1.y - epsilon, answer.nearestPos1.y + epsilon)
      expect(result.nearestPos1.z).to.within(answer.nearestPos1.z - epsilon, answer.nearestPos1.z + epsilon)
      expect(result.distance).to.within(answer.distance - epsilon, answer.distance + epsilon)
    })

    it('should return the nearestPoint: case 2.3', () => {
      const p0 = new SCNVector3(50, 30, 20)
      const p1 = new SCNVector3(50, -20, -30)
      const v2 = new SCNVector3(100, 0, 0)
      const v0 = new SCNVector3(0, 0, 0)
      const result = world._segmentSegmentDist(p0, p1, v2, v0)
      const answer = {
        coeff0: 0.5,
        nearestPos0: new SCNVector3(50, 5, -5),
        coeff1: 0.5,
        nearestPos1: new SCNVector3(50, 0, 0),
        distance: (5 * Math.sqrt(2))
      }
      expect(result.coeff0).to.within(answer.coeff0 - epsilon, answer.coeff0 + epsilon)
      expect(result.nearestPos0.x).to.within(answer.nearestPos0.x - epsilon, answer.nearestPos0.x + epsilon)
      expect(result.nearestPos0.y).to.within(answer.nearestPos0.y - epsilon, answer.nearestPos0.y + epsilon)
      expect(result.nearestPos0.z).to.within(answer.nearestPos0.z - epsilon, answer.nearestPos0.z + epsilon)
      expect(result.coeff1).to.within(answer.coeff1 - epsilon, answer.coeff1 + epsilon)
      expect(result.nearestPos1.x).to.within(answer.nearestPos1.x - epsilon, answer.nearestPos1.x + epsilon)
      expect(result.nearestPos1.y).to.within(answer.nearestPos1.y - epsilon, answer.nearestPos1.y + epsilon)
      expect(result.nearestPos1.z).to.within(answer.nearestPos1.z - epsilon, answer.nearestPos1.z + epsilon)
      expect(result.distance).to.within(answer.distance - epsilon, answer.distance + epsilon)
    })
  })
})

