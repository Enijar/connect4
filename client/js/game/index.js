import 'pixi.js'
import Config from './Config'
import Interaction from './Interaction'
import ws from './ws'
import layers from './layers/index'

export default class Game {
  constructor (container) {
    this.container = container;
    this.interaction = new Interaction(this.container);
    this.game = new PIXI.Application(Config.width, Config.height, {backgroundColor: Config.background});
    this.layers = [];
  }

  loadAssets() {
    // TODO: Handle asset load errors
    return new Promise(resolve => {
      for (let asset in Config.assets) {
        if (!Config.assets.hasOwnProperty(asset)) {
          continue;
        }
        PIXI.loader.add(asset, Config.assets[asset]);
      }
      PIXI.loader.once('complete', resolve);
      PIXI.loader.load();
    });
  }

  async start () {
    await this.loadAssets();

    for (let layer in layers) {
      if (!layers.hasOwnProperty(layer)) {
        continue;
      }
      const instance = new layers[layer](this.game);
      instance.init();
      this.layers.push(instance);
    }

    ws.connect();
    this.container.appendChild(this.game.view);
    this.interaction.start();
    this.game.ticker.add(this.update);
  }

  stop () {
    ws.disconnect();
    this.container.removeChild(this.game.view);
    this.interaction.stop();
  }

  update = delta => {
    for (let i = 0; i < this.layers.length; i++) {
      this.layers[i].tick(delta);
    }
  }
}
