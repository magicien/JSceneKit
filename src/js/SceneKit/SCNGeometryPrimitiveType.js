'use strict'


/**
 * The drawing primitive that connects vertices when rendering a geometry element, used by the primitiveType property to specify how SceneKit interprets the geometry element’s data.
 * @typedef {Object} SCNGeometryPrimitiveType
 * @property {number} triangles - The geometry element’s data is a sequence of triangles, with each triangle described by three new vertices.
 * @property {number} triangleStrip - The geometry element’s data is a sequence of triangles, with each triangle described by one new vertex and two vertices from the previous triangle. 
 * @property {number} line - The geometry element’s data is a sequence of line segments, with each line segment described by two new vertices. 
 * @property {number} point - The geometry element’s data is a sequence of unconnected points.
 * @property {number} polygon - 
 * @see https://developer.apple.com/reference/scenekit/scngeometryprimitivetype
 */
const SCNGeometryPrimitiveType = {
  triangles: 0,
  triangleStrip: 1,
  line: 2,
  point: 3,
  polygon: 4
}

export default SCNGeometryPrimitiveType
