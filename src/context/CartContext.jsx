import { createContext, useContext, useState } from "react";

const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    const index = cartItems.findIndex((ci) => ci.id === id);
    setCartItems((prev) => prev.splice(index, 1));
    // setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const increaseQuantity = (id) => {
    const index = cartItems.findIndex((ci) => ci.id === id);

    if (index !== -1) {
      const ciCpy = [...cartItems];
      ciCpy[index].quantity = ciCpy[index].quantity + 1;
      setCartItems([...ciCpy]);
    }

    // setCartItems(
    //   cartItems.map((item) =>
    //     item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    //   )
    // );
  };
  const decreaseQuantity = (id) => {
    const index = cartItems.findIndex((ci) => ci.id === id);
    if (index !== -1) {
      const ciCpy = [...cartItems];
      ciCpy[index].quantity = Math.max(ciCpy[index].quantity - 1, 1);
      setCartItems([...ciCpy]);
    }
    // setCartItems(
    //   cartItems.map((item) =>
    //     item.id === id
    //       ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
    //       : item
    //   )
    // );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
