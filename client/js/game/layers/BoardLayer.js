import BaseLayer from './BaseLayer'
import Config from '../Config'

export default class BoardLayer extends BaseLayer {
  x = 50;
  y = 50;
  chipVelocity = 15;
  board = new PIXI.Sprite(PIXI.loader.resources['board'].texture);
  chip = new PIXI.Sprite(PIXI.loader.resources['chip_red'].texture);
  droppedChip = new PIXI.Sprite(PIXI.loader.resources['chip_red'].texture);
  chips = new PIXI.Container();
  state = {
    droppedChip: null,
    slotIndex: Math.floor(Config.board.slots.totalX / 2),
    slots: {},
  };

  init () {
    // Fill slots with empty data
    for (let x = 0; x < Config.board.slots.totalX; x++) {
      this.state.slots[x] = [];
      for (let y = 0; y < Config.board.slots.totalY; y++) {
        this.state.slots[x][y] = 0;
      }
    }

    this.chip.anchor.set(0.5);
    this.droppedChip.anchor.set(0.5);
    this.board.anchor.set(0.5);

    this.board.x = this.game.screen.width / 2;
    this.board.y = this.game.screen.height / 2;
    this.board.interactive = true;
    this.chips.width = this.board.width;
    this.chips.height = this.board.height;
    this.chips.x = this.board.x;
    this.chips.y = this.board.y;

    this.board.on('mousemove', this.handleMouseMove);
    this.board.on('mousedown', this.handleMouseDown);
    this.board.addChild(this.chip);
    this.game.stage.addChild(this.chips);
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
    this.dropChip(this.state.slotIndex);
  };

  dropChip () {
    // Check slots
    for (let y = this.state.slots[this.state.slotIndex].length - 1; y >= 0; y--) {
      if (this.state.slots[this.state.slotIndex][y] === 0) {
        const chip = new PIXI.Sprite(PIXI.loader.resources['chip_red'].texture);
        chip.anchor.set(0.5);
        chip.x = this.chip.x;
        chip.y = this.chip.y;
        this.chips.addChild(chip);
        this.state.droppedChip = chip;
        this.state.droppedChip.velocity = this.chipVelocity;
        this.state.slots[this.state.slotIndex][y] = chip;
        return;
      }
    }

    console.info('Column full');
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
    const slotIndex = Math.floor((mouseX + boardWidth) / (((endX + boardWidth) + (slots.gap * (slots.totalX - 1))) / slots.totalX));
    this.state.slotIndex = slotIndex;
    this.chip.x = startX + (offsetX * slotIndex);
  }

  tick (delta) {
    const centerY = (this.board.height - this.droppedChip.height - (Config.board.slots.paddingY * 2));
    const endY = centerY * this.board.anchor.y;

    for (let x in this.state.slots) {
      if (!this.state.slots.hasOwnProperty(x)) {
        continue;
      }

      for (let y = this.state.slots[x].length - 1; y >= 0; y--) {
        if (this.state.slots[x][y] instanceof PIXI.Sprite) {
          const chip = this.state.slots[x][y];
          const currentY = chip.y + (this.chipVelocity * delta);
          chip.y = Math.min(endY - (((Config.board.slots.totalY - 1) - y) * (chip.height + Config.board.slots.gap)), currentY);
        }
      }
    }
  }
}
