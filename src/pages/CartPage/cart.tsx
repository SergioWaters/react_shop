import { FC } from "react";
import { LayoutHOC } from "../../hoc";
import { BreadCrumbs, CartComp } from "../../components";

export const CartPage: FC = () => {
  const arr = [
    { path: "/", title: "Главная" },
    { path: "/cart", title: "Корзина" },
  ];

  return (
    <LayoutHOC main={<CartComp />} breadcrumbs={<BreadCrumbs links={arr} />} />
  );
};
