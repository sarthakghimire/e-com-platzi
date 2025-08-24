import axios from "axios";

const BASE_URL = "https://api.escuelajs.co/api/v1";

//All
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch products"
    );
  }
};

// ID
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch product details"
    );
  }
};

export const fetchProductsByCategory = async (categorySlug) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/products?categorySlug=${categorySlug}`
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch by category slug"
    );
  }
};

//Pagination
// try {
//   const response = await axios.get(
//     `${BASE_URL}/api/v1/products?offset=${offset}&limit=${limit}`
//   );
//   return response.data;
// } catch (error) {
//   throw new Error(
//     error.response?.data?.message || "Failed to fetch by category slug"
//   );
// }

//Filter by price range
export const fetchProductsByPriceRange = async (minPrice, maxPrice) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/products/?price_min=${minPrice}&price_max=${maxPrice}`
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch by price range"
    );
  }
};

export const fetchProductsWithPagination = async (offset = 0, limit = 10) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/products?offset=${offset}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch paginated products"
    );
  }
};
