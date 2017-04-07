'use strict'

/*global File*/
let _File = null
if(typeof File !== 'undefined'){
  _File = File
}else{
  class File {
    /**
     * @access public
     * @constructor
     * @param {array} fileBits -
     * @param {string} fileName -
     * @param {Object} options -
     */
    constructor(fileBits, fileName, options) {
      this._lastModified = null
      this._lastModifiedDate = null
      this._name = fileName
      this._size = null
      this._webkitRelativePath = null
      this._type = null
    }

    get lastModified() {
      return this._lastModified
    }

    get lastModifiedDate() {
      return this._lastModifiedDate
    }

    get name() {
      return this._name
    }

    get size() {
      return this._size
    }

    get webkitRelativePath() {
      return this._webkitRelativePath
    }

    get type() {
      return this._type
    }
  }
  _File = File
}

export default _File
