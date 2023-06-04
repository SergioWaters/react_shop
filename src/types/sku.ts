export interface Sku {
  art: string;
  info: string;
  brand: string;
  manufacturer: string;
  price: number;
  pack: number;
  unitsCount: number;
  measureUnits: string;
  images: Array<string>;
  categories: Array<string>;
  description?: string;
  thumbnail?: string;
  stock?: number;
}

export interface CartSku extends Sku {
  quantity: number;
}
