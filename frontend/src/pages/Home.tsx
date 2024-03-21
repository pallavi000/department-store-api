import React, { useCallback, useEffect, useState } from "react";
import { fetchAllProductsApi } from "../service/productService";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { TProduct } from "../@types/Product";
import Product from "../components/Product";
import { fetchProducts } from "../redux/reducers/productsReducer";
import { AppState, useAppDispatch } from "../redux/store";

function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const { products, isLoading } = useSelector((state: AppState) => ({
    products: state.products.products,
    isLoading: state.products.isLoading,
  }));

  isLoading && <div>Loading</div>;

  return (
    <Container
      maxWidth={"lg"}
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 3,
        flexWrap: "wrap",
        paddingTop: 5,
      }}
    >
      {products?.map((product: TProduct) => {
        return <Product product={product} />;
      })}
    </Container>
  );
}

export default Home;
