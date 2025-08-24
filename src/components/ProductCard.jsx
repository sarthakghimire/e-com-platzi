import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="w-70 bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="w-full h-48 object-cover rounded"
      />
      <div className="mt-4">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {product.description.slice(0, 50)}....
        </p>
        <p className="text-md font-bold text blue-700 mt-2">
          Rs.{product.price}
        </p>
        <Link
          to={`/product/${product.id}`}
          className="mt-4 inline-block text-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 5"
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
