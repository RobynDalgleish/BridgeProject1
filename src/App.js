import React, { Component } from "react";
import { fetchLcboEndpoint } from "./api/lcbo.js";
import { fetchGmapEndpoint } from "./api/gmap.js";
import { GoogleMap, Marker } from "react-google-maps"


class App extends Component {

  constructor() {
    super();
    this.state = {
      userQuery: '',
      submit: '',
      productsArray: [],
      storesArray: [],
      searchQuery: '',
      userLocation: '',
    }
    // don't need to bind like below if an arrow function is used

    // this.submit = this.submit.bind(this);
    // this.initialSearch = this.initialSearch.bind(this);
    // this.getProductId = this.getProductId.bind(this);
    // this.updateSearch = this.updateSearch.bind(this);
  }

  initialQuerySearch = (e) => {
    this.setState({userQuery: e.target.value});
  }

  initialLocationSearch = (e) => {
    this.setState({userLocation: e.target.value});
  }

  getProductId(inputedProduct){
    console.log(inputedProduct);
    fetchLcboEndpoint("products", {
        q: `${inputedProduct}`
    }).then(data => {
      console.log(data);

      this.setState({
        productsArray: data.result
      })
    });
  }

  getLatLng(inputedLocation) {
    console.log(inputedLocation);
  }

  getStore(productId){
      fetchLcboEndpoint("inventories", {
          product_id: `${productId}`
      }).then(data => {
        console.log(data);
        this.setState({
          storesArray: data.result
        })
      });
      // this.MyMapComponent()
  }

  submit = (e) => {
    e.preventDefault();
    // prevents page reload and passes the inputed text to getProductId, and also calls that function
    const inputedProduct = this.state.userQuery;
    const inputedLocation = this.state.userLocation;
    this.getProductId(inputedProduct)
    this.getLatLng(inputedLocation)
  }

  click = (e) => {
    e.preventDefault();
    console.log(e.target.id)
    const chosenProduct = e.target.id;
    const productsArrayFiltered = this.state.productsArray.filter((result) => result.name === chosenProduct)
    console.log(productsArrayFiltered)
    const productId = productsArrayFiltered[0].id
    console.log(productId)
    this.getStore(productId)
  }

  // MyMapComponent = (props) =>
  //   <GoogleMap
  //     defaultZoom={8}
  //     defaultCenter={{ lat: -34.397, lng: 150.644 }}
  //   >
  //     {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  //   </GoogleMap>


  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <label htmlFor="userQuery"><span className="visuallyhidden">Search for an LCBO product</span></label>
          <input type="text" id="userQuery" value={this.state.userQuery} onChange={this.initialQuerySearch} placeholder="Search for an LCBO product" />

          <label htmlFor="userLocation"><span className="visuallyhidden">Enter a location</span></label>
          <input type="text" id="userLocation" value={this.state.userLocation} onChange={this.initialLocationSearch} placeholder="Enter a location" />
          <button 
            type="submit"> 
            Go! 
          </button>
        </form>
        <div>
          {
            this.state.productsArray.map((result, i) => {
              return(
                <button key={i} id={result.name} onClick={this.click}>
                  {result.name}
                </button>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
