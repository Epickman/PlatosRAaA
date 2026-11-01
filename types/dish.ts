export interface Dish {
  id: string;
  name: string;
  description: string;
  price?: number;
  category: string;
  subcategory?: string;
  modelUrl?: string;
  /** false si el modelo es demasiado pesado para generar el USDZ en el iPhone */
  iosAr?: boolean;
  imageUrl?: string;
  calories?: number;
  prepTime?: string;
  allergens?: string[];
  ingredients?: string[];
  available: boolean;
  featured?: boolean;
}

export type Category = {
  id: string;
  name: string;
  icon: string;
};
