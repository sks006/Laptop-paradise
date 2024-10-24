import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

const API_URL = `${import.meta.env.VITE_URL}/product`;

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
});

// Fetch a product by ID
export const fetchProductsById = createAsyncThunk('products/fetchProductsById', async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
});

// Create a new product
export const createProduct = createAsyncThunk('products/createProduct', async (productData) => {
  try {
    const res = await axios.post(`${API_URL}/save`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.product;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
});

// Update a product
export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, productData }) => {
  try {
    const res = await axios.post(`${API_URL}/update/${id}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.product;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
});

// Delete a product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
});

// Create the products slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Fetch product by ID
    builder
      .addCase(fetchProductsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Create product
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Update product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Delete product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
