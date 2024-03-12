import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Button, Card, Container, Stack, Typography } from "@mui/material";
import { TCart } from "../@types/Cart";
import { addToCartApi, deleteCartApi } from "../service/cartService";
import { Link } from "react-router-dom";

function CartItem() {
  const { carts, setCarts } = useAuthContext();
  const [total, seTotal] = useState<number>(0);

  useEffect(() => {
    if (carts && carts.length) {
      const cartTotal = carts.reduce((total, cart) => {
        return total + cart.total;
      }, 0);
      seTotal(cartTotal);
    }
  }, [carts]);

  const updateCart = async (cartId: string, type: string) => {
    const newCarts = [...carts];
    const cartIndex = newCarts.findIndex((cart) => cart._id === cartId);
    if (cartIndex === -1) return;

    if (type === "increase") {
      newCarts[cartIndex].quantity += 1;
    } else if (type === "decrease" && newCarts[cartIndex].quantity > 1) {
      newCarts[cartIndex].quantity = newCarts[cartIndex].quantity - 1;
    }
    setCarts(newCarts);

    const data = {
      product: newCarts[cartIndex].product._id,
      user: newCarts[cartIndex].user._id,
      quantity: newCarts[cartIndex].quantity,
      total: newCarts[cartIndex].product?.price * newCarts[cartIndex].quantity,
    };
    newCarts[cartIndex].total =
      newCarts[cartIndex].quantity * newCarts[cartIndex].product?.price;
    await addToCartApi(data);
    // setCarts(response);
  };

  const deleteCart = async (cartId: string) => {
    try {
      const deletedData = carts.filter((cart) => cart._id !== cartId);
      setCarts(deletedData);
      await deleteCartApi(cartId);
    } catch (error) {
      console.log(error);
    }
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
            Total:{total}
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
