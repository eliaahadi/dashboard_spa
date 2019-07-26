import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
// import Edit from './Edit';

class AllCarts extends Component {
  render() {
 
    if (this.props.stocks.loading) {
      return <div></div>;
    }

    if (this.props.carts.loading) {
      return <div></div>;
    }
    console.log('all carts component ', this.props.carts)
    // console.log('all carts mapped ', this.props.carts.carts.map((cart)=> console.log('\n cart ', cart)))

    return (
      <div>
        <h1 className="post_heading">AllCartStocks</h1>
        {this.props.carts.carts && this.props.carts.carts.map((cart) => (
          <div key={cart.id}>
          <Post carts={cart} key={cart.id} />
          </div>
        ))}
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

export default connect(mapStateToProps)(AllCarts);
