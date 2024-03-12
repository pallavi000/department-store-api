import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import CartItem from "./pages/CartItem";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/cart-items" element={<CartItem />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
