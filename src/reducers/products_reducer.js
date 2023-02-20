import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {
  const { type, payload } = action;

  if (type === SIDEBAR_OPEN) {
    return {
      ...state,
      isSidebarOpen: true
    }
  }

  if (type === SIDEBAR_CLOSE) {
    return {
      ...state,
      isSidebarOpen: false
    }
  }

  if (type === GET_PRODUCTS_BEGIN) {
    return {
      ...state, products_loading: true
    }
  }

  if (type === GET_PRODUCTS_SUCCESS) {
    const featured_produtcs = payload.filter(product => product.featured === true)

    return {
      ...state,
      products_loading: false,
      products: payload,
      featured_produtcs
    }
  }

  if (type === GET_PRODUCTS_ERROR) {
    return {
      ...state, products_loading: false, products_error: true
    }
  }


  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer
