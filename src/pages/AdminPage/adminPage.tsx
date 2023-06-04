import { FC } from "react";
import { LayoutHOC } from "../../hoc";
import { BreadCrumbs, AdminComp } from "../../components";

export const AdminPage: FC = () => {
  const arr = [
    { path: "/cart", title: "CartPage" },
    { path: "/product/*", title: "ProductPage" },
    { path: "/catalogue", title: "CataloguePage" },
    { path: "/admin", title: "AdminPage" },
  ];

  return (
    <div>
      <LayoutHOC
        main={<AdminComp />}
        breadcrumbs={<BreadCrumbs links={arr} />}
      />
    </div>
  );
};
