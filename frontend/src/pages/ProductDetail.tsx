import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppState, useAppDispatch } from "../redux/store";
import { fetchProductById } from "../redux/reducers/productReducer";
import { useSelector } from "react-redux";

function ProductDetail() {
  const params = useParams();
  const productId = params.id;

  const dispatch = useAppDispatch();
  const { product } = useSelector((state: AppState) => ({
    product: state.product.product,
  }));
  console.log(product, productId, "producttttt");

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById({ id: productId }));
    }
  }, []);

  return <div>ProductDetail</div>;
}

export default ProductDetail;
