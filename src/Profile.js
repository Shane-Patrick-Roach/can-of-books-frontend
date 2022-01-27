import { Component } from "react";

class Profile extends Component {

  render() {
    return <p>{this.props.user.username} with an email of {this.props.user.email}</p>
  }
};

export default Profile;
