import { combineReducers, legacy_createStore as createStore } from "redux";
import { cartReducer, catalogueReducer } from "./reducers";
import { IGlobalStore } from "../types/globalStore";

const reducer = combineReducers({
  cart: cartReducer,
  catalogue: catalogueReducer,
});

export const store: IGlobalStore = createStore(reducer);
