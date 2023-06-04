import React from "react";
import { Link } from "react-router-dom";
import { BreadCrumbs, ErrorComp } from "../../components";
import { LayoutHOC } from "../../hoc";

export const ErrorPage = () => {
  const arr = [{ path: "/", title: "Главная" }];
  return (
    <LayoutHOC
      main={<ErrorComp msg="This page not exist" />}
      breadcrumbs={<BreadCrumbs links={arr} />}
    />
  );
};
