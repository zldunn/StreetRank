import React, { Component } from 'react';
import './App.css';
import Input from './AdressInput';
import Results from './Results';
import {categories} from './constants.js';

const baseUrl = 'http://127.0.0.1:5000/nearby';
class Search extends Component {

  constructor(props) {
    super(props)

    this.state = {
      query : '',
      yelpData : {},
    };
    this.fetchResults = this.fetchResults.bind(this)
    this.setQuery = this.setQuery.bind(this)
  }

  fetchResults(address, category, n = 3) {
    fetch(baseUrl, {
      headers: {
        "content-type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({
        'address': address,
        'term': category
      }),
    }).then( results => {
      return results.json()
      }).then( data => {
        const variable = "cat"
        const combinedData = {...this.state.yelpData, [category]: data.data.search.business};
        console.log(combinedData)
        this.setState({...this.state,  yelpData: combinedData }
                        )
      }).catch((error) => {
        if( n != 0){
          this.fetchResults(address, category, 0)
        } else {
          console.log("error making api call")
        }}
      )
  }

  setQuery(event) {
    this.setState({
      query: event.target.value
    });
  }

  render() {
    console.log(categories);;
    return (
      <div>
        <Input setQuery={this.setQuery} fetch={this.fetchResults} query={this.state.query} categories={categories}>
        </Input>
          {Object.keys(this.state.yelpData).map( category =>
          <Results results={this.state.yelpData[category]} category={category} />
        )}
      </div>
    );
  }
}

export default Search;
