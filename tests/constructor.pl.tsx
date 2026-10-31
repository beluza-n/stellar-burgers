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

test.describe('Модальное окно ингредиента', () => {
  const ingredientName = 'Краторная булка N-200i';

  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false,
    });

    await page.goto('/');
    await page.getByText(ingredientName).click();
  });

  test('открывается по клику на ингредиент', async ({ page }) => {
    await expect(page.getByTestId('modal')).toBeVisible();
    await expect(page.getByTestId('modal')).toContainText(ingredientName);
  });

  test('закрывается по клику на крестик', async ({ page }) => {
    await page.getByRole('button', { name: 'Закрыть' }).click();

    await expect(page.getByTestId('modal')).not.toBeVisible();
  });

  test('закрывается по клику на ovarlay', async ({ page }) => {
    await page.getByTestId('modal-overlay').click({ position: { x: 10, y: 10 } });

    await expect(page.getByTestId('modal')).not.toBeVisible();
  });
});
