import { FC } from "react";
import { LayoutHOC } from "../../hoc";
import { BreadCrumbs, CatalogueComp } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { IGlobalStore } from "../../types";
import { CART_ADD } from "../../store/reducers/cartReducer/types";

export const CataloguePage: FC = () => {
  const dispatch = useDispatch();
  const arr = [
    { path: "/", title: "Главная" },
    { path: "/catalogue", title: "Каталог" },
  ];

  const toCart = (id: string) => {
    dispatch({ type: CART_ADD, payload: id });
  };

  const { catalogue } = useSelector((s: IGlobalStore) => s.catalogue);

  return (
    <LayoutHOC
      main={
        <CatalogueComp
          catalogueArr={Object.values(catalogue)}
          categoriesArr={[
            ...new Set(
              Object.values(catalogue)
                .map((sku) => sku.categories)
                .flat()
            ),
          ]}
          toCart={toCart}
        />
      }
      breadcrumbs={<BreadCrumbs links={arr} />}
    />
  );
};
