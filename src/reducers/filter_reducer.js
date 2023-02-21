import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {

  const { type, payload } = action;

  if (type === LOAD_PRODUCTS) {

    return {
      ...state, all_products: [...payload], filtered_products: [...payload]
    }
  }

  if (type === SET_GRIDVIEW) {
    return {
      ...state, grid_view: true
    }
  }

  if (type === SET_LISTVIEW) {
    return {
      ...state, grid_view: false
    }
  }

  if (type === UPDATE_SORT) {
    return {
      ...state, sort: payload
    }
  }

  if (type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;

    let tempProducts = [...filtered_products];

    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price)
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price)
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }
    return { ...state, filtered_products: tempProducts }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
