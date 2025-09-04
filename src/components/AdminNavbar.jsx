import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../assets/logo.png";
import { useAuth } from "./../context/AuthContext";
import image from "./../assets/image.png";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="flex justify-between h-16 sticky top-0 bg-white z-50 shadow-md items-center px-4">
        <Link to="/admin-panel">
          <img src={logo} alt="logo" className="cursor-pointer h-11" />
        </Link>
        <ul className="flex space-x-6">
          <li className="hidden md:block">
            <Link to="/add-product" className="hover:text-blue-600">
              Add Product
            </Link>
          </li>
          <li>
            <button onClick={() => setIsOpen((prev) => !prev)}>
              <img
                className="h-10 w-10 rounded-3xl"
                src={user ? user.avatar : { image }}
                alt=""
              />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                <Link
                  to="/add-product"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 md:hidden"
                  onClick={() => setIsOpen(false)}
                >
                  Add Product
                </Link>
                <p className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                  {user.name || "Admin"}
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

export default AdminNavbar;
