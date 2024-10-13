import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "categoriesData/fetchCategories",
  async () => {
    const res = await axios.get(`http://localhost:5000/api/category`);
    return res.data.data;
  }
);

const caregorySlice = createSlice({
  name: "categoriesData",
  initialState: {
    isloading: false,
    categoriesData: [],
    error: null,
  },
  extraReducers: (builders) => {
    builders.addCase(fetchCategories.pending, (state) => {
      state.isloading = true;
    });
    builders.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isloading = false;
      state.categoriesData = action.payload;
      state.error = null
    });
    builders.addCase(fetchCategories.rejected, (state, action) => {
      state.isloading = false;
      state.categoriesData = []
      state.error= action.error.message
    });

  },
});

export default caregorySlice.reducer