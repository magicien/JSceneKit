'use strict'


/**
 * The drawing primitive that connects vertices when rendering a geometry element, used by the primitiveType property to specify how SceneKit interprets the geometry element’s data.
 * @typedef {Object} SCNGeometryPrimitiveType
 * @property {Symbol} triangles - The geometry element’s data is a sequence of triangles, with each triangle described by three new vertices.
 * @property {Symbol} triangleStrip - The geometry element’s data is a sequence of triangles, with each triangle described by one new vertex and two vertices from the previous triangle. 
 * @property {Symbol} line - The geometry element’s data is a sequence of line segments, with each line segment described by two new vertices. 
 * @property {Symbol} point - The geometry element’s data is a sequence of unconnected points.
 * @property {Symbol} polygon - 
 * @see https://developer.apple.com/reference/scenekit/scngeometryprimitivetype
 */
const SCNGeometryPrimitiveType = {
  triangles: Symbol(),
  triangleStrip: Symbol(),
  line: Symbol(),
  point: Symbol(),
  polygon: Symbol()
}

export default SCNGeometryPrimitiveType
