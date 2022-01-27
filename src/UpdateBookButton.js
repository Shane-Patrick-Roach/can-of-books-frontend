import React from 'react';

import { Button } from 'react-bootstrap';
import UpdateBookModal from './BookFormModal';




class UpdateBookButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showUpdateModal: false
    }
  }

  showUpdateModalHandle = () => this.setState({ showUpdateModal: true })
  closeUpdateModalHandle = () => this.setState({ showUpdateModal: false })


  render() {

    console.log(this.props.currentBook)

    return (
      <>
        <Button onClick={this.showUpdateModalHandle}>Update Book</Button>
        <UpdateBookModal showUpdateModal={this.state.showUpdateModal} showModalHandle={this.showUpdateModalHandle} closeUpdateModalHandle={this.closeUpdateModalHandle} currentBook={this.props.currentBook} updateBook={this.props.updateBook}/>
      </>
    )
  }
}

export default UpdateBookButton;
