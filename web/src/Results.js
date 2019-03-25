import React, { Component } from 'react';
import './Results.css';

//const { createApolloFetch } = require('apollo-fetch');

function printResults(resturantData) {
  const stringData = JSON.stringify(resturantData);
  return (
    <p>{stringData}</p>
  )
}

function getCategoryDiv(categoryName) {
  return (
    <div className="category-text">
      {categoryName}
    </div>
  )
}

function formatDist(distInMeters)
{
  const distInKm = distInMeters / 1000;
  const distInMi = distInKm / 0.62;
  const twoDigits = distInMi.toFixed(2);
  return twoDigits;
}

class CategoryResult extends Component {
  constructor(props) {
    super(props)

    this.state= {
      listOpen : false
    }
  }

  toggleList(){
  this.setState(prevState => ({
    listOpen: !prevState.listOpen
  }))
    }

  getDetails(props){
    let counter = 1;
    return (<div>{props.data.map( loc =>
      <div>
      <Item
        rank = {counter++}
        name={loc.name}
        distance={loc.distance}
        rating={loc.rating}
      />
      </div>
    )
  }</div>)
  }

  render() {
    const categoryName = "Coffee";

    const category = getCategoryDiv(categoryName);
    const list = this.getDetails(this.props);
    //TODO: can you do this functionally?
    const buffer = this.props.data.length > 0 ? (<div className="results-buffer" />) : null;
    return(
    <div>
    {this.props.data.length > 0 ? (
      <div>
        <div className="category" onClick={() => this.toggleList()}> {category} </div>
        <div className="category-results">
            {buffer}
            {this.state.listOpen ? list: null}
        </div>
      </div>
    ) : null
  }
    </div>
  );
  }
}

class Item extends Component {
  render() {
    const locName = this.props.name;
    const Name = (
      <span className="item-name">
      {locName}
      </span>
    )
    const formattedDist= formatDist(this.props.distance);
    const milesDiv = (
      <span className="miles-postfix" >miles</span>
    )
    const dist = (
      <span className="distance">
      <span className="distance-number">
      {formattedDist}
      {milesDiv}
      </span>
      </span>
    )

    const distElem = (<span className="distance">{dist}{milesDiv}</span>);

    const rating = (<div className="item-rating">{this.props.rating}</div>)

    const Details = (
      <div className="item-details">
      {Name}
      {distElem}
      {rating}
      </div>
    )


    return(
    <div className="item">
    <span className="item-rank">{this.props.rank}</span>
      {Details}
    </div>
  );
  }
}
class Results extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    const resultText = printResults(this.props.results);
    return (
      <div className="results">
      <CategoryResult data={this.props.results} />
      </div>
    );
  }
}

export default Results;
