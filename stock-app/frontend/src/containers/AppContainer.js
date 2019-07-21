import React, { Component } from 'react';
import PostForm from '../components/PostForm';
import AllCarts from '../components/AllCarts';
import CompareStocks from '../components/CompareStocks';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {getStocks} from '../actions/stocksActions';
import {getCarts} from '../actions/stocksActions';

class AppContainer extends Component {
  componentDidMount() {
    this.props.getStocks();
    this.props.getCarts();
  }

  render() {
    return (
      <div className="App">
        <div className="navbar">
          <h2 className="center ">Stock Exchange</h2>
        </div>
        <CompareStocks />
        <PostForm />
        <AllCarts />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stocks: state.stocks,
    carts: state.carts,
    loading: state.loading,
    error: state.error,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getStocks: getStocks,
    getCarts: getCarts
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);