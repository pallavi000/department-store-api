import React, { useEffect } from "react";
import { AppState, useAppDispatch } from "../redux/store";
import { fetchOrderByUserId } from "../redux/reducers/ordersReducer";
import { useSelector } from "react-redux";

function Order() {
  const { orders } = useSelector((state: AppState) => ({
    orders: state.orders.orders,
  }));
  console.log(orders, "orders");

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOrderByUserId());
  }, []);

  return <div>Order</div>;
}

export default Order;
