import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { ProtectedRoute, AdminRoute } from "./route"

import Landing from './components/auth/landing'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import Home from './components/home/home'
import Game from './components/game/game'
import Admin from './components/admin/admin_auth'
import Profile from './components/user/profile'
import PlayedGame from './components/user/played_game';
import AdminHome from './components/admin/admin_home'
import AdminUsersData from './components/admin/models/admin_users'
import AdminGameData from './components/admin/models/admin_game_data'
import AdminNewsData from './components/admin/models/admin_news_data'
import AdminAgeDistribution from './components/admin/visualisations/admin_age_distrbution'
import AdminGenderDistribution from './components/admin/visualisations/admin_gender_distribution'
import AdminCountryDistribution from './components/admin/visualisations/admin_country_distribution'
import AdminLanguageDistribution from './components/admin/visualisations/admin_language_distribution'
import AdminDetailedUsersData from './components/admin/detailed_data/admin_users';
import AdminDetailedGameData from './components/admin/detailed_data/admin_game_data'

class App extends PureComponent {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/signup" component={Signup} />
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute exact path="/user/profile" component={Profile} />
          <ProtectedRoute exact path="/user/game" component={PlayedGame} />
          <Route exact path = "/game" component = {Game}/>
          <Route exact path = "/admin" component = {Admin} />
          <AdminRoute exact path="/admin/home" component={AdminHome} />
          <AdminRoute exact path="/admin/users" component={AdminUsersData} />
          <AdminRoute exact path="/admin/game_data" component={AdminGameData} />
          <AdminRoute exact path="/admin/news_data" component={AdminNewsData} />
          <AdminRoute exact path="/admin/users/detailed" component={AdminDetailedUsersData} />
          <AdminRoute exact path="/admin/game_data/detailed" component={AdminDetailedGameData} />
          <AdminRoute exact path="/admin/age_distribution" component={AdminAgeDistribution} />
          <AdminRoute exact path="/admin/gender_distribution" component={AdminGenderDistribution} />
          <AdminRoute exact path="/admin/country_distribution" component={AdminCountryDistribution} />
          <AdminRoute exact path="/admin/language_distribution" component={AdminLanguageDistribution} />
        </div>
      </Router>
    )
  }
}
export default App;
