import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductState {
  product: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  loading: false,
  error: null,
};

// Асинхронный thunk для получения данных с API
export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`https://new-net-back.onrender.com/api/products/${id}`);
      const data = response.data
      return {
        name: data.product.name,
        prices: data.prices,
        colors: data.colors,
        availabilites: data.availability,
        images: data.images
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProduct.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;