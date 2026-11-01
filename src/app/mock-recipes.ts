import { RecipeModel } from './models';

export const MOCK_RECIPES: RecipeModel[] = [
  {
    id: 1,
    name: 'Spaghetti Carbonara',
    description: 'Uma massa italiana clássica.',
    ingredients: [
      { name: 'Espaguete', quantity: 200, unit: 'g' },
      { name: 'Gemas', quantity: 4, unit: 'unidades' },
    ],
  },
  {
    id: 2,
    name: 'Salada Caprese',
    description: 'Uma salada de tomate, muçarela e manjericão.',
    ingredients: [
      { name: 'Tomates', quantity: 4, unit: 'unidades' },
      { name: 'Muçarela', quantity: 200, unit: 'g' },
    ],
  },
];
