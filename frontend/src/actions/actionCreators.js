import { GET_STOCKS_LOADING, GET_STOCKS_REJECTED, GET_STOCKS_SUCCESS, GET_CARTS_SUCCESS, GET_CARTS_LOADING, GET_CARTS_REJECTED, ADD_CART, EDIT_CART, DELETE_CART } from '../actions/actionTypes'
import axios from 'axios';


function getStocksLoading() {
  return { type: GET_STOCKS_LOADING}
}

function getStocksSuccess(stocks) {
  return { type: GET_STOCKS_SUCCESS, data: stocks }
}

function getStocksFailure(err) {
  return { type: GET_STOCKS_REJECTED, err: err }
}

function getCartsLoading() {
  return { type: GET_CARTS_LOADING}
}

function getCartsSuccess(carts) {
  return { type: GET_CARTS_SUCCESS, data: carts }
}

function getCartsFailure(err) {
  return { type: GET_CARTS_REJECTED, err: err }
}

// function addCart(id, company, stocks_bought, latest_stock_price, total_stocks_price) {
//   return { 
//     type: ADD_CART, 
//     id: id,
//     company: company,
//     stocks_bought: stocks_bought,
//     latest_stock_price: latest_stock_price, 
//     total_stocks_price: total_stocks_price
//   }
// }

// function addCart(carts) {
//   return { 
//     type: ADD_CART, 
//     carts: carts
//   }
// }

function editCart(carts) {
  return { type: EDIT_CART, carts: carts}
}

function removeCart(index) {
  return { type: DELETE_CART, index: index }
}


// GET STOCKS (READ)
export function getStocks() {
  return function(dispatch){
    dispatch(getStocksLoading());
    // axios.get("https://financialmodelingprep.com/api/v3/historical-price-full/AAPL,GOOGL,AMZN")
    axios.get("https://financialmodelingprep.com/api/v3/historical-price-full/AAPL,GOOGL,AMZN?timeseries=2")
    .then(function(response){
      dispatch(getStocksSuccess(response.data.historicalStockList))
    })
    .catch(function(err){
      dispatch(getStocksFailure(err))
    })
  }
}


// addNewList(title, excerpt) {
//   axios.post( '/api/v1/lists', { list: {title, excerpt} })
// .then(response => {
//     console.log(response)
//     const lists = [ ...this.state.lists, response.data ]
//     this.setState({lists})
// })
//   .catch(error => {
//       console.log(error)
// }	)
// }

// CREATE CART (CREATE)
export function createCart(company, stocks_bought, latest_stock_price, total_stocks_price) {
  return function(dispatch){
    axios.post('http://localhost:3000/api/carts', 
      {
        cart: {
          company,
          stocks_bought,
          latest_stock_price, 
          total_stocks_price
        }
      }
    )
    .then(function(response){
      console.log('\n \n create cart response successful! ', response)
      dispatch({type: ADD_CART, data: response.data})
    })
    .catch(function(err){
      console.log('\n \n catch error ', err)
      dispatch({
        type:"CREATE_CART_REJECTED",
        msg: 'error when adding an item to the cart'})
    })
  }
}

// export function addToCart(cart){
//   return function(dispatch){
//     axios.post("http://localhost:3000/api/cart", cart)
//     .then(function(response){
//       dispatch({type:"ADD_TO_CART",
//       payload:response.data})
//     })
//     .catch(function(err){
//       dispatch({type:"ADD_TO_CART_REJECTED", msg:
//       'error when adding to the cart'})
//     })
//   }
// }


// GET CART (READ)
export function getCarts() {
  return function(dispatch){
    dispatch(getCartsLoading());
    axios.get("http://localhost:3000/api/carts")
    .then(function(response){
      console.log('response GET CARTs ', response)
      dispatch(getCartsSuccess(response.data))
    })
    .catch(function(err){
      dispatch(getCartsFailure(err))
    })
  }
}

// UPDATE CART (UPDATE)
export function updateCart(carts) {
  return function(dispatch) {
    axios.put(`http://localhost:3000/api/carts/`, {carts: carts})
    .then(response => {
    dispatch(editCart(carts))
    })
    .catch(error => console.log(error))      
  }
}
var config = {
  headers: {   
    'Access-Control-Allow-Origin': '*', 
    'Content-Type': 'application/json' 
  }
};

// export function deleteBooks(id){
  // return function(dispatch){
    // axios.delete("/api/books/" + id)

// DELETE CART (DELETE)
export function deleteCart(id) {
  return function(dispatch) {
    console.log('delete action creator ', id)
    axios.delete('/api/carts/' + id, {
    // axios.delete(`http://localhost:3000/api/carts/${id}`, {
        'Content-Type': 'application/json' 
    })
    .then(response => {
      console.log('delete RESPONSE ', response, id)
      // this.props.dispatch(removeCart(id))
      dispatch({type: DELETE_CART, data: id})
      // dispatch(getCartsSuccess(response.data))
      // dispatch(removeCart(id))
    })
    .catch(error => console.log(error))
  }
}



