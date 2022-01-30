import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import Profile from './Profile';


import Login from './Login'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }

  loginHandler = (user) => {
    this.setState({
      user,
    })
  }

  logoutHandler = () => {
    this.setState({
      user: null,
    })
  }

  render() {
    return (
      <>
        <Router>
          
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              {this.props.auth0.isAuthenticated ? <LogoutButton/> : <Login onLogin/>}
              <BestBooks />
            </Route>
            <Route exact path="/profile">
              <Profile />
              
            </Route>
            
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
