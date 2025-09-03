import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../api/products";
import AdminProduct from "../../components/AdminProduct";
import AdminNavbar from "../../components/AdminNavbar";
import Loading from "./../../assets/loading.json";
import Lottie from "lottie-react";

const AdminPanel = () => {
  const {
    data: products,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const data = await fetchProducts();
      return data;
    },
  });

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
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
          <div className="w-40">
            <Lottie animationData={Loading} loop={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
