import React, { Component } from 'react';

//const { createApolloFetch } = require('apollo-fetch');

//TODO: Make this the high level and remove term
function fetchResults(address) {
  console.log("running")
  fetch(baseUrl, {
    headers: {
      "content-type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify({
      'address': address,
      'term': 'coffee'
    }),
  }).then( results => {
    return results.json()
    }).then( data => {
      return false
    })
}

function printResults(resturantData) {
  const stringData = JSON.stringify(resturantData);
  return (
    <p>{stringData}</p>
  )
}
const baseUrl = 'http://127.0.0.1:5000/nearby';
class Input extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query : '',
    };

    //TODO: learn more about what this binding does
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
   this.setState({
     query: event.target.value
   });
 }

  handleSubmit(event) {
    fetchResults(this.state.query)
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder = "Enter an address!"
          value={this.state.query}
            onChange={this.handleChange}
        />
        <input
          type="submit"
        />
      </form>
    );
  }
}

export default Input;
