import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



// Initial state
const initialState = {
    bills: [],
    update_bill_id:null,
    loading: false,
    error: null,
};

const API_URL = `${import.meta.env.VITE_URL}/bill`;

// Fetch all brands
export const fetchBills = createAsyncThunk(
    'bills/fetchBills',
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
export const fetchBillById = createAsyncThunk(
    'bill/fetchBillById',
    async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            return error;
        }
    }
);

export const createBill = createAsyncThunk(
    'bill/createBill',
    async (billData) => {
        try {
            const response = await axios.post(`${API_URL}/save`, billData,
                {});
            return response.data.bill;
        } catch (error) {
            return error;
        }
    });

export const updateBill = createAsyncThunk(
    'bill/updateBill',
    async ({ upId,updateBillData }, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/update/${upId}`, updateBillData,
                {});
            return response.data.bill;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response ? error.response.data : error.message
            );
        }
    })

export const deleteBill = createAsyncThunk(
    'bill/deleteBill',
    async (id) => {
        try {
            await axios.get(`${API_URL}/delete/${id}`);
            return id; // Return the ID to remove it from the state
        } catch (error) {
            return error;
        }
    }
);







const billSlicer = createSlice({
    name: 'bills',
    initialState,
    reducers: {
        setUpdateById:(state, action)=>{
            state.update_bill_id = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBills.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBills.fulfilled, (state, action) => {
                state.loading = false;
                state.bills = action.payload;
            })
            .addCase(fetchBills.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        builder
            .addCase(fetchBillById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBillById.fulfilled, (state, action) => {
                state.loading = false;
                state.bill = action.payload;
            })
            .addCase(fetchBillById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        builder
            .addCase(createBill.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBill.fulfilled, (state, action) => {
                state.loading = false;
                state.bills.push(action.payload);
            })
            .addCase(createBill.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        builder
            .addCase(updateBill.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBill.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload && action.payload.id) {
                    // Assuming you have a 'brands' array in your state
                    state.bills = state.bills.map(bill =>
                        bill.id === action.payload.id ? action.payload : bill
                    );
                }
            })
            .addCase(updateBill.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        builder
            .addCase(deleteBill.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBill.fulfilled, (state, action) => {
                state.loading = false;
                state.bills = state.bills.filter(
                  (bill) => bill.id !== action.payload
                ); // Remove the brand from state
              })
            .addCase(deleteBill.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const {setUpdateById} =  billSlicer.actions;

export default billSlicer.reducer;

