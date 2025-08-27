import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/products";

const AdminProduct = ({ product }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteProduct(product.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // Refresh the products list
      alert("Product deleted successfully!");
    },
    onError: (error) => {
      alert(`Error deleting product: ${error.message}`);
    },
  });

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${product.title}?`)) {
      mutation.mutate();
    }
  };
  return (
    <div>
      <div className="w-70 bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
        <img
          src={
            product.images?.[0] && product.images[0].trim() !== ""
              ? product.images[0]
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5E1FgiVuVpe6aqS7mYbrf1sdq-hnn1QDhnA&s"
          }
        />
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-sm text-gray-600 mt-1">
            {product.description.slice(0, 50)}....
          </p>
          <p className="text-md font-bold text blue-700 mt-2">
            Rs.{product.price}
          </p>
        </div>
        <div className="flex">
          <button className="cursor-pointer mt-4 mr-4 inline-block text-center text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2 5">
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="cursor-pointer mt-4 mr-4 inline-block text-center text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2 5"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
