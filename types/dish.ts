export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  modelUrl?: string;
  iosModelUrl?: string;
  imageUrl: string;
  calories: number;
  prepTime: string;
  allergens: string[];
  ingredients: string[];
  available: boolean;
  featured?: boolean;
}

export type Category = {
  id: string;
  name: string;
  icon: string;
};
