import {
  addIngredient,
  clearConstructor,
  constructorSlice,
  moveIngredient,
  removeIngredient,
} from '../constructorSlice';

import type { TConstructorIngredient, TConstructorState } from '@utils-types';

const ingredient: TConstructorIngredient = {
  _id: 'first-ingredient-id',
  id: 'first-constructor-id',
  name: 'Говяжий метеорит',
  type: 'main',
  proteins: 40,
  fat: 20,
  carbohydrates: 10,
  calories: 300,
  price: 3000,
  image: 'https://example.com/main.png',
  image_large: 'https://example.com/main-large.png',
  image_mobile: 'https://example.com/main-mobile.png',
};

const bun: TConstructorIngredient = {
  ...ingredient,
  _id: 'bun-id',
  id: 'bun-constructor-id',
  name: 'Краторная булка',
  type: 'bun',
};

const sauce: TConstructorIngredient = {
  ...ingredient,
  _id: 'second-ingredient-id',
  id: 'second-constructor-id',
  name: 'Соус Spicy-X',
  type: 'sauce',
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
};

describe('Тесты редьюсера конструктора', () => {
  test('возвращает начальное состояние для неизвестного экшена', () => {
    const state = constructorSlice.reducer(undefined, { type: 'UNKNOWN' });

    expect(state).toEqual(initialState);
  });

  test('добавляем булку', () => {
    const action = addIngredient(bun);
    const state = constructorSlice.reducer(initialState, action);

    expect(state).toEqual({
      bun: action.payload,
      ingredients: [],
    });
  });

  test('Добавляем начинку', () => {
    const action = addIngredient(ingredient);
    const state = constructorSlice.reducer(initialState, action);

    expect(state).toEqual({
      bun: null,
      ingredients: [action.payload],
    });
  });

  test('Удаляем начинку', () => {
    const initialState: TConstructorState = {
      bun: null,
      ingredients: [ingredient, sauce],
    };

    const state = constructorSlice.reducer(
      initialState,
      removeIngredient(ingredient.id)
    );

    expect(state).toEqual({
      bun: null,
      ingredients: [sauce],
    });
  });

  test('меняем порядок начинок', () => {
    const initialState: TConstructorState = {
      bun: null,
      ingredients: [ingredient, sauce],
    };

    const state = constructorSlice.reducer(
      initialState,
      moveIngredient({ from: 0, to: 1 })
    );

    expect(state).toEqual({
      bun: null,
      ingredients: [sauce, ingredient],
    });
  });

  test('очищаем конструктор', () => {
    const initialState: TConstructorState = {
      bun,
      ingredients: [ingredient, sauce],
    };

    const state = constructorSlice.reducer(initialState, clearConstructor());

    expect(state).toEqual({
      bun: null,
      ingredients: [],
    });
  });
});
