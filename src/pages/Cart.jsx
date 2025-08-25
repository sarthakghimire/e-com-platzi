import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  if (cartItems.length === 0)
    return (
      <div className="flex flex-col">
        <p className="p-4"> Your cart is empty.</p>
        <Link
          to="/"
          className="mt-4 inline-block text-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 5"
        >
          Go to Home
        </Link>
      </div>
    );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="border p-4 rounded mb-2 flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-semibold">
              {item.title} x {item.quantity}
            </h3>
            <p className="text-gray-600">
              Rs.{item.price}{" "}
              {item.quantity > 1 && `(Rs.${item.price * item.quantity} total)`}
            </p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="border rounded cursor-pointer mt-3"
            >
              Remove Product
            </button>
          </div>
          <img
            src={item.images?.[0]}
            alt={item.title}
            className="h-16 w-16 object-cover rounded"
          />
        </div>
      ))}
      <h3 className="text-xl">Total price:Rs.{totalPrice}</h3>
      <Link
        to="/checkout"
        className="mt-4 inline-block text-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 5"
      >
        Checkout
      </Link>
    </div>
  );
};

export default Cart;
