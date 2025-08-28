import React, { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "./../../api/products";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    images: [""],
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newProduct) => addProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      alert("Product added successfully!");
      navigate("/admin-panel");
    },
    onError: (error) => {
      alert(`Error:${error.message}`);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "images") {
      setFormData((prev) => ({
        ...prev,
        images: [value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div>
      <AdminNavbar />
      <h2 className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        Add Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
      >
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Category buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category ID:
          </label>
          <div className="flex gap-4 mt-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="categoryId"
                  value={String(num)}
                  checked={formData.categoryId === String(num)}
                  onChange={handleChange}
                  required
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                {num}
              </label>
            ))}
          </div>
        </div>

        {/* Image Link */}
        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Image Link:
          </label>
          <input
            type="url"
            id="images"
            name="images"
            value={formData.images[0]}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* preview */}
        {formData.images[0] && (
          <div className="mt-2 text-center">
            <img
              src={formData.images[0]}
              alt="Preview"
              className="w-32 h-32 object-cover border rounded-md mx-auto"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
