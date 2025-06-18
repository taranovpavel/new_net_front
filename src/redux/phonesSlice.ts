import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Тип для одного телефона
export type Phone = {
  id: number;
  name: string;
  brand: string;
  price: string;  // цена приходит как строка
  photos: string; // строка JSON-массива URL фотографий
};

// Тип состояния слайса
interface PhonesState {
  products: Phone[];
  loading: boolean;
  error: string | null;
}

// Начальное состояние с типами
const initialState: PhonesState = {
  products: [],
  loading: false,
  error: null,
};

// Асинхронный thunk для загрузки продуктов с сервера
export const fetchAllProducts = createAsyncThunk<
  Phone[],           // тип успешного результата (payload)
  void,              // тип аргумента (здесь ничего не передаём)
  { rejectValue: string }  // тип reject с ошибкой
>(
  'product/fetchAllProducts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Phone[]>('https://new-net-back.onrender.com/api/phones');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const phonesSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action: PayloadAction<Phone[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export default phonesSlice.reducer;