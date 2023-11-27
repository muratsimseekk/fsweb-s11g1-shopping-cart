import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";
function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    // verilen itemi sepete ekleyin
    setCart([...cart , item])
  };
  const removeItem = (cartItem) => {
    const remainingCart = cart.filter(item => item.id !== cartItem.id )
    setCart(remainingCart)
  }
  
  
  return (
    <ProductContext.Provider value={{products,addItem}}>
      <CartContext.Provider value={{cart,removeItem}}>
        <div className="App">
          <Navigation />

          {/* Routelar */}
          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </main>
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
