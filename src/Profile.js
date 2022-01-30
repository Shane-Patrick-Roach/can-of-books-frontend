import { Component } from "react";
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends Component {



  

  render()
  {
    console.log(this.props.auth0.user.given_name)
    return(
      <p>{this.props.auth0.user.given_name} with an email of {this.props.auth0.user.email}</p>
    

    );



  }
};

export default withAuth0(Profile);
