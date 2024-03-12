import React, { useEffect, useState } from "react";
import { TProduct } from "../@types/Product";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useAuthContext } from "../context/AuthContext";
import { TCart, TCartInput } from "../@types/Cart";
import { addToCartApi } from "../service/cartService";
import { Link } from "react-router-dom";

function Product({ product }: { product: TProduct }) {
  const { setCarts, carts, user } = useAuthContext();
  const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);

  const addToCart = async (productId: string) => {
    try {
      if (user && productId) {
        const data: TCartInput = {
          product: productId,
          user: user?._id,
          quantity: 1,
          total: product.price * 1,
        };
        const response = await addToCartApi(data);
        setIsAlreadyInCart(true);
        setCarts(response);
      }
    } catch (error) {}
  };

  console.log(carts);

  return (
    <Card
      sx={{
        minWidth: 275,
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="h5" component="div">
          {product.price}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {product.category?.name}
        </Typography>
        <Typography variant="body2">
          {product.brand?.name}
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        {isAlreadyInCart ? (
          <Button size="small">
            <Link to="/cart-items">View CartI List</Link>
          </Button>
        ) : (
          <Button size="small" onClick={() => addToCart(product._id)}>
            Add To Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Product;
