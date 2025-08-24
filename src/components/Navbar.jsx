import React from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/logo.png";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between h-16 sticky top-0 bg-white z-50 shadow-md items-center px-4">
        <Link to="/">
          <img src={logo} alt="logo" className="cursor-pointer h-11" />
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-blue-600">
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
