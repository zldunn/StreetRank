import React, { Component } from 'react';
import './AdressInput.css';

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
    this.props.categories.map( category =>
      this.props.fetch(this.props.query, category)
    );
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <form id="search-bar" onSubmit={this.handleSubmit}>
      <div >
        <input
        className="search"
          placeholder = "Enter an address!"
          value={this.props.query}
            onChange={this.handleChange}
        />
        <input
        className="search-button"
          type="submit"
        />
        </div>
      </form>
      </div>
    );
  }
}

export default Input;
