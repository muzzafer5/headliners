import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { ProtectedRoute } from "./route"

import Landing from './components/auth/landing'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import Home from './components/home/home'
import Game from './components/game/game'

class App extends PureComponent {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/signup" component={Signup} />
          <ProtectedRoute exact path="/home" component={Home} />
          <Route exact path = "/game" component = {Game}/>
        </div>
      </Router>
    )
  }
}
export default App;
