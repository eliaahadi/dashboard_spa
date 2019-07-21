import React, { Component } from 'react';
import { connect } from 'react-redux';

class Post extends Component {
  render() {
    return (
      <div className="post">
        <h2 className="post_title">{this.props.carts.company}</h2>
        <p className="post_message">Stocks: {this.props.carts.stocks_bought}</p>
        <p className="post_message">Stock Price: {this.props.carts.latest_stock_price}</p>
        <p className="post_message">Total Price: {this.props.carts.total_stocks_price}</p>
        {/* <div className="control-buttons">
          <button className="edit"
            onClick={() => this.props.dispatch({ type: 'EDIT_CART', id: this.props.cart.id })
          }
          >Edit</button>
          <button className="delete"
            onClick={() => this.props.dispatch({ type: 'DELETE_CART', id: this.props.cart.id })}
          >Delete</button>
        </div> */}
      </div>
    );
  }
}

export default connect()(Post);

