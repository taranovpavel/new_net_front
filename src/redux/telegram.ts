import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// AsyncThunk для отправки уведомления на backend
export const notifyProduct = createAsyncThunk<void, string>(
  "notify/notifyProduct",
  async (productId) => {
    const res = await fetch("http://localhost:5000/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    if (!res.ok) throw new Error("Failed to notify");
  }
);

// Создаем slice для состояния уведомления (пример, можно без него)
const notifySlice = createSlice({
  name: "notify",
  initialState: { loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(notifyProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(notifyProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(notifyProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка";
      });
  },
});

export const store = configureStore({
  reducer: {
    notify: notifySlice.reducer,
  },
});

// Типы для dispatch и state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Хук с типом dispatch для использования в React компонентах
export const useAppDispatch = () => useDispatch<AppDispatch>();