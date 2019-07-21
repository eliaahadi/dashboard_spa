import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import combineReducers from './reducers/index';

// const initialState = window.INITIAL_STATE;
const middleware = applyMiddleware(thunk, logger);

const store = createStore(combineReducers, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);