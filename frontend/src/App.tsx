import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import CartItem from "./pages/CartItem";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import { AppState, useAppDispatch } from "./redux/store";
import { useSelector } from "react-redux";
import { currentUser } from "./redux/reducers/authReducer";
import Order from "./pages/Order";
import ProductDetail from "./pages/ProductDetail";
import CategoryProduct from "./pages/CategoryProduct";

function App() {
  const dispatch = useAppDispatch();
  const access_token = useSelector(
    (state: AppState) => state.auth.access_token
  );

  useEffect(() => {
    if (access_token) {
      dispatch(currentUser());
    }
  }, [access_token]);

  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/cart-items" element={<CartItem />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order-list" element={<Order />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/product-category/:id" element={<CategoryProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
