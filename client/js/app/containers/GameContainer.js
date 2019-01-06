import React, { Component, createRef } from 'react'
import Game from '../../game/index'

export default class GameContainer extends Component {
  container = createRef();
  game = null;

  componentDidMount () {
    this.game = new Game(this.container.current);
    this.game.start();
  }

  componentWillUnmount () {
    this.game && this.game.stop();
  }

  render () {
    return <div className="GameContainer" ref={this.container}/>;
  }
}
