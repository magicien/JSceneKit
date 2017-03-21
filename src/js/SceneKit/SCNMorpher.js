'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNAnimatable from './SCNAnimatable'
import SCNGeometry from './SCNGeometry'
import SCNMorpherCalculationMode from './SCNMorpherCalculationMode'


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

  setValueForKeyPath(value, keyPath) {
    const paths = keyPath.split('.')
    const key = paths.shift()
    const restPath = paths.join('.')

    if(key === 'weights'){
      if(paths.length > 0){
        const targetIndex = this.targets.findIndex((target) => target.name === restPath)
        if(targetIndex >= 0){
          this._weights[targetIndex] = value
        }
      }
    }else{
      super.setValueForKeyPath(value, keyPath)
    }
  }

  /**
   * @access private
   * @param {SCNNode} node -
   */
  _morph(node) {
    console.log(`SCNMorpher._morph ${node.name}`)
    const p = node.presentation
    if(node.geometry === null || p === null || p.geometry === null){
      // data is not ready
      return
    }
    const pg = p.geometry
    const totalWeightForSemantic = new Map()
    //const newData = new Map()

    // reset presentation geometry
    node.geometry.geometrySources.forEach((source) => {
      // FIXME: copy more than 1 source.
      const pSource = pg.getGeometrySourcesForSemantic(source.semantic)[0]
      pSource._data = Array(source._data.length).fill(0)
      //newData.set(source.semantic, Array(source._data.length).fill(0))
      totalWeightForSemantic.set(source.semantic, 0.0)
    })

    // should I morph elements?
    //node.geometry.geometryElements().forEach((element) => {
    //})

    const targetCount = this.targets.length
    for(let i=0; i<targetCount; i++){
      const target = this.targets[i]
      const weight = this._weights[i]
      if(weight === 0 || typeof weight === 'undefined'){
        continue
      }
      console.log(`morph ${target.name} weight ${weight}`)
      target.geometrySources.forEach((source) => {
        const pSource = pg.getGeometrySourcesForSemantic(source.semantic)[0]
        //const pSource = newData.get(source.semantic)
        if(typeof pSource === 'undefined'){
          return
        }
        totalWeightForSemantic.set(source.semantic, totalWeightForSemantic.get(source.semantic) + weight)

        const dataLen = source._data.length
        for(let j=0; j<dataLen; j++){
          pSource._data[j] += source._data[j] * weight
          //pSource[j] += source._data[j] * weight
        }
      })
    }

    node.geometry.geometrySources.forEach((source) => {
      // FIXME: copy more than 1 source.
      const pSource = pg.getGeometrySourcesForSemantic(source.semantic)[0]
      //const pSource = newData.get(source.semantic)
      const dataLen = source._data.length
      if(this.calculationMode === SCNMorpherCalculationMode.normalized){
        const weight = 1.0 - totalWeightForSemantic.get(source.semantic) 
        for(let i=0; i<dataLen; i++){
          pSource._data[i] += source._data[i] * weight
          //pSource[i] += source._data[i] * weight
        }
      }else{
        // calculationMode: additive
        for(let i=0; i<dataLen; i++){
          pSource._data[i] += source._data[i]
          //pSource[i] += source._data[i]
        }
      }
    })

    // TODO: needs to update normal vector?

    console.log(`_morph done`)
  }
}
