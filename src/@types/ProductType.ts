export interface Ingredient {
  icon: string;
  name: string;
  _id: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  ingredients: Ingredient[];
  category: string;
}
