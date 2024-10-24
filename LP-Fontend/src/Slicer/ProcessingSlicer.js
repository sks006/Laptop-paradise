import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



// Initial state
const initialState = {
  processing: [],
  loading: false,
  error: null,
};





// Define the base URL for API requests
const API_URL = `${import.meta.env.VITE_URL}/processing`; // Adjust this to your actual API endpoint

// Fetch all brands
export const fetchProcessing = createAsyncThunk(
  'processing/fetchProcessing',
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

// Fetch a brand by ID
export const fetchProcessingById = createAsyncThunk(
  'processing/fetchProcessingById',
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

// Create a new brand
export const createProcessing = createAsyncThunk(
  'processing/createProcessing',
  async (processingData) => {

    try {
      const response = await axios.post(`${API_URL}/save`, processingData);
      return response.data.Process;
      
    } catch (error) {
      // Handle error and pass the error message to the thunk
      console.error('Error submitting form:', error);
      return error;
    }
  }
);

// Update a brand
export const updateProcessing = createAsyncThunk(
  'processing/updateProcessing',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/update/${id}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for FormData
        },
      });

      // Axios will automatically parse the response data
      return response.data.brand;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Delete a brand
export const deleteProcessing = createAsyncThunk(
  'processing/deleteProcessing',
  async (id) => {
    try {
      await axios.get(`${API_URL}/delete/${id}`);
      return id; // Return the ID to remove it from the state
    } catch (error) {
      return error;
    }
  }
);



// Slice definition
const processingSlice = createSlice({
  name: 'processing',
  initialState,
  reducers: {
    // Optional non-async reducers here (if needed)
  },
  extraReducers: (builder) => {
    // Handle fetchBrands
    builder
      .addCase(fetchProcessing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProcessing.fulfilled, (state, action) => {
        state.loading = false;
        state.processing = action.payload;
      })
      .addCase(fetchProcessing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle fetchBrandById
    builder
      .addCase(fetchProcessingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProcessingById.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchProcessingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle createBrand
    builder
      .addCase(createProcessing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProcessing.fulfilled, (state, action) => {
        state.loading = false;
        state.processing.push(action.payload); // Add new brand to state
      })
      .addCase(createProcessing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle updateBrand
    builder
      .addCase(updateProcessing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProcessing.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          // Assuming you have a 'brands' array in your state
          state.processing = state.processing.map(process => 
            process.id === action.payload.id ? action.payload : process
          );
        }
        
      })
      .addCase(updateProcessing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle deleteBrand
    builder
      .addCase(deleteProcessing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProcessing.fulfilled, (state, action) => {
        state.loading = false;
        state.processing = state.processing.filter(
          (processing) => processing.id !== action.payload
        ); // Remove the brand from state
      })
      .addCase(deleteProcessing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer
export default processingSlice.reducer;
