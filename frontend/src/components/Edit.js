
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateCart} from '../actions/actionCreators';

class Edit extends Component {

  handleEdit = (e) => {
    e.preventDefault();
    // const company = this.props.carts.company;
    const stocks_bought = parseInt(this.getStockNumber.value);
    const latest_stock_price = this.props.carts.latest_stock_price;
    const total_stocks_price = parseInt(stocks_bought * latest_stock_price);
    
    if (total_stocks_price >= 1000000) {
      alert('You cannot buy over $1,000,000 amount')
      return;
    } 

    const data = 
      {
        stocks_bought,
        total_stocks_price
      }

      console.log('edit component handle edit ', stocks_bought, total_stocks_price)
    this.props.updateCart(this.props.carts.id, data)

    this.getStockNumber.value = '';
  }

  render() {
    console.log('edit component this.props', this.props, this.props.carts)
    return (
    <div key={this.props.carts.id} className="post">
      <form className="form" onSubmit={this.handleEdit}>
        <div>{this.props.carts.company}</div>
        <div>{this.props.carts.stocks_bought}</div>
          <br /><br />
          <input required type="text" ref={(input) => this.getStockNumber = input}
        placeholder="Enter updated amount of stocks you want" 
      />
        <button>Update</button>
      </form>
    </div>
    );
  }
}

// export default connect()(Edit);

function mapDispatchToProps(dispatch, ownProps){
  return bindActionCreators({
    updateCart: updateCart
  }, dispatch)
}

// export default connect(mapStateToProps, mapDispatchToProps)(Post);
export default connect(null, mapDispatchToProps)(Edit);
