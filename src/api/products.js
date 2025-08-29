import axios, { isAxiosError } from "axios";

const BASE_URL = "https://api.escuelajs.co/api/v1";

//All
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    //  throw new Error(
    //    error.response?.data?.message || "Failed to fetch products"
    //  );
    if (isAxiosError(error)) {
      const errorData = error.response.data;

      if (errorData) {
        // handle the error
        return;
      }

      alert(error.message);
    }
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

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};

export const updateProduct = async (id, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/products/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update product"
    );
  }
};
// Delete logic
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete product"
    );
  }
};
//Add a new product
export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/products/`, productData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete product"
    );
  }
};
