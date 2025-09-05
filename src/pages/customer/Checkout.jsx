import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Checkout = () => {
  const { cartItems, removeFromCart } = useCart();

  const [checked, setChecked] = useState(true);
  const [pickup, setPickup] = useState(false);
  const [agree, setAgree] = useState(true);
  const [radioChecked, setRadioChecked] = useState(true);

  // total
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Order placed successfully!");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
        {/* Toast */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 1000,
          }}
        />
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h2>

        <div className="flex flex-col gap-8 lg:flex-row-reverse">
          {/* Order Summary */}
          <div
            id="checkout-desc"
            className="w-full lg:w-1/2 border rounded-lg p-5 bg-gray-50 shadow-sm"
          >
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

          {/* Checkout Forms */}
          <div id="checkout-forms" className="w-full lg:w-1/2">
            {/* Delivery */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                Delivery and Collection
              </h3>
              <div className="flex gap-3">
                <button
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

            {/* Delivery form */}
            {!pickup && (
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Delivery Address
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-medium text-gray-700">
                      Name:
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700">
                      Contact:
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700">
                      Address:
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block font-medium text-gray-700">
                        Floor:
                      </label>
                      <select className="w-full border rounded-lg px-3 py-2 mt-1">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block font-medium text-gray-700">
                        ZIP Code:
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700">
                      City:
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </form>

                {/* Billing */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Billing Address
                  </h3>
                  <label className="flex items-center gap-2 text-gray-700">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                      className="h-4 w-4"
                    />
                    Same as delivery address
                  </label>
                </div>

                {!checked && (
                  <form className="space-y-4 mt-4">
                    <div>
                      <label className="block font-medium text-gray-700">
                        Name:
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700">
                        Email Address:
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700">
                        Contact:
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700">
                        Address:
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block font-medium text-gray-700">
                          Floor:
                        </label>
                        <select className="w-full border rounded-lg px-3 py-2 mt-1">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block font-medium text-gray-700">
                          ZIP Code:
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700">
                        City:
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Payment */}
            <div className="mt-6 bg-gray-50 p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Payment
              </h3>
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="payment"
                  checked={radioChecked}
                  onChange={() => setRadioChecked(true)}
                />{" "}
                Debit Card
              </label>
              {radioChecked && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Card Holder
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      min={`${new Date().getFullYear()}-${String(
                        new Date().getMonth() + 1
                      ).padStart(2, "0")}`}
                      type="month"
                      className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength="3"
                      className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              )}
              <label className="flex items-center gap-2 text-gray-700 mt-2">
                <input
                  type="radio"
                  name="payment"
                  checked={!radioChecked}
                  onChange={() => setRadioChecked(false)}
                />{" "}
                {!pickup ? "Cash on Delivery" : "Pay After Pickup"}
              </label>
            </div>

            {/* TAC */}
            <div className="mt-6">
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                  className="h-4 w-4"
                />
                I accept the Terms and Conditions
              </label>
            </div>

            {/* Submit */}
            <button
              disabled={!agree}
              type="submit"
              className="cursor-pointer mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg  font-medium shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {!agree ? "Please Agree to TAC" : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
