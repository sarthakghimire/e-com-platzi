import React from "react";
import { useCart } from "../context/CartContext";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  // total
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col">
        <p className="p-6 text-center">
          🛒 Your cart is empty. Please add items before checkout.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block text-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 5"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Order placed successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded">
      {/* For Toast */}
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between mb-2">
            <span>{item.title}</span>
            <div>
              <span className="px-2">
                Rs.{item.price} x {item.quantity}
              </span>
              <span className="px-2">
                <button
                  className="cursor-pointer"
                  onClick={() => removeFromCart(item.id)}
                >
                  ␡
                </button>
              </span>
            </div>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>Rs.{totalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={() => clearCart()}
          className="mt-4 mx-3 inline-block text-center text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2 5"
        >
          Clear Cart
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label htmlFor="address" className="block font-medium">
            Address:
          </label>
          <input
            type="text"
            id="address"
            required
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label htmlFor="contact" className="block font-medium">
            Contact:
          </label>
          <input
            type="text"
            id="contact"
            required
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
