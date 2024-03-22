import React, { useEffect } from "react";
import { AppState, useAppDispatch } from "../redux/store";
import { useParams } from "react-router-dom";
import { fetchProductsByCategoryId } from "../redux/reducers/productsReducer";
import { useSelector } from "react-redux";
import { Stack, Typography } from "@mui/material";
import Product from "../components/Product";
import { TProduct } from "../@types/Product";

function CategoryProduct() {
  const params = useParams();
  const categoryId = params.id;

  const dispatch = useAppDispatch();

  const { products } = useSelector((state: AppState) => ({
    products: state.products.products,
  }));

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategoryId({ id: categoryId }));
    }
  }, []);

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", paddingY: 4 }}>
        Products By Category
      </Typography>
      <Stack direction={"row"} flexWrap={"wrap"} gap={4} px={4}>
        {products?.map((product: TProduct) => {
          return <Product product={product} />;
        })}
      </Stack>
    </>
  );
}

export default CategoryProduct;
