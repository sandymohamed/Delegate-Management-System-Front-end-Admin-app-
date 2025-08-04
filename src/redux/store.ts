import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import vanReducer from "./slices/vanSlice";

 const store = configureStore({
  reducer: {
    products: productsReducer,
    van: vanReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;