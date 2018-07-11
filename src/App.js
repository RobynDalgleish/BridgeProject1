import React, { Component } from "react";
import { fetchLcboEndpoint } from "./api/lcbo.js";
// import { fetchGmapEndpoint } from "./api/gmap.js";
// import { GoogleMap, Marker } from "react-google-maps"


class App extends Component {

  constructor() {
    super();
    this.state = {
      productQuery: '',
      locationQuery: '',
      productsArray: [],
      storeLocationsArray: [],
      LatLngArray: [],
    }
    // don't need to bind like below if an arrow function is used
    // this.submit = this.submit.bind(this);
  }

  // 1.) onChange, setState to the value of the input fields. Store the product and location in state.
  initialQuerySearch = e => {
    this.setState({productQuery: e.target.value});
  }
  initialLocationSearch = e => {
    this.setState({locationQuery: e.target.value});
  }

  // 2.) onSubmit, prevent the page from reloading, and call the getProductId function passing in 'inputedProduct' as a parameter (productQuery from state)
  submit = e => {
    e.preventDefault();
    const inputedProduct = this.state.productQuery;
    this.getProductId(inputedProduct);
  }

  // 3.) Using the inputProduct, get make a call to the LCBO API to and store the resulting data in state. Render the names of everything in the productsArray as buttons.
  getProductId = inputedProduct => {
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

  // 4.) onClick (of a button containing the name of a product) filter the productsArray to grab the id of the corresponding product name, Then call the getLocationsForGmap function.
    click = e => {
      e.preventDefault();
      console.log(e.target.id)
      const chosenProduct = e.target.id;
      const productsArrayFiltered = this.state.productsArray.filter(result => result.name === chosenProduct)
      console.log(productsArrayFiltered)
      const productId = productsArrayFiltered[0].id
      console.log(productId)
      const inputedLocation = this.state.locationQuery;
      this.getStoreLocations(productId, inputedLocation);
    }

  // 5.) Use the product id and the location as query parameters to grab the stores that fit both those criteria (have the product and are in that location). Store that as storeLocationsArray in state.
  getStoreLocations = (productId, inputedLocation) => {
    fetchLcboEndpoint("stores", {
        product_id: `${productId}`,
        geo: `${inputedLocation}`,
    }).then(data => {
      console.log(data);
      this.setState({
        storeLocationsArray: data.result
      })
      this.getLatLng();
    });
  }

  // 6.) Map through the storeLocationsArray to grab the latitude and longitude of each unique store.
  getLatLng = () => {
    const latLngArray = this.state.storeLocationsArray.map(result => {
      // console.log(result.latitude, result.longitude);
      return (
        [result.latitude, result.longitude]
      )
    })
    console.log(latLngArray);
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

          <label htmlFor="productQuery">
            <span className="visuallyhidden">Search for an LCBO product</span>
          </label>
          <input type="text" id="productQuery" value={this.state.productQuery} onChange={this.initialQuerySearch} placeholder="Search for an LCBO product" />

          <label htmlFor="locationQuery">
            <span className="visuallyhidden">Enter a location</span>
          </label>
          <input type="text" id="locationQuery" value={this.state.locationQuery} onChange={this.initialLocationSearch} placeholder="Enter a location" />

          <button type="submit"> Go! </button>

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
