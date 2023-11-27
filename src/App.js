import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";
function App() {
  const storageKey = 's10d1';
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState(baslangicCartGetir(storageKey));

  

  function localStorageWrite(key , data) {
    localStorage.setItem(key , JSON.stringify(data));
  }
  function localStorageRead(key) {
    return JSON.parse(localStorage.getItem(key))
  }

  function baslangicCartGetir(key) {
    const eskiListe = localStorage.getItem(key);
    if(eskiListe) {
      return localStorageRead(key);
    }
    else{
      return []
    }
  }
 
  const addItem = (item) => {
    // verilen itemi sepete ekleyin
    const isIncludes = cart.filter(kart => kart.id ==item.id);
    if (isIncludes.length !== 0) {
      setCart([...cart]);
    }
    else{
      setCart([...cart , item])
    }
    
  };
  const removeItem = (cartItem) => {
    const remainingCart = cart.filter(item => item.id !== cartItem.id )
    setCart(remainingCart)
  }
  useEffect(() => {
    
    localStorageWrite(storageKey,cart);
  } , [addItem,removeItem])
  
  useEffect(() => {
    localStorageRead(storageKey);
  },[cart])

  
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
