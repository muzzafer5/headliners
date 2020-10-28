import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { ProtectedRoute, AdminRoute } from "./route"

import Landing from './components/auth/landing'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import Home from './components/home/home'
import Game from './components/game/game'
import Admin from './components/admin/admin_auth'
import AdminHome from './components/admin/admin_home';
import AdminUsers from './components/admin/admin_users';
import AdminAgeDistribution from './components/admin/admin_age_distrbution'
import AdminGenderDistribution from './components/admin/admin_gender_distribution'


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
          <Route exact path = "/admin" component = {Admin} />
          <AdminRoute exact path="/admin/home" component={AdminHome} />
          <AdminRoute exact path="/admin/users" component={AdminUsers} />
          <AdminRoute exact path="/admin/age_distribution" component={AdminAgeDistribution} />
          <AdminRoute exact path="/admin/gender_distribution" component={AdminGenderDistribution} />
        </div>
      </Router>
    )
  }
}
export default App;
