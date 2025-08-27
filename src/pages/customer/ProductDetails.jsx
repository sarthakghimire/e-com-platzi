import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../../api/products";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  const handleClick = () => {
    addToCart(product);
    toast.success("Added to Cart");
  };

  if (isLoading) return <p className="p-4">Loading product...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full md:w-1/2 object-cover rounded"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-xl font-semibold text-blue-700">
            Rs.{product.price}
          </p>
          <p className="text-sm text-gray-500">
            Category: {product.category.name}
          </p>
          <button
            className="mt-2 w-fit px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleClick}
          >
            Add to Cart
          </button>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
