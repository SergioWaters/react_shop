import { Sku } from "./sku";

export interface Action {
  type: string;
  payload: unknown;
}

export interface CartAction extends Action {
  payload: string;
  quantity?: number;
}

export interface CatalAction extends Action {
  payload: Sku;
}
