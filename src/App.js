import React, { Component } from "react";
import { fetchLcboEndpoint } from "./api/lcbo.js";

class App extends Component {

  constructor() {
    super();
    this.state = {
      userText: '',
      submit: '',
      productsArray: [],
    }
    this.submit = this.submit.bind(this);
    // this.getProductId = this.getProductId.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
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

  updateSearch(e) {
    e.preventDefault();
    this.setState({userText: e.target.value});
    console.log(e.target.value)
  }

  submit(e) {
    e.preventDefault();
    // prevents page reload and passes the inputed text to getProductId, and also calls that function
    const inputedProduct = this.state.userText;
    this.getProductId(inputedProduct)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <label htmlFor="userText"><span className="visuallyhidden">Search for an LCBO product</span></label>
          <input type="text" id="userText" value={this.state.userText} onChange={this.updateSearch} placeholder="Search for an LCBO product" />
          <button 
            type="submit"> 
            Go! 
          </button>
        </form>
        <div>
          {
            this.state.productsArray.map((result, i) => {
              return(
                <ul key={i}>
                  {result.name}
                </ul>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
