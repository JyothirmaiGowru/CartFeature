import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeCartItem = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.id !== productId),
    }))
  }

  addCartItem = product => {
    this.setState(prevState => {
      const isProductAlreadyExists = prevState.cartList.find(
        ele => ele.id === product.id,
      )

      if (isProductAlreadyExists) {
        return {
          cartList: prevState.cartList.map(item =>
            item.id === product.id
              ? {...item, quantity: item.quantity + product.quantity}
              : item,
          ),
        }
      }

      return {
        cartList: [...prevState.cartList, product],
      }
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = productid => {
    this.setState(prevstate => ({
      cartList: prevstate.cartList.map(item => item.id === productid)
        ? {...item, quantity: item.quantity + 1}
        : item,
    }))
  }

  decrementCartItemQuantity = productid => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item => item.id === productid)
        ? {...item, quantity: item.quantity - 1}
        : item,
    }))
  }
  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}
export default App
