import React, { useEffect, useState } from "react";
import { Button, Card, Container, Stack, Typography } from "@mui/material";
import { TCart } from "../@types/Cart";
import { addToCartApi, deleteCartApi } from "../service/cartService";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../redux/store";
import {
  fetchAllCarts,
  removeCartById,
  updateCartItem,
} from "../redux/reducers/cartsReducer";

function CartItem() {
  const [total, seTotal] = useState<number>(0);
  const { carts, totalPrice, totalOrderQuantity } = useSelector(
    (state: AppState) => ({
      carts: state.carts.carts,
      totalPrice: state.carts.totalPrice,
      totalOrderQuantity: state.carts.totalOrderQuantity,
    })
  );

  const dispatch = useAppDispatch();
  console.log(totalOrderQuantity, "orderQuantity");

  useEffect(() => {
    dispatch(fetchAllCarts());
  }, []);

  useEffect(() => {
    if (carts && carts.length) {
      const cartTotal = carts.reduce((total, cart) => {
        return total;
      }, 0);
      seTotal(cartTotal);
    }
  }, [carts]);

  const updateCart = async (cartId: string, type: string) => {
    const existingCart = carts.find((cart) => cart._id === cartId);
    if (!existingCart) return;
    const cart = { ...existingCart };
    console.log(cart, "cartttttttt ");
    if (type === "increase") {
      console.log("cart increase");
      cart.quantity += 1;
    } else if (type === "decrease" && cart.quantity > 1) {
      cart.quantity -= 1;
    }
    console.log(cart.quantity, "updated quantity");
    const data = {
      user: cart.user?._id,
      product: cart.product?._id,
      quantity: cart.quantity,
      total: cart.total,
    };
    dispatch(updateCartItem(data));
  };

  const deleteCart = async (cartId: string) => {
    dispatch(removeCartById(cartId));
  };

  return (
    <Container maxWidth="lg">
      <Stack direction={"row"}>
        <Typography variant="h4">Cart Items</Typography>
      </Stack>

      {carts.length ? (
        <>
          {carts.map((cart: TCart) => {
            return (
              <Card sx={{ paddingTop: 5, width: "100%" }}>
                <Stack direction={"row"} gap={4} alignItems={"center"}>
                  <Typography>{cart.product?.name}</Typography>
                  <Typography>{cart.product?.price}</Typography>
                  <Typography>{cart.total}</Typography>
                  <Button
                    variant="contained"
                    onClick={() => updateCart(cart._id, "increase")}
                  >
                    Inc
                  </Button>
                  <Typography>{cart.quantity}</Typography>

                  <Button
                    variant="contained"
                    onClick={() => updateCart(cart._id, "decrease")}
                  >
                    Dec
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ background: "red" }}
                    onClick={() => deleteCart(cart._id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </Card>
            );
          })}
          <Typography sx={{ paddingY: 8, textAlign: "right" }}>
            Total:{totalPrice}
          </Typography>
        </>
      ) : (
        <div>No Cart item</div>
      )}

      <Stack direction={"row"} justifyContent={"space-between"} paddingY={5}>
        <Button variant="contained" sx={{ background: "black" }}>
          <Link to={"/"}>Continue Shopping</Link>
        </Button>
        <Button variant="contained" sx={{ background: "black" }}>
          <Link to={"/checkout"}>CheckOut</Link>
        </Button>
      </Stack>
    </Container>
  );
}

export default CartItem;
