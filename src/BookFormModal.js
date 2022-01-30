import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';



class BookFormModal extends React.Component {



  handleBookSubmit = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.checked,
      email: e.target.email.value
    }
    console.log(newBook);
    this.props.makeBook(newBook);
    this.props.closeModalHandle();
  }


  render() {

    return (

      <Container>

        <Modal show={this.props.showModal} onHide={this.props.closeModalHandle}>

          <Modal.Header closeButton>
            <Modal.Title>Hello this book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleBookSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Check type="checkbox" label="Status" />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Button type="submit">Add Book</Button>
            </Form>

          </Modal.Body>

        </Modal>

      </Container>
    )
  }
}

export default BookFormModal;
