import React, { Component } from 'react';
import './App.css';
import './Search.css'
import Input from './AdressInput';
import Results from './Results';
import {categories} from './constants.js';

const baseUrl = 'http://127.0.0.1:5000/nearby';

var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

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
    return (
      <div>
        <Input setQuery={this.setQuery} fetch={this.fetchResults} query={this.state.query} categories={categories}>
        </Input>

        {isEmpty(this.state.yelpData)== false ? <div className="results-card">
          {Object.keys(this.state.yelpData).map( category =>
          <Results results={this.state.yelpData[category]} category={category} />
        )}
        </div> : null }
      </div>
    );
  }
}

export default Search;
