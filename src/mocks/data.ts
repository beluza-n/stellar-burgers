import ingredientImage from '../stories/assets/ingredient-placeholder.svg';

import type { TIngredient, TOrder } from '@utils-types';

/** Переключи на false, когда API снова заработает */
export const USE_MOCKS = true;

export const mockIngredients: TIngredient[] = [
  {
    _id: 'bun-1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: ingredientImage,
    image_large: ingredientImage,
    image_mobile: ingredientImage,
  },
  {
    _id: 'sauce-1',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: ingredientImage,
    image_large: ingredientImage,
    image_mobile: ingredientImage,
  },
  {
    _id: 'main-1',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: ingredientImage,
    image_large: ingredientImage,
    image_mobile: ingredientImage,
  },
  {
    _id: 'main-2',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: ingredientImage,
    image_large: ingredientImage,
    image_mobile: ingredientImage,
  },
];

export const mockOrders: TOrder[] = [
  {
    _id: 'order-1',
    status: 'done',
    name: 'Краторный spicy био-бургер',
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:05:00.000Z',
    number: 12345,
    ingredients: ['bun-1', 'sauce-1', 'main-1', 'bun-1'],
  },
  {
    _id: 'order-2',
    status: 'pending',
    name: 'Люминесцентный бургер',
    createdAt: '2024-01-15T11:00:00.000Z',
    updatedAt: '2024-01-15T11:01:00.000Z',
    number: 12346,
    ingredients: ['bun-1', 'main-2', 'bun-1'],
  },
  {
    _id: 'order-3',
    status: 'done',
    name: 'Spicy бургер',
    createdAt: '2024-01-15T12:00:00.000Z',
    updatedAt: '2024-01-15T12:03:00.000Z',
    number: 12347,
    ingredients: ['bun-1', 'sauce-1', 'bun-1'],
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
