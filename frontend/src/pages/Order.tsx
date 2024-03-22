import React, { useEffect } from "react";
import { AppState, useAppDispatch } from "../redux/store";
import { fetchOrderByUserId } from "../redux/reducers/ordersReducer";
import { useSelector } from "react-redux";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function Order() {
  const { orders } = useSelector((state: AppState) => ({
    orders: state.orders.orders,
  }));
  console.log(orders, "orders");

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOrderByUserId());
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order Id</TableCell>
            <TableCell align="right">Payment Method</TableCell>
            <TableCell align="right">Shipping Address</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.payment_method}</TableCell>
              <TableCell>{order.shipping.city}</TableCell>
              <TableCell>{order.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Order;
