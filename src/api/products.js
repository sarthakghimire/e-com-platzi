import axios, { isAxiosError } from "axios";

const BASE_URL = "https://api.escuelajs.co/api/v1";

//All
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
    throw error;
  }
};

// ID
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
    throw error;
  }
};

export const fetchProductsByCategory = async (categorySlug) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/products?categorySlug=${categorySlug}`
    );
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch products by category"
      );
    }
    throw error;
  }
};

//Filter by price range
export const fetchProductsByPriceRange = async (minPrice, maxPrice) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/products/?price_min=${minPrice}&price_max=${maxPrice}`
    );
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to filter by price range"
      );
    }
    return error;
  }
};

//Pagination for all products
export const fetchProductsWithPagination = async (offset = 0, limit = 10) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/products?offset=${offset}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch product by pagination"
      );
    }
    throw error;
  }
};

//Pagination with category and price range
export const fetchCombinedPagination = async (
  offset = 0,
  limit = 10,
  minPrice,
  maxPrice,
  categoryId = null
) => {
  try {
    let url = `${BASE_URL}/products/?price_min=${minPrice}&price_max=${maxPrice}&limit=${limit}&offset=${offset}`;
    if (categoryId && !isNaN(categoryId)) {
      url += `&categoryId=${Number(categoryId)}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed fetching paginated products"
      );
    }
    throw error;
  }
};

//Fetch users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch users");
    }
    throw error;
  }
};

//Update product for admin
export const updateProduct = async (id, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/products/${id}`, updatedData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update product"
      );
    }
    throw error;
  }
};

// Delete logic
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to delete product"
      );
    }
    throw error;
  }
};

//Add a new product
export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/products/`, productData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to delete product"
      );
    }
    throw error;
  }
};
