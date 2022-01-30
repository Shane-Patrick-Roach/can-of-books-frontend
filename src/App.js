import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import Profile from './Profile';
import { Container } from 'react-bootstrap';


import Login from './Login'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';




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
          
          <Header onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              {this.props.auth0.isAuthenticated ? <Container><h1>Whenever you read a good book, somewhere in the world a door opens to allow in more light.</h1><img src='https://images.unsplash.com/photo-1587876931567-564ce588bfbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' alt ='the light of reading'></img></Container>: <Login onLogin/>}
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/books">
              <BestBooks/>
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
