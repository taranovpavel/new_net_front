import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Item = {
  id: number;
  name: string;
  price: number;  
  photo: string;
  memory: string;
  color: string;
  count: number
};

type StateType = {
  items: Item[];
  isModal: boolean
};

const loadFromStorage = (): Item[] => {
  try {
    const data = localStorage.getItem("cartItems");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (items: Item[]) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const initialState: StateType = {
  items: loadFromStorage(),
  isModal: false
};




const cartSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      const existingItem = state.items.find(item => item.name === action.payload.name && item.memory === action.payload.memory && item.color === action.payload.color);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      saveToStorage(state.items);
    },
    
    incrementCount: (state, action: PayloadAction<Item>) => {
      const item = state.items.find(item => item.name === action.payload.name && item.memory === action.payload.memory && item.color === action.payload.color);
      if (item) item.count += 1;
      saveToStorage(state.items);
    },
    decrementCount: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex(item => item.name === action.payload.name && item.memory === action.payload.memory && item.color === action.payload.color);
      if (index !== -1) {
        if (state.items[index].count > 1) {
          state.items[index].count -= 1;
        } else {
          state.items.splice(index, 1); // удалить если count = 0 или 1
        }
      }
      saveToStorage(state.items);
    },
    removeItem: (state, action: PayloadAction<Item>) => {
      state.items = state.items.filter(item => !(item.name === action.payload.name && item.memory === action.payload.memory && item.color === action.payload.color));
      saveToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveToStorage(state.items);
    },
    setIsModal: (state,action: PayloadAction<boolean>) =>{
      state.isModal = action.payload
    }
  }
});

export const { addItem, removeItem, clearCart,setIsModal,incrementCount, decrementCount } = cartSlice.actions;
export default cartSlice.reducer;