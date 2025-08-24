import React, { useState } from "react";

const CategoryFilter = ({
  selectedCategory,
  onCategoryChange,
  selectedPriceRange,
  onPriceChange,
}) => {
  const categories = [
    { slug: null, name: "All" },
    { slug: "clothes", name: "Clothes" },
    { slug: "electronics", name: "Electronics" },
    { slug: "furniture", name: "Furniture" },
    { slug: "shoes", name: "Shoes" },
    { slug: "miscellaneous", name: "Miscellaneous" },
  ];

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handlePriceChange = () => {
    const min = minPrice ? parseInt(minPrice) : 0;
    const max = maxPrice ? parseInt(maxPrice) : Infinity;
    onPriceChange({ min, max });
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-4 sticky lg:h-screen md:h-screen top-[64px]">
      <h2 className="text-xl font-semibold mb-2">Filter by Category</h2>
      {categories.map((cat) => (
        <label key={cat.slug ?? "all"} className="block cursor-pointer">
          <input
            type="radio"
            name="category"
            value={cat.slug ?? ""}
            checked={selectedCategory === cat.slug}
            onChange={() => onCategoryChange(cat.slug)}
            className="mr-2"
          />
          {cat.name}
        </label>
      ))}
      <h2 className="text-xl font-semibold mb-2">Filter by Price</h2>
      <div className="flex flex-col w-50 gap-2 mb-2">
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min Price"
          className="p-1 border rounded"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max Price"
          className="p-1 border rounded"
        />
        <button
          onClick={handlePriceChange}
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Apply
        </button>
      </div>
      <p>
        Current Range: {selectedPriceRange.min} - {selectedPriceRange.max}
      </p>{" "}
    </div>
  );
};

export default CategoryFilter;
