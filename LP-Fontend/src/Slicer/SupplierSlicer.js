/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
     suppliers: [],
     update_id: null,
     loading: false,
     error: null,
};

// Define the base URL for API requests
const API_URL = `${import.meta.env.VITE_URL}/supplier`; // Adjust this to your actual API endpoint

// Fetch all brands
export const fetchSuppliers = createAsyncThunk(
     "supplier/fetchSupplier",
     async () => {
          try {
               const response = await axios.get(API_URL);
               return response.data;
          } catch (error) {
               return error;
          }
     },
);

// Fetch a brand by ID
export const fetchSupplierById = createAsyncThunk(
     "supplier/fetchSupplierById",
     async (id) => {
          try {
               const response = await axios.get(`${API_URL}/${id}`);
               return response.data;
          } catch (error) {
               return error;
          }
     },
);

// Create a new brand
export const createSupplier = createAsyncThunk(
     "supplier/createSupplier",
     async (supplierData) => {
          try {
               const response = await axios.post(
                    `${API_URL}/save`,
                    supplierData,
               );
               return response.data;
          } catch (error) {
               // Handle error and pass the error message to the thunk
               console.error("Error submitting form:", error);
               return error;
          }
     },
);

// Update a brand
export const updateSupplier = createAsyncThunk(
     "supplier/updateSupplier",
     async ({ upId, supplierUpdate }, thunkAPI) => {
          try {
               const response = await axios.post(
                    `${API_URL}/update/${upId}`,
                    supplierUpdate,
               );

               // Axios will automatically parse the response data
               return response.data;
          } catch (error) {
               // Handle error
               return thunkAPI.rejectWithValue(
                    error.response ? error.response.data : error.message,
               );
          }
     },
);

// Delete a brand
export const deleteSupplier = createAsyncThunk(
     "supplier/deleteSupplier",
     async (id) => {
          try {
            
            console.log(id);
            await axios.get(`${API_URL}/delete/${id}`);
               return id;
          } catch (error) {
               return error;
          }
     },
);

// Slice definition
const supplierSlice = createSlice({
     name: "suppliers",
     initialState,
     reducers: {
          setUpdateById: (state, action) => {
               state.update_id = action.payload;
          },
     },
     extraReducers: (builder) => {
          builder
               .addCase(fetchSuppliers.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(fetchSuppliers.fulfilled, (state, action) => {
                    state.loading = false;
                    state.suppliers = action.payload;
               })
               .addCase(fetchSuppliers.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
               });

          builder
               .addCase(fetchSupplierById.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(fetchSupplierById.fulfilled, (state) => {
                    state.loading = false;
               })
               .addCase(fetchSupplierById.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
               });

          // Handle createBrand
          builder
               .addCase(createSupplier.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(createSupplier.fulfilled, (state, action) => {
                    state.loading = false;
                    state.suppliers.push(action.payload); // Add new brand to state
               })
               .addCase(createSupplier.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
               });

          // Handle updateBrand
          builder
               .addCase(updateSupplier.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(updateSupplier.fulfilled, (state, action) => {
                    state.loading = false;
                    if (action.payload && action.payload.id) {
                         state.suppliers = state.suppliers.map((supplier) =>
                              supplier.id === action.payload.id
                                   ? action.payload
                                   : supplier,
                         );
                    }
               })
               .addCase(updateSupplier.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
               });

          // Handle deleteBrand
          builder
               .addCase(deleteSupplier.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(deleteSupplier.fulfilled, (state, action) => {
                    state.loading = false;
                    state.suppliers = state.suppliers.filter(
                         (supplier) => supplier.id !== action.payload,
                    );
               })
               .addCase(deleteSupplier.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
               });
     },
});

// Export the reducer
export const { setUpdateById } = supplierSlice.actions;
export default supplierSlice.reducer;
