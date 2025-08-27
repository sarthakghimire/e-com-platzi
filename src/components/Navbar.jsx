import React from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/logo.png";
import { useAuth } from "./../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="flex justify-between h-16 sticky top-0 bg-white z-50 shadow-md items-center px-4">
        <Link to="/home">
          <img src={logo} alt="logo" className="cursor-pointer h-11" />
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/home" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-blue-600">
              Cart
            </Link>
          </li>
          <li>
            <img
              className="h-10 w-10 rounded-3xl"
              src={user ? user.avatar : "https://via.placeholder.com/40"}
              alt=""
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
