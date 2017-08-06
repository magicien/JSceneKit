'use strict'

const _InstanceOf = function(instance, aClass) {
  return instance && instance.isInstanceOf && instance.isInstanceOf(aClass)
}
export default _InstanceOf
