const source = [
  -0.5, -0.5, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0,
  0.5, -0.5, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0,
  -0.5, 0.5, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0,
  0.5, 0.5, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0
]

const elements = [
  [
    0, 1, 3,
    0, 3, 2
  ]
]

const _SCNPlaneData = {
  source: source,
  elements: elements
}
export default _SCNPlaneData
