import sharedConfig from '../../../shared/config'

export default {
  ...sharedConfig,
  width: 900,
  height: 900,
  background: 0xeeeeee,
  chip: {
    width: 50,
    height: 50,
  },
  board: {
    width: 840,
    height: 700,
    slots: {
      size: 100,
      offsetX: 38,
    },
  },
}
