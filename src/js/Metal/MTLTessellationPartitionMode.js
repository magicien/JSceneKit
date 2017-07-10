'use strict'

/**
 * The partitioning mode used by the tessellator to derive the number and spacing of segments used to subdivide a corresponding edge.
 * @typedef {Object} MTLTessellationPartitionMode
 * @property {number} pow2 - 
 * @property {number} integer - 
 * @property {number} fractionalOdd - 
 * @property {number} fractionalEven - 
 * @see https://developer.apple.com/documentation/metal/mtltessellationpartitionmode
 */
const MTLTessellationPartitionMode = {
  pow2: 0,
  integer: 1,
  fractionalOdd: 2,
  fractionalEven: 3 
}

export default MTLTessellationPartitionMode
