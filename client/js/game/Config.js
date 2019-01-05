import sharedConfig from '../../../shared/config'

export default {
  ...sharedConfig,
  width: 900,
  height: 900,
  chip: {
    width: 50,
    height: 50,
  },
  board: {
    width: 800,
    height: 800,
    slots: {
      offset: 2,
      r: 100,
      x: 7,
      y: 6,
    },
  },
}
