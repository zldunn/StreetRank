import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const { createApolloFetch } = require('apollo-fetch');

class App extends Component {

  componentDidMount() {

    const fetch = createApolloFetch({
      uri: 'https://1jzxrj179.lp.gql.zone/graphql',
    });

    fetch({
      query: '{ posts { title }}',
    }).then(res => {
      console.log(res.data);
    });

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
