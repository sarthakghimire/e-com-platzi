import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCombinedPagination } from "../../api/products";
import ProductCard from "../../components/ProductCard";
import CategoryFilter from "../../components/CategoryFilter";
import Navbar from "../../components/Navbar";
import Loading from "./../../assets/loading.json";
import Lottie from "lottie-react";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const resetFilters = () => {
    setSelectedCategory(null);
    setPriceRange({ min: 0, max: Infinity });
    setPage(0);
  };

  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [page, setPage] = useState(0); // page starts from 0
  const limit = 10; // products per page

  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products", selectedCategory, priceRange, page],
    queryFn: () => {
      new Promise((resolve) => setTimeout(resolve, 3000));
      return fetchCombinedPagination(
        page * limit,
        limit,
        priceRange.min,
        priceRange.max,
        selectedCategory
      );
    },
    keepPreviousData: true,
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPriceRange({ min: 0, max: Infinity }); // reset price range
    setPage(0); // reset page
    refetch();
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
    setPage(0); // reset page
    refetch();
  };

  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  return (
    <div>
      <Navbar resetFilters={resetFilters} />
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
          <div className="flex justify-center gap-4 mt-6">
            <button
              disabled={page === 0}
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled={!products || products.length < limit}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded"
            >
              Next
            </button>
          </div>
        </div>
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

export default Home;
