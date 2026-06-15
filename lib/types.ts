export interface ProductCategoryRef {
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  categories: ProductCategoryRef[];
  primaryCategory: ProductCategoryRef | null;
  imageFile: string;
  imageExists: boolean;
  activeIngredient: string;
  crops: string;
  pestDisease: string;
  dose: string;
  badge: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}
