export interface Product {
  id: string;
  name: string;
  brand?: string;
  price: number;
  category: string;
  subcategory?: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  specs: Record<string, string>;
  gallery: string[];
  has3D?: boolean;
  videoUrl?: string;
  isFeatured?: boolean;
  sku?: string;
  ean?: string;
  tags?: string[];
  stock?: number;
  amazonStock?: number;
  ebayStock?: number;
  weight?: number;
  relatedProductIds?: string[];
  isSpecialPromotion?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
