import { Store } from "redux";
import { CartState, CatalogueStore } from "./";

export interface IGlobalStore extends Store {
  cart: CartState;
  catalogue: CatalogueStore;
}
