import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppState, useAppDispatch } from "../redux/store";
import { fetchProductById } from "../redux/reducers/productReducer";
import { useSelector } from "react-redux";
import { Button, Grid, Stack, Typography } from "@mui/material";

function ProductDetail() {
  const params = useParams();
  const productId = params.id;

  const dispatch = useAppDispatch();
  const { product } = useSelector((state: AppState) => ({
    product: state.product.product,
  }));

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById({ id: productId }));
    }
  }, []);

  return (
    <Grid container maxWidth={"lg"} padding={2} flexWrap={"wrap"}>
      <Grid item xs={12} md={6}>
        <img src="https://di2ponv0v5otw.cloudfront.net/posts/2022/01/16/61e4cc3393649f337f77c0af/m_61e4cc80efd0e4b1052fc97b.jpg" />
      </Grid>
      <Grid item xs={12} md={6} paddingX={4} paddingY={4}>
        <Stack gap={4}>
          <Typography variant="h4">{product?.name}</Typography>
          <Typography variant="body1">{product?.detail}</Typography>
          <Typography variant="body1">{product?.category?.name}</Typography>
          <Typography variant="body1">{product?.price}</Typography>

          <Stack direction={"row"} gap={4}>
            <Button variant="outlined">Add To Cart</Button>
            <Button variant="contained">Buy Now</Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default ProductDetail;
