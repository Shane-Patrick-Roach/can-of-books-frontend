import React from 'react';
import axios from 'axios';
import { Carousel, Button, Form } from 'react-bootstrap';
import BookFormModal from './BookFormModal';
import AddBookButton from './AddBookButton';
import UpdateBookButton from './UpdateBookButton';

const SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showAddButton: true,
      currentBook: {},
      showUpdateForm: false
    }
  }



  getBooksInfo = async () => {
    try {
      let bookData = await axios.get(`${SERVER}/books`)
      this.setState({
        books: bookData.data
      })
    } catch (err) {
      console.error(err)
    }
  }

  makeBook = async (newBook) => {
    let url = `${SERVER}/books`;

    try {
      let bookResults = await axios.post(url, newBook);

      this.setState({
        books: [...this.state.books, bookResults.data]
      })
    } catch (err) {
      console.error(err);
    }


  }

  deleteBook = async (id) => {
    try {
      await axios.delete(`${SERVER}/books/${id}`)
      this.getBooksInfo();
    } catch (err) {
      console.error(err);
    }
  }

  updateBook = async (bookUpdate) => {
    let url = `${SERVER}/books`;
    let updatedBook = await axios.put(`${url}/${bookUpdate._id}`, bookUpdate);
    let updatedBooks = this.state.books.map(currBook => currBook._id === updatedBook.data._id ? updatedBook.data : currBook);
    this.setState({ books: updatedBooks })
    
  }

  handleBookUpdate = (e) => {
    e.preventDefault();
    let bookUpdate = {
      title: e.target.title.value || this.state.currentBook.title,
      description: e.target.description.value || this.state.currentBook.description,
      status: e.target.status.checked || this.state.currentBook.status,
      email: e.target.email.value || this.state.currentBook.email,
      __v: this.state.currentBook.__v,
      _id: this.state.currentBook._id

    }
    console.log(bookUpdate)
    this.updateBook(bookUpdate);
  }

  

  componentDidMount() {
    this.getBooksInfo();
  }




  render() {

    let booksToRender = this.state.books.map((book, idx) =>
      <Carousel.Item key={idx}>
        <img src="https://via.placeholder.com/1200x550/333/808080%20C/O%20https://placeholder.com/" alt='hello'></img>

        <Carousel.Caption>
          <h3>{book.title}</h3>
          {/* <Button onClick={() => this.updateBook(book._id)}>Update Book</Button> */}
          <Button onClick={() => this.deleteBook(book._id)}
          >Remove Book</Button>
          <Button onClick={()=> this.setState({ showUpdateForm: true, currentBook: book })}>Update Book</Button>

        </Carousel.Caption>

        
      </Carousel.Item>  

    )



    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length > 0 ? (
          <Carousel>
            {booksToRender}
          </Carousel>
        ) : (
          <h3>No Books Found 😱</h3>
        )}

        <BookFormModal books={this.state.books} />
        <AddBookButton user={this.props.user} makeBook={this.makeBook} />

        {this.state.showUpdateForm && 
        
        <Form onSubmit={this.handleBookUpdate}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder={this.state.currentBook.title} />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder={this.state.currentBook.description} />
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Check type="checkbox" label="Status" />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder={this.state.currentBook.email} />
        </Form.Group>
        <Button type="submit">Submit Update</Button>
      </Form>}



      </>
    )
  }
}

export default BestBooks;
