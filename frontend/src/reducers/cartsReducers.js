import { GET_CARTS_LOADING, GET_CARTS_SUCCESS, GET_CARTS_REJECTED, ADD_CART, EDIT_CART, DELETE_CART } from '../actions/actionTypes'

const initialState = {
  carts: [],
  loading: false,
  error: null
};

const cartsReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARTS_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_CARTS_SUCCESS: 
      return {...state, loading: false, error: null, carts:[...action.data]}
    case GET_CARTS_REJECTED: 
      return {...state, loading: false, error: action.error, carts:[...action.data]}
    case ADD_CART:
      console.log('addd cart reducer ', state, action)
      console.log('addd cart reducer2 ', [...state.carts, action.data])
      return {...state, loading: false, error: null, carts: [...state.carts, action.data]}
      // return state.concat([action.data])
      // return {...state, loading: false, error: null, carts: [...state.carts, ...action.data]}
      // {
      //   ...state,
      //   carts: [
      //     ...state.carts, ...action.data
      //   ]
      // }
    case DELETE_CART:
      return state.filter((cart) => cart.id !== action.id)
    // case 'EDIT_CART:
    //   return state.map((cart) => cart.id === action.id ? { ...cart, editing: !cart.editing } : cart)
    case EDIT_CART:
      return state.map((cart) => {
        if (cart.id === action.id) {
          return {
            ...cart,
            stocks_bought: action.data.stocks_bought,
            editing: !cart.editing
          }
        } else return cart;
      })
    default:
      return state;
  }
}

export default cartsReducers;