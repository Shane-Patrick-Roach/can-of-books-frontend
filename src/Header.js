import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Header.css';


import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';



class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        
        {this.props.auth0.isAuthenticated ? <NavItem><Link to="/profile" className="nav-link">Profile</Link></NavItem> : ''}
        
        {this.props.auth0.isAuthenticated ? <NavItem><Link to="/books" className="nav-link">My Book List</Link></NavItem> : ''}

        {this.props.auth0.isAuthenticated ? <NavItem className="navbar-right"><LogoutButton/></NavItem>: ''}
        

      </Navbar>
    )
  }
}

export default withAuth0(Header);
