import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/logo.png";
import { useAuth } from "./../context/AuthContext";
import { useCart } from "../context/CartContext";
import image from "./../assets/image.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ resetFilters }) => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="flex justify-between h-16 sticky top-0 bg-white z-50 shadow-md items-center px-4">
        <Link to="/home">
          <img
            src={logo}
            onClick={() => resetFilters && resetFilters()}
            alt="logo"
            className="cursor-pointer h-11"
          />
        </Link>
        <ul className="flex space-x-6">
          <li className="hidden md:block">
            <Link
              to="/home"
              onClick={() => resetFilters && resetFilters()}
              className="hover:text-blue-600"
            >
              Home
            </Link>
          </li>
          <li className="hidden md:block">
            <Link to="/cart" className="hover:text-blue-600">
              Cart
              <sup className="text-red-500">
                {cartItems.length === 0 ? "" : cartItems.length}
              </sup>
            </Link>
          </li>
          <li>
            <button onClick={() => setIsOpen((prev) => !prev)}>
              <img
                className="h-10 w-10 rounded-3xl cursor-pointer"
                src={user ? user.avatar : { image }}
                alt=""
              />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                <Link
                  to="/home"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 md:hidden"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/cart"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 md:hidden"
                  onClick={() => setIsOpen(false)}
                >
                  Cart
                  <sup className="text-red-500 ml-1">{cartItems.length}</sup>
                </Link>
                <p className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                  {user.name}
                  <br />
                  <span className="text-blue-500">{user.email}</span>
                </p>
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  Log Out
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
