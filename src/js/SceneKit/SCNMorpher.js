'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNAnimatable from './SCNAnimatable'
import SCNGeometry from './SCNGeometry'
import SCNMorpherCalculationMode from './SCNMorpherCalculationMode'

const _weightsPattern = new RegExp(/^weights\[(\d+)\]$/)

/**
 * An object that manages smooth transitions between a node's base geometry and one or more target geometries.
 * @access public
 * @extends {NSObject}
 * @implements {SCNAnimatable}
 * @see https://developer.apple.com/reference/scenekit/scnmorpher
 */
export default class SCNMorpher extends NSObject {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Specifying Morph Targets

    /**
     * The array of target geometries to morph between.
     * @type {SCNGeometry[]}
     * @see https://developer.apple.com/reference/scenekit/scnmorpher/1523572-targets
     */
    this.targets = []

    /**
     * @type {number[]}
     */
    this._weights = []

    // Changing Interpolation Mode

    /**
     * The interpolation formula for blending between target geometries.
     * @type {SCNMorpherCalculationMode}
     * @see https://developer.apple.com/reference/scenekit/scnmorpher/1523754-calculationmode
     */
    this.calculationMode = SCNMorpherCalculationMode.normalized
  }

  // Blending between Morph Targets

  /**
   * Returns the weight value for the specified target index.
   * @access public
   * @param {number} targetIndex - The index of a geometry in the morpher’s targets array.
   * @returns {number} - 
   * @desc Target geometries and their weights determine the current form of the surface produced by the morpher. For example, if a morpher has one target whose weight is 0.5, the form of the resulting surface will be halfway between those of the base geometry and the target geometry.
   * @see https://developer.apple.com/reference/scenekit/scnmorpher/1522940-weight
   */
  weightForTargetAt(targetIndex) {
    return this._weights[targetIndex]
  }

  /**
   * Specifies a weight value at a specified target index.
   * @access public
   * @param {number} weight - A number specifying the contribution of the target geometry to the blended surface, generally between 0.0 and 1.0.
   * @param {number} targetIndex - The index of a geometry in the morpher’s targets array.
   * @returns {void}
   * @desc Target geometries and their weights determine the current form of the surface produced by the morpher. For example, if a morpher has one target whose weight is 0.5, the form of the resulting surface will be halfway between those of the base geometry and the target geometry.You can also animate weights implicitly or explicitly using the keypath weights[index], where index corresponds to the targetIndex parameter of this method.
   * @see https://developer.apple.com/reference/scenekit/scnmorpher/1522886-setweight
   */
  setWeightForTargetAt(weight, targetIndex) {
    this._weights[targetIndex] = weight
  }

  setValueForKey(value, key) {
    //console.log(`SCNMorpher.setValueForKey: ${key}: ${value}`)
    const weightsMatch = key.match(_weightsPattern)
    if(weightsMatch !== null){
      if(weightsMatch.length > 1){
        const index = weightsMatch[1]
        if(typeof this._weights[index] !== 'undefined'){
          //console.log(`_weights[ ${index} ] = ${value}`)
          this._weights[index] = value
        }
      }
      return
    }

    super.setValueForKey(value, key)
  }

  /*
  setValueForKeyPath(value, keyPath) {
    console.log(`SCNMorpher.setValueForKeyPath: ${keyPath}: ${value}`)
    const paths = keyPath.split('.')
    const key = paths.shift()
    const restPath = paths.join('.')

    const weightsMatch = key.match(_weightsPattern)
    if(weightsMatch !== null){
      if(weightsMatch.length > 1){
        //const targetIndex = this.targets.findIndex((target) => target.name === restPath)
        //if(targetIndex >= 0){
        //  this._weights[targetIndex] = value
        //}
        const index = weightsMatch[1]
        if(typeof this._weights[index] !== 'undefined'){
          console.log(`_weights[ ${index} ] = ${value}`)
          this._weights[index] = value
        }
      }
    }else{
      super.setValueForKeyPath(value, keyPath)
    }
  }
  */

  /**
   * @access private
   * @param {SCNNode} node -
   */
  _morph(node) {
    //console.log(`SCNMorpher._morph ${node.name}`)
    const p = node.presentation
    if(node.geometry === null || p === null || p.geometry === null){
      // data is not ready
      return
    }
    const pg = p.geometry
    const totalWeightForSemantic = new Map()

    // reset presentation geometry
    node.geometry.geometrySources.forEach((source) => {
      // FIXME: copy more than 1 source.
      const pSource = pg.getGeometrySourcesForSemantic(source.semantic)[0]
      pSource.fill(0)
      //newData.set(source.semantic, Array(source._data.length).fill(0))
      totalWeightForSemantic.set(source.semantic, 0.0)
    })

    // should I morph elements?
    //node.geometry.geometryElements().forEach((element) => {
    //})

    const targetCount = this.targets.length
    //console.log(`targetCount: ${targetCount}`)
    for(let i=0; i<targetCount; i++){
      const target = this.targets[i]
      const weight = this._weights[i]
      if(weight === 0 || typeof weight === 'undefined'){
        continue
      }
      //console.log(`morph ${target.name} weight ${weight}`)
      target.geometrySources.forEach((source) => {
        const pSource = pg.getGeometrySourcesForSemantic(source.semantic)[0]
        if(typeof pSource === 'undefined'){
          return
        }
        totalWeightForSemantic.set(source.semantic, totalWeightForSemantic.get(source.semantic) + weight)

        // FIXME: don't access private properties
        let srcIndex = source._dataOffset / source._bytesPerComponent
        const srcStride = source._dataStride / source._bytesPerComponent
        let dstIndex = pSource._dataOffset / pSource._bytesPerComponent
        const dstStride = pSource._dataStride / pSource._bytesPerComponent
        const componentCount = source._componentsPerVector
        const vectorCount = source._vectorCount
        for(let j=0; j<vectorCount; j++){
          for(let k=0; k<componentCount; k++){
            pSource._data[dstIndex + k] += source._data[srcIndex + k] * weight
          }
          srcIndex += srcStride
          dstIndex += dstStride
        }
      })
    }

    //console.log(`node.geometry.geometrySources.length: ${node.geometry.geometrySources.length}`)
    node.geometry.geometrySources.forEach((source) => {
      //console.log(`add baseGeometry`)
      // FIXME: copy more than 1 source.
      const pSource = pg.getGeometrySourcesForSemantic(source.semantic)[0]
      let srcIndex = source._dataOffset / source._bytesPerComponent
      const srcStride = source._dataStride / source._bytesPerComponent
      let dstIndex = pSource._dataOffset / pSource._bytesPerComponent
      const dstStride = pSource._dataStride / pSource._bytesPerComponent
      const componentCount = source._componentsPerVector
      const vectorCount = source._vectorCount

      if(this.calculationMode === SCNMorpherCalculationMode.normalized){
        const weight = 1.0 - totalWeightForSemantic.get(source.semantic) 
        // FIXME: don't access private properties
        for(let i=0; i<vectorCount; i++){
          for(let j=0; j<componentCount; j++){
            pSource._data[dstIndex + j] += source._data[srcIndex + j] * weight
          }
          srcIndex += srcStride
          dstIndex += dstStride
        }
      }else{
        //console.log(`additive: vector: ${vectorCount}, component: ${componentCount}`)
        // calculationMode: additive
        // FIXME: don't access private properties
        for(let i=0; i<vectorCount; i++){
          for(let j=0; j<componentCount; j++){
            pSource._data[dstIndex + j] += source._data[srcIndex + j]
          }
          srcIndex += srcStride
          dstIndex += dstStride
        }
      }
    })

    // TODO: needs to update normal vector?

    //console.log(`_morph done`)
  }
}
