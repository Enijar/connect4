import Config from './Config'
import ws from './ws'
import renderers from './renderers/index'

export default class Game {
  constructor (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvas.width = Config.width;
    this.canvas.height = Config.height;
    this.animationFrame = null;
    this.renderers = [];
  }

  start () {
    ws.connect();

    // Instantiate renderers
    this.renderers.push(new renderers.board());

    this.render();
  }

  stop () {
    this.animationFrame && cancelAnimationFrame(this.animationFrame);
    ws.disconnect();
  }

  render = () => {
    this.animationFrame = requestAnimationFrame(this.render);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderers.sort((a, b) => a.layer - b.layer);

    for (let i = 0; i < this.renderers.length; i++) {
      this.renderers[i].update();
      this.renderers[i].render();
      this.ctx.drawImage(
        this.renderers[i].canvas,
        this.renderers[i].x,
        this.renderers[i].y,
        this.renderers[i].width,
        this.renderers[i].height,
      );
    }
  };
}
