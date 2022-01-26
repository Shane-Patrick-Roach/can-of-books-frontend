import { Component } from 'react'
import LoginForm from './LoginForm'
import { Button } from 'react-bootstrap';



class LoginButton extends Component {

  constructor(props){
    super(props);
    this.state = {
      showButton: true
    }
  }

  render() {


    /* TODO: Render a button with label 'Log In'. When the button is clicked then show LoginForm instead */
    return (
      <>
      {this.state.showButton ? <Button onClick={() => this.setState({ showButton: false})}>Log In</Button> : 

      <LoginForm onLogin={this.props.onLogin}/>}
      </>
    
    )
  }
}

export default LoginButton;
