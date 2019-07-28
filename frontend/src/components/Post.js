import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteCart} from '../actions/actionCreators';
import {EDIT_CART} from '../actions/actionTypes';

class Post extends Component {
  render() {
    // console.log('post component ', this.props); //{carts: {id: 1, company: "GOOGL", stocks_bought: 1, latest_stock_price: "11
    // console.log('post component with mapStateToProps', this.props); //{carts: {id: 1, company: "GOOGL", stocks_bought: 1, latest_stock_price: "11
    return (
      <div className="post">
        <h2 className="post_title">{this.props.carts.company}</h2>
        <p className="post_message">Stocks: {this.props.carts.stocks_bought}</p>
        <p className="post_message">Stock Price: {this.props.carts.latest_stock_price}</p>
        <p className="post_message">Total Price: {this.props.carts.total_stocks_price}</p>
        <div className="control-buttons">
          <button className="edit"
            onClick={this.props.editCart}
          >Edit</button>
          <button className="delete"
            key={this.props.carts.id}
            onClick={() => this.props.deleteCart(this.props.carts.id)}
          >Delete</button>
        </div>
      </div>
    );
  }
}


// const mapStateToProps = (state) => {
//   return {
//     carts: state.carts,
//     stocks: state.stocks,
//     loading: state.loading,
//   }
// }


function mapDispatchToProps(dispatch, ownProps){
  return bindActionCreators({
    deleteCart: deleteCart,
    editCart: () => {return {type: EDIT_CART, id: ownProps.carts.id}}
  }, dispatch)
}

// export default connect(mapStateToProps, mapDispatchToProps)(Post);
export default connect(null, mapDispatchToProps)(Post);

// export default connect()(Post);

