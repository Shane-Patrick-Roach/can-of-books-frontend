import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      //renderBooks: false

    }
  }


  getBooksInfo = async () => {
    console.log('error');
    try{let bookData = await axios.get('http://localhost:3001/books')
    //console.log(bookData.data);

    this.setState({
      books: bookData.data
    })}catch(e){console.log(e.message)};
  }


  componentDidMount () {
    this.getBooksInfo();
    //console.log('books');
  }




  render() {
    console.log(this.state.books);
    
    let booksToRender = this.state.books.map((book, idx) => 
      <Carousel.Item key={idx}>
        <img src= "https://via.placeholder.com/400x550/333/808080%20C/O%20https://placeholder.com/" alt='hello'></img>

        <Carousel.Caption>
          <h3>{book.title}</h3>
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
          <h3>No Books Found :(</h3>
        )}

        






      </>
    )
  }
}

export default BestBooks;
