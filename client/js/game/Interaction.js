import Config from './Config'

export default class Interaction {
  constructor (container) {
    this.container = container;
    this.mouse = {
      x: 0,
      y: 0,
      down: false,
      in(x, y, w, h) {
        return x >= this.x && y >= this.y && x <= this.x + w && y <= this.y + h;
      },
    };
    this.keys = [];
  }

  start() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  stop() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  handleMouseMove = event => {
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = Math.min(Config.width, Math.max(0, event.clientX - rect.left));
    this.mouse.y = Math.min(Config.height, Math.max(0, event.clientY - rect.top));
  }

  handleMouseDown = () => {
    this.mouse.down = true;
  }

  handleMouseUp = () => {
    this.mouse.down = false;
  }

  handleKeyDown = event => {
    if (!this.keys.includes(event.key)) {
      this.keys.push(event.key);
    }
  }

  handleKeyUp = event => {
    const index = this.keys.indexOf(event.key);
    if (index > -1) {
      this.keys.splice(index, 1);
    }
  }
}
