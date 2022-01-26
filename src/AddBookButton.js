import React from 'react';

import { Button } from 'react-bootstrap';
import BookFormModal from './BookFormModal';




class AddBookButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  showModalHandle = () => this.setState({ showModal: true })
  closeModalHandle = () => this.setState({ showModal: false })

  render() {


    return (
      <>
        <Button onClick={this.showModalHandle}>Add New Book</Button>
        <BookFormModal showModal={this.state.showModal} showModalHandle={this.showModalHandle} closeModalHandle={this.closeModalHandle} makeBook={this.props.makeBook}/>
      </>
    )
  }
}

export default AddBookButton;
