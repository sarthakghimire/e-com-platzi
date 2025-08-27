import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchProductsByCategory,
  fetchProductsByPriceRange,
  fetchProductsWithPagination,
} from "../../api/products";
import ProductCard from "../../components/ProductCard";
import CategoryFilter from "../../components/CategoryFilter";
import Navbar from "../../components/Navbar";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [page, setPage] = useState(0); // page starts from 0
  const limit = 9; // products per page

  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products", selectedCategory, priceRange, page],
    queryFn: async () => {
      if (
        priceRange.min === 0 &&
        priceRange.max === Infinity &&
        !selectedCategory
      ) {
        return fetchProductsWithPagination(page * limit, limit);
      }
      if (selectedCategory) {
        return fetchProductsByCategory(selectedCategory);
      }
      return fetchProductsByPriceRange(priceRange.min, priceRange.max);
    },
    keepPreviousData: true,
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(0); // reset page
    refetch();
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
    setPage(0); // reset page
    refetch();
  };

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  return (
    <div>
      <Navbar />
      <div
        id="home"
        className="p-6 flex lg:flex-row md:flex-row flex-col gap-6"
      >
        {/* Filter box */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedPriceRange={priceRange}
          onPriceChange={handlePriceChange}
        />
        {/* Product List */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {/* Pagination */}
          {!selectedCategory &&
            priceRange.min === 0 &&
            priceRange.max === Infinity && (
              <div className="flex justify-center gap-4 mt-6">
                <button
                  disabled={page === 0}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Next
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Home;
