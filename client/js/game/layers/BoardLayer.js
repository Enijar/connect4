import BaseLayer from './BaseLayer'
import Config from '../Config'

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

  dropChip () {
    // TODO: Update game state
    this.chipVelocity = 5;
  }

  resetChip () {
    this.chip.x = 0;
    this.chip.y = (this.board.height + this.chip.height) * -this.board.anchor.y;
  }

  moveChip (x) {
    const {slots} = Config.board;
    const centerX = (this.board.width - this.chip.width - (slots.paddingX * 2));
    const startX = centerX * -this.board.anchor.x;
    const endX = centerX * this.board.anchor.x;
    const mouseX = Math.max(startX, Math.min(endX, x));
    const offsetX = this.chip.width + slots.gap;
    const boardWidth = (this.board.width - (slots.paddingX * 2)) * this.board.anchor.x;
    const slotNumber = Math.floor((mouseX + boardWidth) / (((endX + boardWidth) + (slots.gap * (slots.total - 1))) / slots.total));
    this.chip.x = startX + (offsetX * slotNumber);
  }

  tick (delta) {
    const centerY = (this.board.height - this.chip.height - (Config.board.slots.paddingY * 2));
    const endY = centerY * this.board.anchor.y;
    // TODO: Implement drop animation
    this.chip.y = Math.min(endY, this.chip.y + (this.chipVelocity * delta));
  }
}
