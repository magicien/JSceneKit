'use strict'

const _ClassList = new Map()

_ClassList.registerClass = (classObj) => {
  let className = classObj.className
  const structInitializer = classObj._initWithData
  if(typeof className === 'undefined'){
    if(typeof structInitializer === 'undefined'){
      // doesn't seem to be an instance of NSObject
      return
    }
    className = classObj.prototype.constructor.name
  }
  _ClassList.set(className, classObj)
}

export default _ClassList
