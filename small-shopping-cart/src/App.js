import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import data from './data';
import { useState } from 'react';

function App() {
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {  // if already in basket then increase the qty 
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else { //else if not in basket put in basket qty 1
      setCartItems([...cartItems, { ...product, qty: 1 }]); //updates the basket
    }
  };
  const onRemove = (product) => { 
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) { //else if in basket with a qty of 1 then remove from basket
      setCartItems(cartItems.filter((x) => x.id !== product.id)); //updates the basket
    } else { // it is in the basket with a qty > 1, then reduce the qty by 1
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  return (
    <div className="App">
      <Header countCartItems={cartItems.length}></Header>
      <div className="row">
        <Main products={products} onAdd={onAdd}></Main>
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
        ></Basket>
      </div>
    </div>
  );
}

export default App;
