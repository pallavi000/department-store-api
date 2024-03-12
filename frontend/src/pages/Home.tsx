import React, { useEffect, useState } from "react";
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
import { TProduct } from "../@types/Product";
import Product from "../components/Product";

function Home() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const getProducts = async () => {
    try {
      const response = await fetchAllProductsApi();
      setProducts(response);
    } catch (error) {}
  };
  useEffect(() => {
    getProducts();
  }, []);

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
      {products.map((product: TProduct) => {
        return <Product product={product} />;
      })}
    </Container>
  );
}

export default Home;
