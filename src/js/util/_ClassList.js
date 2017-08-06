'use strict'

import NSObject from '../ObjectiveC/NSObject'

const _ClassList = new Map()

const _classProperties = [
  'superclass',
  'isSubclassOf',
  'className'
]
const _instanceProperties = [
  'isInstanceOf',
  'className'
]

_ClassList.registerClass = (classObj, className) => {
  //let className = classObj.className
  //const structInitializer = classObj._initWithData
  //if(typeof className === 'undefined'){
  //  if(typeof structInitializer === 'undefined'){
  //    // doesn't seem to be an instance of NSObject
  //    return
  //  }
  //  className = classObj.prototype.constructor.name
  //}
  classObj._className = className

  // copy utility functions
  if(typeof classObj.superclass === 'undefined' && typeof classObj.prototype !== 'undefined'){
    for(const name of _classProperties){
      const org = Object.getOwnPropertyDescriptor(NSObject, name)
      Object.defineProperty(classObj, name, org)
    }
    for(const name of _instanceProperties){
      const org = Object.getOwnPropertyDescriptor(NSObject.prototype, name)
      Object.defineProperty(classObj.prototype, name, org)
    }
  }

  _ClassList.set(className, classObj)
}

export default _ClassList
