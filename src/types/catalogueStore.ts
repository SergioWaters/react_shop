import { Sku } from "./sku";

export interface CatalogueStore {
  catalogue: { [key: Sku["art"]]: Sku };
  error: string;
}
