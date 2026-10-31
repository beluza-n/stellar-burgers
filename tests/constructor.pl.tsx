import { expect, test } from '@playwright/test';

test.describe('Добавление ингредиентов в конструктор', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false,
    });

    await page.goto('/');
  });

  test('добавляет начинку из списка в конструктор', async ({ page }) => {
    const ingredientId = '6acd6b8163765e9acf0bd9ef';
    const ingredientName = 'Говяжий метеорит (отбивная)';

    await page.getByTestId(`add-ingredient-${ingredientId}`).click();

    await expect(
      page.getByTestId(`constructor-ingredient-${ingredientId}`)
    ).toContainText(ingredientName);
  });
});
