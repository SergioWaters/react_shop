import React from "react";
import { Link } from "react-router-dom";
import { BreadCrumbs } from "../../components";
import { LayoutHOC } from "../../hoc";

export const HomePage = () => {
  const arr = [
    { path: "/cart", title: "Корзина" },
    { path: "/product/184604049097548", title: "Страница товара" },
    { path: "/catalogue", title: "Каталог" },
    { path: "*", title: "404" },
    { path: "/admin", title: "AdminPage" },
    { path: "/", title: "Главная" },
  ];

  const list = (
    <main className="container">
      <h2>Главная</h2>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/cart"}>cart</Link>
        </li>
        <li>
          <Link to={"/product/*"}>product</Link>
        </li>
        <li>
          <Link to={"/catalogue"}>catalogue</Link>
        </li>
        <li>
          <Link to={"*"}>404</Link>
        </li>
        <li>
          <Link to={"/admin"}>AdminPage</Link>
        </li>
      </ul>
    </main>
  );
  return <LayoutHOC main={list} breadcrumbs={<BreadCrumbs links={arr} />} />;
};
