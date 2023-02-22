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
    let maxPrice = payload.map(p => p.price);

    maxPrice = Math.max(...maxPrice)

    return {
      ...state,
      all_products: [...payload],
      filtered_products: [...payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice }
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

  if (type === UPDATE_FILTERS) {

    const { name, value } = payload

    return {
      ...state,
      filters: { ...state.filters, [name]: value }
    }
  }

  if (type === FILTER_PRODUCTS) {

    const { all_products } = state
    const { text, company, category, color, price, min_price, max_price, shipping } = state.filters
    let tempProducts = [...all_products];

    // filtering by text
    if (text) {
      tempProducts = tempProducts.filter(product => {
        return product.name.toLowerCase().startsWith(text)
      })
    }

    // filtering by category
    if (category !== 'all') {
      tempProducts = tempProducts.filter(product => product.category === category);
    }

    // filtering by company
    if (company !== 'all') {
      tempProducts = tempProducts.filter(product => product.company === company)
    }

    // filtering by colors
    if (color !== 'all') {
      tempProducts = tempProducts.filter(product => {
        return product.colors.find((c) => c === color)
      })
    }

    // filtering by price 

    tempProducts = tempProducts.filter(product => product.price <= price);

    // filtering by shipping
    if (shipping) {
      tempProducts = tempProducts.filter(product => product.shipping === true)
    }

    return { ...state, filtered_products: tempProducts }
  }

  if (type === CLEAR_FILTERS) {

    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false
      }
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
