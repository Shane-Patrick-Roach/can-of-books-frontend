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
      showAddButton: true
    }
  }

  

  getBooksInfo = async () => {
    console.log('error');
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


  componentDidMount() {
    this.getBooksInfo();
  }




  render() {
 
    let booksToRender = this.state.books.map((book, idx) =>
      <Carousel.Item key={idx}>
        <img src="https://via.placeholder.com/1200x550/333/808080%20C/O%20https://placeholder.com/" alt='hello'></img>

        <Carousel.Caption>
          <h3>{book.title}</h3>
          <Button onClick={() => this.deleteBook(book._id)}>Remove Book</Button>
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

      </>
    )
  }
}

export default BestBooks;
