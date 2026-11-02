import { getIngredients, ingredientsSlice } from '../ingredientsSlice';

import type { TIngredient } from '@utils-types';

const ingredient: TIngredient = {
  _id: 'ingredient-id',
  name: 'Говяжий метеорит',
  type: 'main',
  proteins: 40,
  fat: 20,
  carbohydrates: 10,
  calories: 300,
  price: 3000,
  image: 'https://example.com/ingredient.png',
  image_large: 'https://example.com/ingredient-large.png',
  image_mobile: 'https://example.com/ingredient-mobile.png',
};

type TIngredientsState = ReturnType<typeof ingredientsSlice.reducer>;

describe('ingredientsSlice reducer', () => {
  test('возвращает начальное состояние для неизвестного экшена', () => {
    const state = ingredientsSlice.reducer(undefined, { type: 'UNKNOWN' });

    expect(state).toEqual({
      items: [],
      isLoading: false,
      error: null,
    });
  });

  test('обрабатывает getIngredients.pending', () => {
    const initialState: TIngredientsState = {
      items: [ingredient],
      isLoading: false,
      error: 'Предыдущая ошибка',
    };

    const state = ingredientsSlice.reducer(
      initialState,
      getIngredients.pending('request-id', undefined)
    );

    expect(state).toEqual({
      items: [ingredient],
      isLoading: true,
      error: null,
    });
  });

  test('обрабатывает getIngredients.rejected', () => {
    const initialState: TIngredientsState = {
      items: [],
      isLoading: true,
      error: null,
    };

    const state = ingredientsSlice.reducer(
      initialState,
      getIngredients.rejected(
        new Error('Не удалось загрузить ингредиенты'),
        'request-id',
        undefined
      )
    );

    expect(state).toEqual({
      items: [],
      isLoading: false,
      error: 'Не удалось загрузить ингредиенты',
    });
  });

  test('обрабатывает getIngredients.fulfilled', () => {
    const initialState: TIngredientsState = {
      items: [],
      isLoading: true,
      error: null,
    };

    const state = ingredientsSlice.reducer(
      initialState,
      getIngredients.fulfilled([ingredient], 'request-id', undefined)
    );

    expect(state).toEqual({
      items: [ingredient],
      isLoading: false,
      error: null,
    });
  });
});
