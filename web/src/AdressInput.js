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

const baseUrl = 'http://127.0.0.1:5000/nearby';
class Input extends Component {

  constructor(props) {
    super(props)
    state = {
      query : '',
    }
  }


  handleChange(event){
   this.setState({
     query: event.target.value
   });
  }

  handleSubmit() {
    fetchResults(this.state.query)
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
