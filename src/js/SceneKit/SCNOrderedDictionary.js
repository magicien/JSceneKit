'use strict'

/**
 *
 * @access public
 * @extends {NSDictionary}
 */
export default class SCNOrderedDictionary {
  /**
   * @access public
   * @param {NSCoder} coder -
   * @returns {Object} -
   */
  static initWithCoder(coder) {
    const dict = new SCNOrderedDictionary()
    if(typeof coder._refObj['NS.objects'] !== 'undefined'){
      const keys = coder._refObj['NS.keys']
      const objects = coder._refObj['NS.objects']
      if(!Array.isArray(keys)){
        throw new Error('NS.keys must be Array')
      }
      if(!Array.isArray(objects)){
        throw new Error('NS.objects must be Array')
      }
      if(keys.length !== objects.length){
        throw new Error('NS.keys.length !== NS.objects.length')
      }

      const keyCoder = coder.copy()
      keyCoder._refObj = keys

      const objCoder = coder.copy()
      objCoder._refObj = objects

      for(let i=0; i<keys.length; i++){
        const key = keyCoder.decodeObjectForKey(i)
        const obj = objCoder.decodeObjectForKey(i)
        dict._keys.push(key)
        dict._values.push(obj)
      }
    }else{
      for(let i=0; ; i++){
        const objKey = `NS.object.${i}`
        const keyKey = `NS.key.${i}`
        if(typeof coder._refObj[objKey] === 'undefined'){
          break
        }
        const key = coder.decodeObjectForKey(keyKey)
        const obj = coder.decodeObjectForKey(objKey)
        dict._keys.push(key)
        dict._values.push(obj)
      }
    }

    return dict
  }

  constructor() {
    this._keys = []
    this._values = []
  }

  copy() {
    const dict = new SCNOrderedDictionary()
    dict._keys = this._keys.slice(0)
    dict._values = this._values.slice(0)
    return dict
  }

  keys() {
    return this._keys.slice(0)
  }

  dictionary() {
    const dict = {}
    const len = this._keys.length
    for(let i=0; i<len; i++){
      dict[this._keys[i]] = this._values[i]
    }
    return dict
  }

  allValues() {
    return this._values.slice(0)
  }

  allKeys() {
    return this.keys()
  }

  count() {
    return this._keys.length
  }

  removeAllObjects() {
    this._keys = []
    this._values = []
  }

  removeObjectForKey(key) {
    const index = this._keys.indexOf(key)
    if(index < 0){
      return
    }
    this._keys.splice(index, 1)
    this._values.splice(index, 1)
  }

  objectForKey(key) {
    const index = this._keys.indexOf(key)
    if(index < 0){
      return null
    }
    return this._values[index]
  }

  setObjectForKey(object, key) {
    let index = this._keys.indexOf(key)
    if(index < 0){
      index = this._keys.length
      this._keys[index] = key
    }
    this._values[index] = object
  }

  valueForKey(key) {
    return this.objectForKey(key)
  }

  setValueForKey(value, key) {
    this.setObjectForKey(value, key)
  }

  // extension for JavaScript

  set(key, object) {
    this.setObjectForKey(object, key)
  }

  get(key) {
    return this.objectForKey(key)
  }

  clear() {
    this.removeAllObjects()
  }

  delete(key) {
    this.removeObjectForKey(key)
  }

  forEach(func) {
    const len = this._keys.length
    for(let i=0; i<len; i++){
      func(this._values[i], this._keys[i])
    }
  }
}
