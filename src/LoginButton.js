import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     showButton: true
  //   }
  // }

//   render() {


//     /* TODO: Render a button with label 'Log In'. When the button is clicked then show LoginForm instead */
//     return (
//       <>
//       {this.state.showButton ? <Button onClick={() => this.setState({ showButton: false})}>Log In</Button> : 

//       <LoginForm onLogin={this.props.onLogin}/>}
//       </>
    
//     )
//   }
// }

// const loginButton = ()

// export default LoginButton;
