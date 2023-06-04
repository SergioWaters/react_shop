export interface CartState {
  cart: { [key: string]: number };
  error: string;
  total: number;
}
