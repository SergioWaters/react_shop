import { CatalAction, Sku, CatalogueStore } from "../../../types";
import { CATAL_DEL, CATAL_ADD, productsArr } from "./";

const defaultState: CatalogueStore = {
  catalogue: {},
  error: "",
};

productsArr.forEach((p: Sku) => {
  defaultState.catalogue[p.art] = p;
});

export const catalogueReducer = (
  s = defaultState,
  a: CatalAction
): CatalogueStore => {
  const pl = a.payload;
  switch (a.type) {
    case CATAL_ADD:
      return { ...s, catalogue: { ...s.catalogue, [pl.art]: pl } };
    case CATAL_DEL:
      delete s.catalogue[pl.art];
      return { ...s };
    default:
      return { ...s };
  }
};
