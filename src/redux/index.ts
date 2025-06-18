import { configureStore } from '@reduxjs/toolkit';
import phoneReducer from './phoneSlice';
import phonesReducer from './phonesSlice';
import cartReeducer from './cartSlice'

export const store = configureStore({
  reducer: {
    phone: phoneReducer,
    phones: phonesReducer,
    cart: cartReeducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;