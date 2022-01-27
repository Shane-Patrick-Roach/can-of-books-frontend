import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Modal } from 'react-bootstrap';



class UpdateBookModal extends React.Component {

  handleBookUpdate = (e) => {
    e.preventDefault();
    let bookUpdate = {
      title: e.target.title.value || this.state.books.title,
      description: e.target.description.value || this.book.description,
      status: e.target.status.checked || this.book.status,
      email: e.target.email.value || this.book.email,
      __v: this.book.__v,
      _id: this.book._id

    }
    console.log(bookUpdate)
    this.props.updateBook(bookUpdate);
  }


  render() {
    return (

      <Container>

        <Modal show={this.props.showUpdateModal} onHide={this.props.closeUpdateModalHandle}>

          <Modal.Header closeButton>
            <Modal.Title>Update Your Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>


          <Form onSubmit={this.handleBookUpdate}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder={this.props.currentBook.title} />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder={this.props.currentBook.description} />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Check type="checkbox" label="Status" />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder={this.props.currentBook.email} />
            </Form.Group>
            <Button type="submit">Submit Update</Button>
          </Form>

        </Modal.Body>

      </Modal>

    </Container>

    )
  }
}

export default UpdateBookModal
