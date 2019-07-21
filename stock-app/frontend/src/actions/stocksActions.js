// "use strict"
import axios from 'axios';

// GET STOCKS (READ)
export function getStocks() {
  return function(dispatch){
    dispatch({type:"GET_STOCKS_LOADING"});
    axios.get("https://financialmodelingprep.com/api/v3/historical-price-full/AAPL,GOOGL,AMZN")
    .then(function(response){
      dispatch({type:"GET_STOCKS_SUCCESS", data:response.data.historicalStockList})
    })
    .catch(function(err){
      dispatch({type:"GET_STOCKS_REJECTED", data:err})
    })
  }
}

// GET CART (READ)
export function getCarts() {
  return function(dispatch){
    dispatch({type:"GET_CARTS_LOADING"});
    axios.get("http://localhost:3000/api/carts")
    .then(function(response){
      dispatch({type:"GET_CARTS_SUCCESS", data:response.data})
    })
    .catch(function(err){
      dispatch({type:"GET_CARTS_REJECTED", data:err})
    })
  }
}