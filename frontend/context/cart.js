import { useToast } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { isBrowser } from "../utils/ssr";

function getCartFromLocalStorage() {
  if (isBrowser) {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState(getCartFromLocalStorage());
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  const toast = useToast();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    let newTotal = cart.reduce((total, cartItem) => {
      return (total += cartItem.quantity * cartItem.price);
    }, 0);
    newTotal = parseFloat(newTotal.toFixed(2));
    setTotal(newTotal);
    // cart items
    let newCartItems = cart.reduce((total, cartItem) => {
      return (total += Number(cartItem.quantity));
    }, 0);
    setCartItems(newCartItems);
  }, [cart]);

  // global functions
  const removeItem = id => {
    setCart([...cart].filter(item => item.product !== id));
    toast({
      title: "Item removed from cart",
      position: "top-right",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const increaseQuantity = (id, quantity = 1) => {
    const newCart = [...cart].map(item => {
      return item.product === id
        ? { ...item, quantity: item.quantity + Number(quantity) }
        : { ...item };
    });
    setCart(newCart);
  };

  const decreaseQuantity = (id, quantity) => {
    if (Number(quantity) === 1) {
      removeItem(id);
      return;
    } else {
      const newCart = [...cart].map(item => {
        return item.product === id
          ? { ...item, quantity: item.quantity - 1 }
          : { ...item };
      });

      setCart(newCart);
    }
  };

  const addToCart = (productItem, quantity = 1) => {
    const { _id: product, image, title: name, price } = productItem;

    const item = [...cart].find(item => item.product === product);

    if (item) {
      increaseQuantity(product, quantity);
      toast({
        title: "Cart updated!",
        position: "top-right",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      return;
    } else {
      const newItem = {
        product,
        image,
        name,
        price,
        quantity: Number(quantity),
      };
      const newCart = [...cart, newItem];
      setCart(newCart);
      toast({
        title: "Item added to cart",
        position: "top-right",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const updateItem = (id, quantity) => {
    if (Number(quantity) === 0) {
      removeItem(id);
      return;
    } else {
      const newCart = [...cart].map(item => {
        return item.product === id
          ? { ...item, quantity: Number(quantity) }
          : { ...item };
      });
      setCart(newCart);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        total,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        addToCart,
        updateItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a Cart Provider");
  }
  return context;
};

export { useCart, CartProvider };
