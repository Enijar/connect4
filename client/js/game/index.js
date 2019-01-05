import io from 'socket.io-client'
import Config from './Config'

export default class Game {
  constructor (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvas.width = Config.width;
    this.canvas.height = Config.height;
    this.animationFrame = null;
    this.io = io();
  }

  start () {
    this.render();
  }

  stop () {
    this.animationFrame && cancelAnimationFrame(this.animationFrame);
  }

  render = () => {
    this.animationFrame = requestAnimationFrame(this.render);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(50, 50, 100, 100);
  };
}
