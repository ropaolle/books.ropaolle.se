import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Image } from 'cloudinary-react';

class App extends Component {
  constructor() {
    super();
    this.state = { data: [], selected: undefined };
  }

  async componentDidMount() {
    // const response = await fetch('https://api.coinmarketcap.com/v1/ticker/?limit=10');
    const response = await fetch('http://localhost:3001/api/books');
    // console.log(response);
    const json = await response.json();
    this.setState({ data: json });
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
    const { data, selected } = this.state;

    /* const table = data.map(el => (
      <tr key={el._id}>
        <td><Image cloudName="dw2asxnil" publicId={`/books/${el.uuid}.jpg`} width="100" crop="scale" /></td>
        <td>
          <div>Titel: {el.title}</div>
          <div>Författare: {el.authors}</div>
          <div>Taggar: {el.tags}</div>
        </td>
        <td>{el.comments}</td>
      </tr>
    ));

    const grid = data.map(el => (
      <div className="col-sm" key={el._id}>
        <Image cloudName="dw2asxnil" publicId={`/books/${el.uuid}.jpg`} width="150" height="225" crop="scale" />
      </div>
    )); */

    const cssGrid = data.map(el => (
      <div className="Box Focus" key={el._id} tabIndex="0" onClick={this.handleClick.bind(this, el.uuid)} onKeyPress={this.handleKeyPress} role="button">
        <Image cloudName="dw2asxnil" publicId={`/books/${el.uuid}.jpg`} width="125" height="188" crop="scale" />
      </div>
    ));

    const info = data.filter(el => el.uuid === selected).map(el => (
      <div className="Info" key={el._id}>
        <Image cloudName="dw2asxnil" publicId={`/books/${el.uuid}.jpg`} width="200" height="300" crop="scale" />
        <div className="font-weight-bold mt-2">{el.title}</div>
        <div>{el.authors}</div>
        {el.tags && <div className="small">Taggar: {el.tags}</div>}
        <div className="mt-3">{el.comments}</div>
      </div>
    ));


    return (
      <div className="App">
        <header className="App-header"><p>books.ropaolle.se</p></header>

        <div className="container-fluid">
          <div className="row">

            <div className="col-md-9">
              <div className="Wrapper">
                {cssGrid}
              </div>
            </div>
            <div className="col-md-3 bg-light">{info}</div>

          </div>


          {/* <div className="row">
          {grid}
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th className="w-10">Bild</th>
                <th className="w-50">Info</th>
                <th>Beskrivning</th>
              </tr>
            </thead>
            <tbody>{table}</tbody>
          </table>
        </div> */}
        </div>
      </div>
    );
  }
}

export default App;
