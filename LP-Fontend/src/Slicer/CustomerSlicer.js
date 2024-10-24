import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for API requests
const API_URL = `${import.meta.env.VITE_URL}/customer`;

// Async thunk to fetch all customers
export const fetchCustomers = createAsyncThunk(
  "customers/fetchAll",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

// Async thunk to fetch a customer by ID
export const fetchCustomerById = createAsyncThunk(
  "Customers/fetchCustomerById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

// Async thunk to add a new customer
export const createCustomer = createAsyncThunk(
  "customers/createCustomer",
  async (formData) => {
    const response = await axios.post(`${API_URL}/save`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.customer;
  }
);

// Async thunk to update an existing customer
export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async ({ upId, customerData }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/update/${upId}`, customerData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.customer;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async thunk to delete a customer by ID
export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async (id) => {
    await axios.get(`${API_URL}/delete/${id}`);
    return id;
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
    update_id: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUpdateId: (state, action) => {
      state.update_id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch customers
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Handle fetch customer by ID
      .addCase(fetchCustomerById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomerById.fulfilled, (state) => {
        state.loading = false;
        // Optionally add logic for handling fetched customer by ID
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Handle add customer
      .addCase(createCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers.push(action.payload);
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Handle update customer
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        const customer = state.customers.find(c => c.id === action.payload.id);
        if (customer) {
          Object.assign(customer, action.payload); // Efficient merging
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Handle delete customer
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = state.customers.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export const { setUpdateId } = customerSlice.actions;
export default customerSlice.reducer;
