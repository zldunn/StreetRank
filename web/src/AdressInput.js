import React, { Component } from 'react';

//const { createApolloFetch } = require('apollo-fetch');

function printResults(resturantData) {
  const stringData = JSON.stringify(resturantData);
  return (
    <p>{stringData}</p>
  )
}

class Input extends Component {

  constructor(props) {
    super(props)

    //TODO: learn more about what this binding does
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
   this.props.setQuery(event);
 }


  handleSubmit(event) {
    this.props.fetch(this.props.query);
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder = "Enter an address!"
          value={this.props.query}
            onChange={this.handleChange}
        />
        <input
          type="submit"
        />
      </form>
      </div>
    );
  }
}

export default Input;
