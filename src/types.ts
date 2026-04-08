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
  amazonActive?: boolean;
  ebayActive?: boolean;
  courier?: string;
  relatedProductIds?: string[];
  isSpecialPromotion?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  cost?: number;
  markup?: number;
  amazonMarkup?: number;
  ebayMarkup?: number;
  vinceCommission?: number;
  amazonPrice?: string;
  ebayPrice?: string;
  amazonTitle?: string;
  ebayTitle?: string;
  variants?: {
    id: string;
    type: string;
    value: string;
    sku: string;
    totalStock: number;
    allocations: { amazon: number; ebay: number };
  }[];
}

export interface CartItem extends Product {
  quantity: number;
}
