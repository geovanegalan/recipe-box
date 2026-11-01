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
    imgUrl:
      'https://www.estadao.com.br/resizer/Io-v_6tX-1YNYWiyucjC-BN2ctw=/arc-anglerfish-arc2-prod-estadao/public/T26A3HUNCJLQXPS3N45ABM6KTM.jpg',
  },
  {
    id: 2,
    name: 'Salada Caprese',
    description: 'Uma salada de tomate, muçarela e manjericão.',
    ingredients: [
      { name: 'Tomates', quantity: 4, unit: 'unidades' },
      { name: 'Muçarela', quantity: 200, unit: 'g' },
    ],
    imgUrl: 'https://guiadacozinha.com.br/wp-content/uploads/2005/01/salada-caprese.webp',
  },
];
