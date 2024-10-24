import { createSlice, createAsyncThunk, createActionCreatorInvariantMiddleware } from '@reduxjs/toolkit';
import axios from 'axios';



// Initial state
const initialState = {
  admin: [],
  update_id: null,
  loading: false,
  error: null,
};





// Define the base URL for API requests
const API_URL = `${import.meta.env.VITE_URL}/admin`; // Adjust this to your actual API endpoint

// Fetch all brands
export const fetchAdmin = createAsyncThunk(
  'admin/fetchAdmin',
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
export const fetchAdminById = createAsyncThunk(
  'admin/fetchAdminById',
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
export const createAdmin = createAsyncThunk(
  'admin/createAdmin',
  async (produtctData) => {

    try {
      const response = await axios.post(`${API_URL}/save`, produtctData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.admin;
      
    } catch (error) {
      // Handle error and pass the error message to the thunk
      console.error('Error submitting form:', error);
      return error;
    }
  }
);

// Update a brand
export const updateAdmin = createAsyncThunk(
  'admin/updateAdmin',
  async ({ upID, adminUpdate }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/update/${upID}`, adminUpdate, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for FormData
        },
      });

      // Axios will automatically parse the response data
      return response.data.admin;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Delete a brand
export const deleteAdmin = createAsyncThunk(
  'admin/deleteAdmin',
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
const ProfileSlicer = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUpdateById: (state, action)=>{
      state.update_id = action.payload;
    }
  },

  extraReducers: (builder) => {
    // Handle fetchBrands
    builder
      .addCase(fetchAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(fetchAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle fetchBrandById
    builder
      .addCase(fetchAdminById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminById.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchAdminById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle createBrand
    builder
      .addCase(createAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin.push(action.payload); // Add new brand to state
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle updateBrand
    builder
      .addCase(updateAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          // Assuming you have a 'brands' array in your state
          state.admin = state.admin.map(admin => 
            admin.id === action.payload.id ? action.payload : admin
          );
        }
        
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle deleteBrand
    builder
      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = state.admin.filter(
          (product) => product.id !== action.payload
        ); // Remove the brand from state
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer
export const {setUpdateById} = ProfileSlicer.actions
export default ProfileSlicer.reducer;



