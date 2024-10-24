/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
     categories: [],
     setCategoriesId: null,
     loading: false,
     error: null,
};

// API URL with environment variable
const API_URL = `${import.meta.env.VITE_URL}/category`;

// Fetch all Categories
export const fetchCategories = createAsyncThunk(
     "Categories/fetchCategories",
     async () => {
          try {
               const response = await axios.get(API_URL);
               return response.data;
          } catch (error) {
               return Promise.reject(
                    error.response ? error.response.data : error.message,
               );
          }
     },
);

// Fetch a Category by ID
export const fetchCategoriesById = createAsyncThunk(
     "Categories/fetchCategoriesById",
     async (id) => {
          try {
               const response = await axios.get(`${API_URL}/${id}`);
               console.log(response.data);
               return response.data;
          } catch (error) {
               throw new Error(
                    error.response?.data ||
                         `Failed to fetch category with id ${id}`,
               );
          }
     },
);

// Create a new Category
export const createCategories = createAsyncThunk(
     "Categories/createCategories",
     async (CategoriesData) => {
          try {
               const response = await axios.post(
                    `${API_URL}/save`,
                    CategoriesData,
                    {
                         headers: {
                              "Content-Type": "multipart/form-data",
                         },
                    },
               );
               return response.data.Categories;
          } catch (error) {
               throw new Error(
                    error.response?.data || "Failed to create category",
               );
          }
     },
);

// Update a Category
export const updateCategories = createAsyncThunk(
     "Categories/updateCategories",
     async ({ id, updatedData }, thunkAPI) => {
          try {
               const response = await axios.post(
                    `${API_URL}/update/${id}`,
                    updatedData,
                    {"Content-Type": "multipart/form-data"},
               );               
               return response.data.category;
          } catch (error) {
               return thunkAPI.rejectWithValue(
                    error.response ? error.response.data : error.message,
               );
          }
     },
);

// Delete a Category
export const deleteCategories = createAsyncThunk(
     "Categories/deleteCategories",
     async (id) => {
          try {
               await axios.get(`${API_URL}/delete/${id}`);
               return id; 
          } catch (error) {
               throw new Error(
                    error.response?.data ||
                         `Failed to delete category with id ${id}`,
               );
          }
     },
);

// Slice definition
const CategoriesSlice = createSlice({
     name: "Categories",
     initialState,
     reducers: {
          setCategoriesId: (state, action) => {
               state.setCategoriesId = action.payload;
          },
     },
     extraReducers: (builder) => {
          builder
               // Fetch Categories
               .addCase(fetchCategories.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(fetchCategories.fulfilled, (state, action) => {
                    state.loading = false;
                    state.categories = action.payload;
               })
               .addCase(fetchCategories.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
               })

               // Fetch Category by ID
               .addCase(fetchCategoriesById.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(fetchCategoriesById.fulfilled, (state) => {
                    state.loading = false;
               })
               .addCase(fetchCategoriesById.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
               })

               // Create Category
               .addCase(createCategories.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(createCategories.fulfilled, (state, action) => {
                    state.loading = false;
                    state.categories.push(action.payload);
               })
               .addCase(createCategories.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
               })

               // Update Category
               .addCase(updateCategories.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(updateCategories.fulfilled, (state, action) => {
                    state.loading = false;
                    console.log("in slicer",state,action.payload);
                    
                    if (action.payload && action.payload.id) {
                         state.categories = state.categories.map((category) =>
                              category.id === action.payload.id
                                   ? action.payload
                                   : category,
                         );
                    }
               })
               .addCase(updateCategories.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
               })

               // Delete Category
               .addCase(deleteCategories.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(deleteCategories.fulfilled, (state, action) => {
                    state.loading = false;
                    state.categories = state.categories.filter(
                         (category) => category.id !== action.payload,
                    );
               })
               .addCase(deleteCategories.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
               });
     },
});

// Export the reducer
export const { setCategoriesId } = CategoriesSlice.actions;

export default CategoriesSlice.reducer;
