import 'pixi.js'
import BaseLayer from './BaseLayer'

export default class BoardLayer extends BaseLayer {
  x = 50;
  y = 50;
  board = new PIXI.Sprite.fromImage('img/board.png');
  chip = {
    red: new PIXI.Sprite.fromImage('img/chip_red.png'),
    yellow: new PIXI.Sprite.fromImage('img/chip_yellow.png'),
  };

  init () {
    this.chip.red.anchor.set(0.5);
    this.board.anchor.set(0.5);
    this.board.x = this.game.screen.width / 2;
    this.board.y = this.game.screen.height / 2;
    this.board.interactive = true;

    this.board.on('mousemove', this.handleMouseMove);
    this.board.addChild(this.chip.red);
    this.game.stage.addChild(this.board);
  }

  destroy () {
    this.board.off('mousemove', this.handleMouseMove);
    this.game.stage.removeChild(this.board);
  }

  handleMouseMove = event => {
    const {x} = event.data.getLocalPosition(this.board);
    this.moveChip(x);
  }

  moveChip (x) {
    const maxLeft = (this.board.width - this.chip.red.width) * -this.board.anchor.x;
    const maxRight = (this.board.width - this.chip.red.width) * this.board.anchor.x;
    this.chip.red.x = Math.max(maxLeft, Math.min(maxRight, x));
    this.chip.red.y = (this.board.height + this.chip.red.height) * -this.board.anchor.y;
  }

  tick (delta) {
    //
  }
}
