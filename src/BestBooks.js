import React from 'react';
import axios from 'axios';
import { Carousel, Button, Form } from 'react-bootstrap';
import BookFormModal from './BookFormModal';
import AddBookButton from './AddBookButton';
import { withAuth0 } from '@auth0/auth0-react';



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
    if (this.props.auth0.isAuthenticated){
      const responseFromAuth0 = await this.props.auth0.getIdTokenClaims();
      //Super Duper Important 
      const jwt =  responseFromAuth0.__raw;
      //console.log(jwt);
      const config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books',
        headers: {"Authorization":  `Bearer ${jwt}`}
      }
      const bookResponse = await axios(config);
      this.setState({books: bookResponse.data})
    }
    // try {
    //   let bookData = await axios.get(`${SERVER}/books`)
    //   this.setState({
    //     books: bookData.data
    //   })
    // } catch (err) {
    //   console.error(err)
    // }
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
    //console.log(books)
    let booksToRender = this.state.books.map((book, idx) =>
      <Carousel.Item key={idx} variant="dark">
        <img src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" alt='Books' className="d-block w-100"></img>

        <Carousel.Caption variant="dark">
          <h3>{book.title}</h3>
          <Button onClick={() => this.deleteBook(book._id)}
          >Remove Book</Button>
          <Button onClick={()=> this.setState({ showUpdateForm: true, currentBook: book })}>Update Book</Button>

        </Carousel.Caption>

        
      </Carousel.Item>  

    )



    return (
      <>

        {this.state.books.length > 0 ? (
          <Carousel variant="dark">
            {booksToRender}
          </Carousel>
        ) : (
          <>
          <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
          <h3>No Books Found 😱</h3>
          </>
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

export default withAuth0(BestBooks);
