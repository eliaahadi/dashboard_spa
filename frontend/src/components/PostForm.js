import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {createCart} from '../actions/actionCreators';
// import moment from 'moment';

class PostForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      company: "",
      latestStockPrice: "",
      // stocksNumberBought: "",
      // totalStocksPrice: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    await this.setState({company: event.target.value});
    let AAPLdate, AAPLlatest;
    let GOOGLdate, GOOGLlatest;
    let AMZNdate, AMZNlatest;

    if (this.state.company) {
      AAPLdate = new Date(Math.max.apply(null, this.props.stocks.stocks[0].historical.map(function(e) {
        return new Date(e.date);
      })));
      AAPLlatest = this.props.stocks.stocks[0].historical.filter( e => { 
        var d = new Date( e.date ); 
        return d.getTime() === AAPLdate.getTime();
      })[0];

      GOOGLdate = new Date(Math.max.apply(null, this.props.stocks.stocks[1].historical.map(function(e) {
        return new Date(e.date);
      })));
      GOOGLlatest = this.props.stocks.stocks[1].historical.filter( e => { 
        var d = new Date( e.date ); 
        return d.getTime() === GOOGLdate.getTime();
      })[0];

      AMZNdate = new Date(Math.max.apply(null, this.props.stocks.stocks[2].historical.map(function(e) {
        return new Date(e.date);
      })));
      AMZNlatest = this.props.stocks.stocks[2].historical.filter( e => { 
        var d = new Date( e.date ); 
        return d.getTime() === AMZNdate.getTime();
      })[0];
    }
      
    if (this.state.company === 'AAPL' && typeof(AAPLlatest)=== 'object' ) {
      await this.setState({latestStockPrice: AAPLlatest.close})
    }
    if (this.state.company === 'GOOGL' && typeof(GOOGLlatest)=== 'object' ) {
      await this.setState({latestStockPrice: GOOGLlatest.close})
    }
    if (this.state.company === 'AMZN' && typeof(AMZNlatest)=== 'object' ) {
      await this.setState({latestStockPrice: AMZNlatest.close})
    }
  }
   
  handleSubmit = (e) => {
    e.preventDefault();
    const company = this.state.company;
    const stocks_bought = parseInt(this.getStockNumber.value);
    const latest_stock_price = this.state.latestStockPrice;
    const total_stocks_price = parseInt(stocks_bought * latest_stock_price);
    const editing = false;

    if (total_stocks_price >= 1000000) {
      alert('You cannot buy over $1,000,000 amount')
      return;
    } 

    // const data = 
    // // [
    //   // ...this.props.carts,
    //   {
    //     company,
    //     stocks_bought,
    //     latest_stock_price,
    //     total_stocks_price,
    //     editing
    //   }
    // ]
    // this.props.createCart(data)
    this.props.createCart(company, stocks_bought, latest_stock_price, total_stocks_price, editing)
    // this.props.dispatch({
    //   type: 'ADD_CART',
    //   data
    // })
    this.getStockNumber.value = '';
  }

  render() {
    const { stocks } = this.props;
 
    if (stocks.loading) {
      return <div></div>;
    }

    return (
    <div className="post-container">
      <h1 className="post_heading">Buy Stock</h1>
      <form className="form" onSubmit={this.handleSubmit} >
      <label>
          Choose company to get latest stock price:
          <select value={this.state.company} onChange={this.handleChange}>
            <option value="AAPL">Apple</option>
            <option value="GOOGL">Google</option>
            <option value="AMZN">Amazon</option>
          </select>
        </label>
      <div>{this.state.company}</div>
      <div>{this.state.latestStockPrice}</div>
      <input required type="text" ref={(input) => this.getStockNumber = input}
        placeholder="Enter amount of stocks you want" 
      />
      <button>Buy</button>
      </form>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    carts: state.carts,
    stocks: state.stocks,
    loading: state.loading,
  }
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({
    createCart: createCart
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
// export default connect(mapStateToProps)(PostForm);
