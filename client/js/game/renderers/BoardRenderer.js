import Config from '../Config'
import BaseRenderer from './BaseRenderer'

export default class BoardRenderer extends BaseRenderer {
  constructor () {
    super({
      x: Config.board.x,
      y: Config.board.y,
      width: (Config.board.slots.x * (Config.board.slots.r + Config.board.slots.offset)) - Config.board.slots.offset,
      height: (Config.board.slots.y * (Config.board.slots.r + Config.board.slots.offset)) - Config.board.slots.offset,
    });
  }

  destroy () {
    //
  }

  update () {
    //
  }

  render () {
    this.ctx.fillStyle = '#eee';
    this.ctx.fillRect(0, 0, this.width, this.height);

    for (let x = 0; x < Config.board.slots.x; x++) {
      for (let y = 0; y < Config.board.slots.y; y++) {
        this.ctx.fillStyle = '#111';
        this.ctx.fillRect(
          x * (Config.board.slots.r + Config.board.slots.offset),
          y * (Config.board.slots.r + Config.board.slots.offset),
          Config.board.slots.r,
          Config.board.slots.r,
        );
      }
    }
  }
}
