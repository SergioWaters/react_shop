import { CartAction, CartState } from "../../../types";
import {
  CART_ADD,
  CART_CLEAR_ALL,
  CART_DEL,
  CART_REM,
  CART_SET_QUANTITY,
  CART_TOTAL,
} from "./";

const defaultState: CartState = {
  cart: {},
  error: "",
  total: 0,
};

export const cartReducer = (s: CartState = defaultState, a: CartAction) => {
  switch (a.type) {
    case CART_ADD:
      console.log(a.type, s, a);
      return {
        ...s,
        cart: {
          ...s.cart,
          [a.payload]: !!s.cart[a.payload] ? ++s.cart[a.payload] : 1,
        },
        total: Object.values(s.cart).reduce((c, n) => c + n, 0),
      };

    case CART_REM:
      console.log(a.type, s, a);
      return {
        ...s,
        cart: {
          ...s.cart,
          [a.payload]:
            s.cart[a.payload] < 1
              ? (s.cart[a.payload] = 1)
              : --s.cart[a.payload],
        },
        total: Object.values(s.cart).reduce((c, n) => c + n, 0),
      };

    case CART_SET_QUANTITY:
      console.log(a.type, s, a, Object.values(s.cart));
      return {
        ...s,
        cart: {
          ...s.cart,
          [a.payload]: a.quantity,
        },
        total: Object.values(s.cart).reduce((c, n) => c + n, 0),
      };

    case CART_DEL:
      console.log(a.type, s, a);
      delete s.cart[a.payload];
      return { ...s, total: Object.values(s.cart).reduce((c, n) => c + n, 0) };

    case CART_CLEAR_ALL:
      return { ...defaultState };

    case CART_TOTAL:
      return { ...s, total: Object.values(s.cart).reduce((c, n) => c + n, 0) };

    default:
      return { ...s };
  }
};
