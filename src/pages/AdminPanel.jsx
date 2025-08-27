import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import AdminProduct from "../components/AdminProduct";
import AdminNavbar from "./../components/AdminNavbar";

const AdminPanel = () => {
  const {
    data: products,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await fetchProducts();
      return data;
    },
  });

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  return (
    <div>
      <AdminNavbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <AdminProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
