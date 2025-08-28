import React from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/logo.png";
import { useAuth } from "./../context/AuthContext";

const AdminNavbar = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="flex justify-between h-16 sticky top-0 bg-white z-50 shadow-md items-center px-4">
        <Link to="">
          <img src={logo} alt="logo" className="cursor-pointer h-11" />
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/add-product" className="hover:text-blue-600">
              Add Product
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-blue-600">
              Log Out {user.name}
            </Link>
          </li>
          <li>
            <img
              className="h-10 w-10 rounded-3xl"
              src={
                user
                  ? user.avatar
                  : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              }
              alt=""
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminNavbar;
