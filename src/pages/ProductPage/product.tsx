import React, { FC, useEffect, useMemo, useState } from "react";
import { LayoutHOC } from "../../hoc";
import { BreadCrumbs, ProductComp } from "../../components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IGlobalStore, CartSku } from "../../types";
import { useDispatch } from "react-redux";

export const ProductPage: FC = () => {
  const { productId } = useParams();
  const { catalogue } = useSelector((s: IGlobalStore) => s.catalogue);
  const { cart, total } = useSelector((s: IGlobalStore) => s.cart);
  const dispatch = useDispatch();

  const sku: CartSku | null = useMemo(() => {
    return productId && catalogue[productId]
      ? { ...catalogue[productId], quantity: cart[productId] }
      : null;
  }, [productId, total]);

  const arr = [
    { path: "/", title: "Главная" },
    { path: "/catalogue", title: "Каталог" },
    { path: "/product/" + productId, title: productId + "" },
  ];

  const handleEmit = (action: string, value: number) => {
    dispatch({ type: action, payload: productId, quantity: value });
  };

  return (
    <LayoutHOC
      main={<ProductComp sku={sku} emit={handleEmit} />}
      breadcrumbs={<BreadCrumbs links={arr} />}
    />
  );
};
