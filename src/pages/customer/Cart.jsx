import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { summarizeCart } from "../../../services/AIServices";
import { useMutation } from "@tanstack/react-query";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const [summary, setSummary] = useState("");

  const mutation = useMutation({
    mutationFn: () => summarizeCart(cartItems),
    onSuccess: (data) => {
      setSummary(data);
    },
    onError: (error) => {
      alert(`Error:${error.message}`);
    },
  });

  const handleSummarize = () => {
    mutation.mutate();
  };

  if (cartItems.length === 0)
    return (
      <div className="flex flex-col">
        <p className="p-4"> Your cart is empty.</p>
        <Link
          to="/home"
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
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Your Cart ({cartItems.length} Items)
        </h2>
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
                {item.quantity > 1 &&
                  `(Rs.${item.price * item.quantity} total)`}
              </p>
              {/* +- buttons */}
              <div className="flex">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="border px-3 mx-2 cursor-pointer"
                >
                  -
                </button>
                <p>{item.quantity}</p>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="border px-3 mx-2 cursor-pointer"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-lime-300 border rounded cursor-pointer mt-3 bg-green-700 hover:bg-green-800 text-sm px-5 py-2"
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
        <button
          onClick={() => clearCart()}
          className="mt-4 mx-3 inline-block text-center text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Clear Cart
        </button>
        <Link
          to="/checkout"
          className="mt-4 inline-block text-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Checkout
        </Link>
        <button
          disabled={mutation.isPending}
          onClick={handleSummarize}
          className="mt-4 inline-block text-center text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 cursor-pointer disabled:bg-gray disabled:cursor-progress py-2.5"
        >
          {mutation.isPending ? "Loading..." : "Roast My cart"}
        </button>
      </div>
      {summary && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="text-lg font-semibold">There you go:</p>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
