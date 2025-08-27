import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-3xl text-red-600">404 Page Not Found</h1>
      <Link
        to="/"
        className="mt-4 inline-block text-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 5"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
