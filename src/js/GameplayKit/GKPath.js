'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNVector3 from '../SceneKit/SCNVector3'
import CGPoint from '../CoreGraphics/CGPoint'

/**
 * A polygonal path that can be followed by an agent.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/gameplaykit/gkpath
 */
export default class GKPath extends NSObject {
  /**
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Managing a Path’s Attributes

    /**
     * The radius of the path.
     * @type {number}
     * @see https://developer.apple.com/documentation/gameplaykit/gkpath/1501281-radius
     */
    this.radius = 0

    /**
     * A Boolean value that determines whether the path loops around on itself (that is, the path’s end point connects to its start point).
     * @type {boolean}
     * @see https://developer.apple.com/documentation/gameplaykit/gkpath/1501244-iscyclical
     */
    this.isCyclical = false

    // Inspecting a Path’s Shape

    this._points = []
  }

  // Creating a Path

  /**
   * Initializes a path with the specified array of 2D points.
   * @access public
   * @param {UnsafeMutablePointer<vector_float2>} points - An array of 2D points representing the vertices in the path. The order of points in this array determines the order in which an agent follows the path.
   * @param {number} count - The number of elements in the pointsarray.
   * @param {number} radius - The radius of the path.
   * @param {boolean} cyclical - true if the path’s end point should connect to its start point; otherwise false.
   * @return {GKPath}
   * @desc The radius parameter defines the space occupied by the path—think of this space as the area created by sweeping a circle of the specified radius along the path from vertex to vertex. Agents with path-related goals will attempt to move to or stay within this area.The cyclical parameter determines whether the path loops around on itself. If the path is cyclical, an agent with a follow-path goal will proceed around the path indefinitely. If the path is not cyclical, an agent following the path will stop at the last point in the path.To use the newly created path to constrain an agent’s behavior, create a goal with the init(toStayOn:maxPredictionTime:) or init(toFollow:maxPredictionTime:forward:) method.
   * @see https://developer.apple.com/documentation/gameplaykit/gkpath/1501048-init
   */
  static pathWithPointsCountRadiusCyclical(points, count, radius, cyclical) {
    const path = new GKPath()

    path._points.push(...points.slice(0, count))
    path.radius = radius
    path.isCyclical = cyclical

    return path
  }

  /**
   * Initializes a path with the specified array of 3D points.
   * @access public
   * @param {UnsafeMutablePointer<vector_float3>} points - An array of points representing the vertices in the path. The order of points in this array determines the order in which an agent follows the path.
   * @param {number} count - The number of elements in the pointsarray.
   * @param {number} radius - The radius of the path.
   * @param {boolean} cyclical - true if the path’s end point (the last element of the points array) should connect to its start point (the first element in the points array); otherwise false.
   * @returns {GKPath}
   * @desc The radius parameter defines the space occupied by the path—think of this space as the volume created by sweeping a sphere of the specified radius along the path from vertex to vertex. Agents with path-related goals will attempt to move to or stay within this volume.The cyclical parameter determines whether the path loops around on itself. If the path is cyclical, an agent with a follow-path goal will proceed around the path indefinitely. If the path is not cyclical, an agent following the path will stop at the last point in the path.To use the newly created path to constrain an agent’s behavior, create a goal with the init(toStayOn:maxPredictionTime:) or init(toFollow:maxPredictionTime:forward:) method.
   * @see https://developer.apple.com/documentation/gameplaykit/gkpath/1778297-init
   */
  static pathWithFloat3PointsCountRadiusCyclical(points, count, radius, cyclical) {
    const path = new GKPath()

    path._points.push(...points.slice(0, count))
    path.radius = radius
    path.isCyclical = cyclical

    return path
  }

  /**
   * Initializes a path using the positions of the specified graph nodes.
   * @access public
   * @param {GKGraphNode[]} graphNodes - An array of graph node objects containing 2D points.
   * @param {number} radius - The radius of the path.
   * @returns {GKPath}
   * @desc Use this initializer to turn a list of nodes from a navigation graph (as returned by the GKGraphfindPath(from:to:) method) into a path-following goal for an agent. If the nodes are GKGraphNode2D objects, this initializer creates a 2D path; if the nodes are GKGraphNode3D objects, this initializer creates a 3D path.The radius parameter defines the space occupied by the path—think of this space as the area created by sweeping a circle (or sphere, for 3D paths) of the specified radius along the path from vertex to vertex. Agents with path-related goals will attempt to move to or stay within this area.To use the newly created path to constrain an agent’s behavior, create a goal with the init(toStayOn:maxPredictionTime:) or init(toFollow:maxPredictionTime:forward:) method.
   * @see https://developer.apple.com/documentation/gameplaykit/gkpath/1501138-init
   */
  static pathWithGraphNodesRadius(graphNodes, radius) {
    const path = new GKPath()
    // TODO: implement
    path.radius = radius

    return path
  }

  /**
   *
   * @access public
   * @param {float2[]|float3[]} points -
   * @param {number} radius -
   * @param {boolean} cyclical -
   * @returns {GKPath}
   */
  static pathWithPointsRadiusCyclical(points, radius, cyclical) {
    const path = new GKPath()

    path._points.push(...points)
    path.radius = radius
    path.isCyclical = cyclical

    return path
  }

  // Inspecting a Path’s Shape

  /**
   * Returns the 2D point at the specified index in the path’s list of vertices.
   * @access public
   * @param {number} index - The index of the vertex to return, between 0 and the numPoints value.
   * @returns {number[]} - 
   * @desc You define a path’s vertices when creating it, either directly with the init(__float3Points:count:radius:cyclical:) initializer or indirectly with the init(graphNodes:radius:) initializer.If the path is a 3D path, this method is still functional but returns only 2D vectors, ignoring the z-component of each point on the path.
   * @see https://developer.apple.com/documentation/gameplaykit/gkpath/1778285-float2
   */
  float2At(index) {
    return this.pointAt(index)
  }

  /**
   * Returns the 3D point at the specified index in the path’s list of vertices.
   * @access public
   * @param {number} index - The index of the vertex to return, between 0 and the numPoints value.
   * @returns {number[]} - 
   * @desc You define a path’s vertices when creating it, either directly with the init(__float3Points:count:radius:cyclical:) initializer or indirectly with the init(graphNodes:radius:) initializer.If the path is a 2D path, this method is still functional, but returns 3D vectors whose z-component is always zero.
   * @see https://developer.apple.com/documentation/gameplaykit/gkpath/1778310-float3
   */
  float3At(index) {
    const point = this._points[index]
    if(point){
      return new SCNVector3(point.x, point.y, point.z)
    }
    return null
  }

  /**
   * Returns the 2D point at the specified index in the path’s list of vertices.
   * @access public
   * @param {number} index - The index of the vertex to return, between 0 and the numPoints value.
   * @returns {number[]} - 
   * @see https://developer.apple.com/documentation/gameplaykit/gkpath/1501172-point
   */
  pointAt(index) {
    const point = this._points[index]
    if(point){
      return new CGPoint(point.x, point.y)
    }
    return null
  }

  /**
   * The number of vertices in the path.
   * @type {number}
   * @desc You define a path’s vertices when creating it, either directly with the init(__points:count:radius:cyclical:) initializer or indirectly with the init(graphNodes:radius:) initializer.
   * @see https://developer.apple.com/documentation/gameplaykit/gkpath/1501071-numpoints
   */
  get numPoints() {
    return this._points.length()
  }
}
