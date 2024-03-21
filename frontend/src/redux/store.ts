import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import productsReducer from "./reducers/productsReducer";
import cartsReducer from "./reducers/cartsReducer";
import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productReducer";
import authReducer from "./reducers/authReducer";
import categoryReducer from "./reducers/categoryReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = {
  products: productsReducer,
  product: productReducer,
  category: categoryReducer,
  categories: categoriesReducer,
  carts: cartsReducer,
  cart: cartReducer,
  auth: authReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
