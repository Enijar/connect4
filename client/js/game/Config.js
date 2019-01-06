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
      total: 7,
      width: 100,
      paddingX: 38,
      paddingY: 25,
      gap: 10,
    },
  },
  assets: {
    board: 'img/board.png',
    chip_red: 'img/chip_red.png',
    chip_yellow: 'img/chip_yellow.png',
  },
}
