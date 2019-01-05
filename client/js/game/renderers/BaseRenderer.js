export default class BaseRenderer {
  constructor(settings = {}) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = settings.width || 0;
    this.height = this.canvas.height = settings.height || 0;
    this.x = settings.x || 0;
    this.y = settings.y || 0;
    this.layer = 0;
  }

  destroy() {
    //
  }

  update() {
    //
  }

  render() {
    //
  }
}
