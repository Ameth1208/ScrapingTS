export interface IProductData {
  name?: string;
  image?: string | null;
  state?: string;
  Product?: IProduct;
}

export interface IProduct {
  name?: string;
  price?: string;
  description?: string;
  productMeta?: IProductMeta;
}

interface IProductMeta {
  category?: string;
  brand?: string;
  sku?: string;
}
