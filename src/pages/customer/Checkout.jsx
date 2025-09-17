import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Checkout = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [checked, setChecked] = useState(true);
  const [pickup, setPickup] = useState(false);
  const [agree, setAgree] = useState(true);
  const [radioChecked, setRadioChecked] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  // total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleApplyPromo = () => {
    const validPromoCodes = ["SAVE20", "DISCOUNT20", "OFFER20"];
    if (validPromoCodes.includes(promoCode.toUpperCase())) {
      const calculatedDiscount = Math.min(totalPrice * 0.2, 100);
      setDiscount(calculatedDiscount);
      toast.success(
        `Promo applied! You saved Rs.${calculatedDiscount.toFixed(2)}`
      );
    } else {
      toast.error("Invalid Promo Code");
      setDiscount(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agree) {
      toast.error("You must accept the Terms and Conditions");
      return;
    }

    toast.success("Order placed successfully! 🎉");

    setTimeout(() => {
      if (clearCart) clearCart();
      navigate("/home");
    }, 1200);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <p className="p-6 text-center text-gray-700 text-lg">
          🛒 Your cart is empty. Please add items before checkout.
        </p>
        <Link
          to="/home"
          className="mt-4 inline-block text-center text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-6 py-2 shadow"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 1000 }}
        />
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h2>

        <div className="flex flex-col gap-8 lg:flex-row-reverse">
          {/* Order Summary */}
          <div className="w-full lg:w-1/2 border rounded-lg p-5 bg-gray-50 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Order Summary
            </h3>
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-4 p-2 bg-white rounded shadow-sm"
              >
                <img
                  src={item.images}
                  alt={item.title}
                  className="w-14 h-14 object-cover rounded"
                />
                <span className="flex-1 ml-3 text-gray-700">{item.title}</span>
                <div className="flex items-center">
                  <span className="px-2 text-gray-600">
                    Rs.{item.price} × {item.quantity}
                  </span>
                  <button
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ␡
                  </button>
                </div>
              </div>
            ))}
            <hr className="my-3" />
            <div className="flex justify-between font-bold text-lg text-gray-800">
              <span>Total</span>
              <span>Rs.{(totalPrice - discount).toFixed(2)}</span>
            </div>
            <div>
              <p>Have a Promocode?</p>
              <div className="flex gap-5">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="border"
                />
                <button
                  className="border rounded bg-green-400 text-white p-2"
                  onClick={handleApplyPromo}
                >
                  Apply
                </button>
              </div>
              {discount > 0 && (
                <p className="mt-2 text-green-600 font-medium">
                  Discount Applied: Rs.{discount.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="w-full lg:w-1/2 space-y-6">
            {/* Delivery and Collection */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                Delivery and Collection
              </h3>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setPickup(false)}
                  className={`flex-1 p-3 rounded-lg border ${
                    !pickup
                      ? "bg-green-400 text-white shadow"
                      : "border-green-300 text-gray-700 hover:bg-green-50"
                  }`}
                >
                  Home Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setPickup(true)}
                  className={`flex-1 p-3 rounded-lg border ${
                    pickup
                      ? "bg-green-400 text-white shadow"
                      : "border-green-300 text-gray-700 hover:bg-green-50"
                  }`}
                >
                  Store Pickup
                </button>
              </div>
            </div>

            {/* Delivery Address */}
            {!pickup && (
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Delivery Address
                </h3>
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
                <input
                  id="contact"
                  type="text"
                  placeholder="Contact"
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
                <input
                  id="address"
                  type="text"
                  placeholder="Address"
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            )}

            {/* Payment */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Payment
              </h3>
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="payment"
                  checked={radioChecked}
                  onChange={() => setRadioChecked(true)}
                  required
                />
                Debit Card
              </label>
              {radioChecked && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow">
                  <input
                    type="text"
                    placeholder="Card Number"
                    required
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Card Holder"
                    required
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  <input
                    type="month"
                    required
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    maxLength="3"
                    required
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              )}
              <label className="flex items-center gap-2 text-gray-700 mt-2">
                <input
                  type="radio"
                  name="payment"
                  checked={!radioChecked}
                  onChange={() => setRadioChecked(false)}
                />
                {!pickup ? "Cash on Delivery" : "Pay After Pickup"}
              </label>
            </div>

            {/* TAC */}
            <div>
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                  className="h-4 w-4"
                  required
                />
                I accept the Terms and Conditions
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!agree}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {!agree ? "Please Agree to TAC" : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
