// import { Component } from "react";

// class LogoutButton extends Component {

//   render() {
//     return (
//       <button onClick={this.props.onLogout}>
//         Log Out
//       </button>
//     );
//   }
// };

// export default LogoutButton;

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </Button>
  );
};

export default LogoutButton;
