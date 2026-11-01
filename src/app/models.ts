export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface RecipeModel {
  id: number;
  name: string;
  imgUrl: string;
  description: string;
  ingredients: Ingredient[];
}
