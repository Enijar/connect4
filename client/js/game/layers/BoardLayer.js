import 'pixi.js'
import BaseLayer from './BaseLayer'

export default class BoardLayer extends BaseLayer {
  x = 50;
  y = 50;
  chipVelocity = 0;
  board = new PIXI.Sprite(PIXI.loader.resources['board'].texture);
  chip = new PIXI.Sprite(PIXI.loader.resources['chip_red'].texture);

  init () {
    this.chip.anchor.set(0.5);
    this.board.anchor.set(0.5);
    this.board.x = this.game.screen.width / 2;
    this.board.y = this.game.screen.height / 2;
    this.board.interactive = true;

    this.board.on('mousemove', this.handleMouseMove);
    this.board.on('mousedown', this.handleMouseDown);
    this.board.addChild(this.chip);
    this.game.stage.addChild(this.board);

    this.resetChip();
  }

  destroy () {
    this.board.off('mousemove', this.handleMouseMove);
    this.board.off('mousedown', this.handleMouseDown);
    this.game.stage.removeChild(this.board);
  }

  handleMouseMove = event => {
    const {x} = event.data.getLocalPosition(this.board);
    this.moveChip(x);
  }

  handleMouseDown = () => {
    this.dropChip();
  };

  dropChip() {
    // TODO: Update game state
    this.chipVelocity = 5;
  }

  resetChip() {
    this.chip.x = 0;
    this.chip.y = (this.board.height + this.chip.height) * -this.board.anchor.y;
  }

  moveChip (x) {
    const maxLeft = (this.board.width - this.chip.width) * -this.board.anchor.x;
    const maxRight = (this.board.width - this.chip.width) * this.board.anchor.x;
    this.chip.x = Math.max(maxLeft, Math.min(maxRight, x));
  }

  tick (delta) {
    // TODO: Implement drop animation
    // this.chip.y += this.chipVelocity * delta;
  }
}
