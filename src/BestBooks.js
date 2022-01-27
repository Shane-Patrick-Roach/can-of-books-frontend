import React from 'react';
import axios from 'axios';
import { Carousel, Button } from 'react-bootstrap';
import BookFormModal from './BookFormModal';
import AddBookButton from './AddBookButton';

const SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showAddButton: true,
      showUpdateForm: true
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

  // updateBook = async (bookUpdate) => {
  //   let url = `${SERVER}/books`;
  //   let updatedBook = await axios.put(`${url}/${bookUpdate._id}`, bookUpdate);
  //   let updatedBooks = this.state.books.map(currBook => currBook._id === updatedBook.data._id ? updatedBook.data : currBook);
  //   this.setState({ books: updatedBooks })
  // }

  // handleBookUpdate = (e) => {
  //   e.preventDefault();
  //   let bookUpdate = {
  //       title: e.target.title.value || this.state.books.title,
  //       description: e.target.description.value || this.book.description,
  //       status: e.target.status.checked || this.book.status,
  //       email: e.target.email.value || this.book.email,
  //       __v: this.book.__v,
  //       _id: this.book._id
      
  //   }
  //   console.log(bookUpdate)
  //   this.updateBook(bookUpdate);
  // }


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
          <Button onClick={() => this.deleteBook(book._id)}>Remove Book</Button>
        </Carousel.Caption>
{/* 
        <Form onSubmit={this.handleBookUpdate}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder={book.title}/>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder={book.description}/>
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Check type="checkbox" label="Status" />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder={book.email}/>
          </Form.Group>
          <Button type="submit">Submit Update</Button>
        </Form> */}
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



      </>
    )
  }
}

export default BestBooks;
