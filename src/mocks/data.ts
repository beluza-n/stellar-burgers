import ingredientImage from '../stories/assets/ingredient-placeholder.svg';

import type { TIngredient, TOrder } from '@utils-types';

/** Переключи на false, когда API снова заработает */
export const USE_MOCKS = true;

const mockIngredient = (
  _id: string,
  name: string,
  type: TIngredient['type'],
  price: number
): TIngredient => ({
  _id,
  name,
  type,
  price,
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  image: ingredientImage,
  image_large: ingredientImage,
  image_mobile: ingredientImage,
});

export const mockIngredients: TIngredient[] = [
  mockIngredient('bun-1', 'Краторная булка N-200i', 'bun', 20),
  mockIngredient('bun-2', 'Флюоресцентная булка R2-D3', 'bun', 20),

  mockIngredient('main-1', 'Филе Люминесцентного тетраодонтимформа', 'main', 300),
  mockIngredient('main-2', 'Мясо бессмертных моллюсков Protostomia', 'main', 300),
  mockIngredient('main-3', 'Говяжий метеорит (отбивная)', 'main', 300),
  mockIngredient('main-4', 'Биокотлета из марсианской Магнолии', 'main', 300),
  mockIngredient('main-5', 'Плоды фалленианского дерева', 'main', 80),
  mockIngredient('main-6', 'Кристаллы марсианских альфа-сахаридов', 'main', 80),
  mockIngredient('main-7', 'Хрустящие минеральные кольца', 'main', 80),
  mockIngredient('main-8', 'Мини-салат Экзо-Плантаго', 'main', 80),
  mockIngredient('main-9', 'Сыр с астероидной плесенью', 'main', 80),

  mockIngredient('sauce-1', 'Соус Spicy-X', 'sauce', 30),
  mockIngredient('sauce-2', 'Соус фирменный Space Sauce', 'sauce', 30),
  mockIngredient('sauce-3', 'Соус традиционный галактический', 'sauce', 30),
  mockIngredient('sauce-4', 'Соус с шипами Антарианского плоскоходца', 'sauce', 30),
];

export const mockOrders: TOrder[] = [
  {
    _id: 'order-1',
    status: 'done',
    name: 'Краторный spicy био-бургер',
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:05:00.000Z',
    number: 12345,
    ingredients: ['bun-1', 'sauce-1', 'main-4', 'bun-1'],
  },
  {
    _id: 'order-2',
    status: 'pending',
    name: 'Люминесцентный бургер',
    createdAt: '2024-01-15T11:00:00.000Z',
    updatedAt: '2024-01-15T11:01:00.000Z',
    number: 12346,
    ingredients: ['bun-2', 'main-1', 'sauce-2', 'bun-2'],
  },
  {
    _id: 'order-3',
    status: 'done',
    name: 'Spicy бургер',
    createdAt: '2024-01-15T12:00:00.000Z',
    updatedAt: '2024-01-15T12:03:00.000Z',
    number: 12347,
    ingredients: ['bun-1', 'sauce-1', 'main-5', 'bun-1'],
  },
];

export const mockFeeds = {
  success: true,
  orders: mockOrders,
  total: 120,
  totalToday: 3,
};

export const getMockOrderByNumber = (number: number): TOrder => {
  const order = mockOrders.find((item) => item.number === number);
  return order ?? mockOrders[0];
};
