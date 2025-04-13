"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types/product";
import toast from "react-hot-toast";
import { toastStyle } from "../styles/toast";
interface CartContextType {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: Product[];
  addToCart: (product: Product, quantity: number) => void;
  updateCartItemQuantity: (id: string, value: string) => void;
  removeCartItem: (id: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    //On component mount, check if there are items in local storage
    if (typeof window !== "undefined") {
      const intitalCartItems = localStorage.getItem("cartItems");
      setCartItems(intitalCartItems ? JSON.parse(intitalCartItems) : []);
    }
  }, []);

  useEffect(() => {
    //Set new cart items to local storage on cartItems change
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    if (checkProductInCart) {
      //If you have product in cart and you choose to add the same product
      //this will just increase the quantiy and total price instead
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === product._id)
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
          };
        return cartItem;
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${quantity} x ${product.name} added to cart`, toastStyle);
  };

  const updateCartItemQuantity = (id: string, value: string) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === id) {
        if (value === "increment") {
          return { ...item, quantity: item.quantity + 1 };
        }
        if (value === "decrement") {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const removeCartItem = (id: string) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCartItems);
  };
  console.log("show cart", showCart);
  return (
    <CartContext.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        addToCart,
        updateCartItemQuantity,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
