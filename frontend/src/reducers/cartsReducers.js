import { GET_CARTS_LOADING, GET_CARTS_SUCCESS, GET_CARTS_REJECTED, ADD_CART, UPDATE_CART, EDIT_CART, DELETE_CART } from '../actions/actionTypes'

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
      return {...state, loading: false, error: null, carts: [...state.carts, action.data]}

      case DELETE_CART:
            const newState = Object.assign([], state.carts);
                    const currentCartToDelete = [...state.carts];
            const indexOfCartToDelete = currentCartToDelete.findIndex(cart => {
              return cart.id === action.data
            })
            newState.splice(indexOfCartToDelete, 1);
            // browserHistory.push('/cats');
            // console.log('\n delete reducer ', state, action, newState, indexOfCartToDelete)
      return  {...state, loading: false, error: null, carts: newState};


    case EDIT_CART:
      // console.log('\n \n edit cart reducer ', state, state.carts, action)
      // console.log('\n \n edit cart mapping', state.carts.map((cart) => cart))
      let editC = state.carts.map((cart) => {
        if (cart.id === action.id) {
          cart.editing = true;
          // let returnValue = { ...cart, editing: !cart.editing };
          // console.log('if ID equal ', cart, action)
          // console.log('return Value ', returnValue)
          return cart;
          // return cart;
        } else {
          // console.log('if ID NOT equal ', cart, action)
          // return { cart, editing: cart.editing };
          return cart;
        }
      }) 
      let returnData = {...state, loading: false, error: null, carts: editC}
      // console.log('\n \n return value of EDIT CART ', editC, returnData)
    return returnData;
    case UPDATE_CART:
      let updateDataMap = state.carts.map((cartData) => {
        // console.log('\n \n update cart reducer ', state, action, cartData)
          if (cartData.id === action.data.id) {
            let updatedCart = {
              ...cartData,
              stocks_bought: action.data.stocks_bought,
              total_stocks_price: action.data.total_stocks_price,
              editing: !cartData.editing
            }
            return updatedCart;
          } 
          else return cartData;
        
      })
      let updateReturn = {...state, loading: false, error: null, carts: updateDataMap};
      // console.log('\n \n update cart return Data ', updateDataMap, updateReturn)
      return updateReturn;
    default:
      return state;
  }
}

export default cartsReducers;