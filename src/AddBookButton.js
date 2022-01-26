import React from 'react';
import AddBookModal from 'react'
import { Button } from 'react-bootstrap';



class AddBookButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  render() {


    return (
      <>
        <Button onClick={() => this.setState({ showModal: true })}>Add New Book</Button> :

        <AddBookModal showModal={this.state.showModal} />
      </>

    )
  }
}

export default AddBookButton;
