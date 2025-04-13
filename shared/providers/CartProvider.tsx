"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types/product";
interface CartContextType {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  addToCart: (product: Product, quantity: number) => void;
  updateCartItemQuantity: (id: string, value: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  //const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    //On component mount, check if there are items in local storage
    if (typeof window !== "undefined") {
      const intitalCartItems = localStorage.getItem("cartItems");
      const initialTotalPrice = localStorage.getItem("totalPrice");
      setCartItems(intitalCartItems ? JSON.parse(intitalCartItems) : []);
      setTotalPrice(initialTotalPrice ? parseFloat(initialTotalPrice) : 0);
    }
  }, []);

  useEffect(() => {
    //On component mount, check if there are items in local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    }
  }, [cartItems, totalPrice]);

  console.log("cartItems", cartItems);

  const addToCart = (product: Product, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    //setTotalQuantity((prevQuantity) => prevQuantity + quantity);

    if (checkProductInCart) {
      //If you have product in cart and you choose to add the same product
      //this will just increase the quantiy and total price insetad
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
    // toast.success(`${qty} x ${product.name} added to cart`, {
    //   position: "top-center",
    //   duration: 2000,
    //   style: { marginTop: "4rem" },
    // });
    //setQty(1);
  };

  const updateCartItemQuantity = (id: string, value: string) => {
    const productPrice = cartItems.find((item) => item._id === id)?.price || 0;

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
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice + (value === "increment" ? 1 : -1) * productPrice
    );
  };

  return (
    <CartContext.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        addToCart,
        updateCartItemQuantity,
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
