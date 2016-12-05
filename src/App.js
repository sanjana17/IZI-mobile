import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './table';
class App extends Component {
  render() {
    return (
        <div className="row">
            <div  className="row jumbotron"><h1><center>Funeral Info</center></h1></div>
      <div className="App container">
          <Table />
      </div>
        </div>
    );
  }
}

export default App;
