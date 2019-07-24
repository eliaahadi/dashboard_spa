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
    axios.get("https://financialmodelingprep.com/api/v3/historical-price-full/AAPL,GOOGL,AMZN")
    .then(function(response){
      console.log('response STOCKS data ', response)
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
    console.log('\n \n create cart action creator -> ', company, stocks_bought,latest_stock_price, total_stocks_price)
    // console.log('\n \n create cart action creator -> ', carts)
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
      // console.log('\n \n carts  ', this.props.carts)
      // dispatch(addCart(response.data.id, response.data.company, response.data.stocks_bought, response.data.latest_stock_price, response.data.total_stocks_price))
      // dispatch(addCart(response.data))
      // const cartsData = [ ...this.props.carts, response.data ]

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
      console.log('response CARTS data ', response)
      dispatch(getCartsSuccess(response.data))
    })
    .catch(function(err){
      dispatch(getCartsFailure(err))
    })
  }
}

// UPDATE CART (UPDATE)
export function updateCart(carts) {
  axios.put(`http://localhost:3000/api/carts/`, {carts: carts})
  .then(response => {
  this.props.dispatch(editCart(carts))
  })
  .catch(error => console.log(error))      
}

// DELETE CART (DELETE)
export function deleteCart(id) {
  axios.delete(`http://localhost:3000/api/carts/${id}`)
  .then(response => {
  this.props.dispatch(removeCart(id))
  })
  .catch(error => console.log(error))
}



