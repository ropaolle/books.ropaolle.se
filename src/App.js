import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Image } from 'cloudinary-react';
import filesize from 'filesize';

class App extends Component {
  constructor() {
    super();
    this.state = { books: [], selected: undefined };
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:3001/api/books');
    const books = await response.json();
    if (books.length > 0) {
      this.setState({ books, selected: books[0].uuid });
    }
  }

  handleClick = (uuid) => {
    this.setState({
      selected: uuid,
    });
  }

  handleKeyPress = () => {
    this.setState(state => ({
      selected: !state.selected,
    }));
  }

  render() {
    const { books, selected } = this.state;

    const cssGrid = books.map(el => (
      <div className="Book Focus" key={el._id} tabIndex="0" onClick={this.handleClick.bind(this, el.uuid)} onKeyPress={this.handleKeyPress} role="button">
        <Image cloudName="dw2asxnil" publicId={`/books/${el.uuid}.jpg`} width="125" height="188" crop="scale" />
      </div>
    ));

    const info = books.filter(el => el.uuid === selected).map(el => (

      <div className="Info" key={el._id}>
        <Image cloudName="dw2asxnil" publicId={`/books/${el.uuid}.jpg`} width="200" height="300" crop="scale" />
        <div className="font-weight-bold mt-2">{el.title}</div>
        <div>{el.authors}</div>
        <div className="font-italic mt-2">Storlek: {filesize(el.size)}</div>
        {el.tags && <div className="small">Taggar: {el.tags}</div>}
        <div className="mt-3">{el.comments}</div>
      </div>

    ));

    return (
      <div className="App">
        <div className="Wrapper">
          <div className="Header">books.ropaolle.se</div>
          <div className="Sidebar">
            <div className="Info-wrapper">
              {info}
            </div>
          </div>
          <div className="Content">{cssGrid}</div>
          <div className="Footer">books.ropaolle.se</div>
        </div>
      </div>
    );
  }
}

export default App;
