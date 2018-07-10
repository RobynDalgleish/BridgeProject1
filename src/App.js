import React, { Component } from "react";
import { fetchLcboEndpoint } from "./api/lcbo.js";

class App extends Component {

  constructor() {
    super();
    this.state = {
      userText: '',
      submit: '',
      productsArray: [],
      chosenProduct: '',
    }
    this.submit = this.submit.bind(this);
    // this.initialSearch = this.initialSearch.bind(this);
    // this.getProductId = this.getProductId.bind(this);
    // this.updateSearch = this.updateSearch.bind(this);
  }

  initialSearch = (e) => {
    // e.preventDefault();
    this.setState({userText: e.target.value});
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

  // getStore(productId){

  // }

  submit(e) {
    e.preventDefault();
    // prevents page reload and passes the inputed text to getProductId, and also calls that function
    const inputedProduct = this.state.userText;
    this.getProductId(inputedProduct)
  }

  click(e){
    e.preventDefault();
    console.log(e.target.id)
    // this.setState({chosenProduct: e.target.value});
    // const productsArrayFiltered = this.state.productsArray.filter((result) => result.name === chosenProduct)
    // const productId = productsArrayFiltered.id
    // console.log(productId)
    // this.getStore(productId)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <label htmlFor="userText"><span className="visuallyhidden">Search for an LCBO product</span></label>
          <input type="text" id="userText" value={this.state.userText} onChange={this.initialSearch} placeholder="Search for an LCBO product" />
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
