// "use strict"
import {combineReducers} from 'redux';

// HERE IMPORT REDUCERS TO BE COMBINED
import stocksReducers from './stocksReducers';
import cartsReducers from './cartsReducers';

//HERE COMBINE THE REDUCERS
export default combineReducers({
  stocks: stocksReducers,
  carts: cartsReducers
})