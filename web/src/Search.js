import React, { Component } from 'react';
import './App.css';
import Input from './AdressInput';
import Results from './Results';

const baseUrl = 'http://127.0.0.1:5000/nearby';
class Search extends Component {

  constructor(props) {
    super(props)

    this.state = {
      query : '',
      yelpData : [],
    };
    this.fetchResults = this.fetchResults.bind(this)
    this.setQuery = this.setQuery.bind(this)
  }

  fetchResults(address) {
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
         this.setState({yelpData: data.data.search.business})
      })
  }

  setQuery(event) {
    this.setState({
      query: event.target.value
    });
  }

  render() {
    return (
      <div>
        <Input setQuery={this.setQuery} fetch={this.fetchResults} query={this.state.query}>
        </Input>
        <Results results={this.state.yelpData} />
      </div>
    );
  }
}

export default Search;
