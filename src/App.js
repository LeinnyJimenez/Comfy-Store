import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import { About, Cart, Checkout, Home, Products, SingleProduct, Error, Private, AuthWrapper } from './pages'

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='about' element={<About />} />
          <Route exact path='cart' element={<Cart />} />
          <Route exact path='checkout' element={<Private><Checkout /></Private>} />
          <Route exact path='/products' element={<Products />} />
          <Route exact path='/products/:id' element={<SingleProduct />} />
          <Route exact path='*' element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  )
}

export default App
