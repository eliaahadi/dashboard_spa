import { GET_STOCKS_LOADING, GET_STOCKS_REJECTED, GET_STOCKS_SUCCESS, GET_CARTS_SUCCESS, GET_CARTS_LOADING, GET_CARTS_REJECTED, ADD_CART, DELETE_CART, UPDATE_CART } from '../actions/actionTypes'
// import { GET_STOCKS_LOADING, GET_STOCKS_REJECTED, GET_STOCKS_SUCCESS, GET_CARTS_SUCCESS, GET_CARTS_LOADING, GET_CARTS_REJECTED} from '../actions/actionTypes'
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

function addCart(cart) {
  return { type: ADD_CART, data: cart }
}

function editCart(cart) {
  return { type: UPDATE_CART, data: cart }
}

function removeCart(index) {
  return { type: DELETE_CART, data: index }
}


// GET STOCKS (READ)
export function getStocks() {
  return function(dispatch){
    dispatch(getStocksLoading());
    // axios.get("https://financialmodelingprep.com/api/v3/historical-price-full/AAPL,GOOGL,AMZN")
    axios.get("https://financialmodelingprep.com/api/v3/historical-price-full/AAPL,GOOGL,AMZN?timeseries=3")
    .then(function(response){
      dispatch(getStocksSuccess(response.data.historicalStockList))
    })
    .catch(function(err){
      dispatch(getStocksFailure(err))
    })
  }
}

// CREATE CART (CREATE)
export function createCart(company, stocks_bought, latest_stock_price, total_stocks_price, editing) {
  return function(dispatch){
    axios.post('/api/carts', 
      {
        cart: {
          company,
          stocks_bought,
          latest_stock_price, 
          total_stocks_price,
          editing
        }
      }
    )
    .then(function(response){
      dispatch(addCart(response.data))
    })
    .catch(function(err){
      dispatch({
        type:"CREATE_CART_REJECTED",
        msg: 'error when adding an item to the cart'})
    })
  }
}

// GET CARTS (READ)
export function getCarts() {
  return function(dispatch){
    dispatch(getCartsLoading());
    axios.get("/api/carts")
    .then(function(response){
      dispatch(getCartsSuccess(response.data))
    })
    .catch(function(err){
      dispatch(getCartsFailure(err))
    })
  }
}

// UPDATE CART (UPDATE)
export function updateCart(id, cartEditData) {
  return function(dispatch) {
    axios.put('/api/carts/' + id, cartEditData)
    .then(response => {
      dispatch(editCart(response.data))
    })
    .catch(error => console.log(error))      
  }
}

// DELETE CART (DELETE)
export function deleteCart(id) {
  return function(dispatch) {
    axios.delete('/api/carts/' + id)
    .then(response => {
      dispatch(removeCart(id))
    })
    .catch(error => console.log(error))
  }
}



// HEROKU only API
// // CREATE CART (CREATE)
// export function createCart(company, stocks_bought, latest_stock_price, total_stocks_price, editing) {
//   return function(dispatch){
//     dispatch({
//       type:"CREATE_CART",
//       cart: {
//         company,
//         stocks_bought,
//         latest_stock_price, 
//         total_stocks_price,
//         editing
//       }
//     })
//   }
// }

// // GET CARTS (READ)
// export function getCarts() {
//   return function(dispatch){
//     dispatch(getCartsLoading());
//     // axios.get("/api/carts")
//     axios.get("https://raw.githubusercontent.com/eliaahadi/dashboard_spa/master/frontend/seed.json")
//     .then(function(response){
//       dispatch(getCartsSuccess(response.data))
//     })
//     .catch(function(err){
//       dispatch(getCartsFailure(err))
//     })
//   }
// }

// // UPDATE CART (UPDATE)
// export function updateCart(id, cartEditData) {
//   return function(dispatch) {
//     cartEditData['id'] = id
//     dispatch({ 
//         type:"UPDATE_CART",
//         data: cartEditData
//     })
//   }
// }

// // DELETE CART (DELETE)
// export function deleteCart(id) {
//   return function(dispatch) {
//     dispatch({ 
//       type:"DELETE_CART",
//       id
//     })
//   }
// }