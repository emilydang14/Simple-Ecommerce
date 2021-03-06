import React, { useState, useEffect } from "react";
import "./App.css";
//Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//
import { commerce } from "./lib/commerce";

//
import Products from "./components/Products/Products";
import NavBar from "./components/NavBar/NavBar";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/CheckoutSection/Checkout/Checkout";

//
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };

  const addToCartHandler = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const updateCartQuantityHandler = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const removeItemFromCartHandler = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const emptyCartHandler = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setError(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []); //only run at the start of the render

  return (
    <Router>
      <div className="App">
        <NavBar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={addToCartHandler} />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              updateCartQuantityHandler={updateCartQuantityHandler}
              removeItemFromCartHandler={removeItemFromCartHandler}
              emptyCartHandler={emptyCartHandler}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={error}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
