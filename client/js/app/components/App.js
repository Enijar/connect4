import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PlayScreen from '../screens/PlayScreen'

export default class App extends Component {
  render () {
    return (
      <Switch>
        <Route exact path="/play" component={PlayScreen}/>
      </Switch>
    );
  }
}
