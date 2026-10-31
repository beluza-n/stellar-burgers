// для записи поменять update на true и запустить команду:
//npm run e2e -- record-order.pl.tsx --reporter=list
import { expect, test } from '@playwright/test';

test('записывает HAR пользователя и заказа', async ({ context, page }) => {
  await context.addCookies([
    {
      name: 'accessToken',
      value: 'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhY2ZjNWNkOWMxN2M0NmViNjc2MTk1ZSIsImlhdCI6MTc5MzQ3MjA1OCwiZXhwIjoxNzkzNDczMjU4fQ.fEgG1smQBIX-WO9XGOF-wX5JxkU0F6SvhUnHVoCow20',
      domain: 'localhost',
      path: '/',
    },
  ]);

  await page.addInitScript(() => {
    localStorage.setItem(
      'refreshToken',
      '9a95d8a2227b562f43a2ca1bcd7fb1447d9dd8173d04114a2f41c9cab2a672f01256434136059bd9'
    );
  });

  // Ингредиенты берём из уже созданного мока
  await page.routeFromHAR('./tests/hars/ingredients.har', {
    url: '**/api/ingredients',
    update: false,
  });

  // Эти два ответа записываем с настоящего тестового сервера
  await page.routeFromHAR('./tests/hars/user.har', {
    url: '**/api/auth/user',
    update: false,
  });

  await page.routeFromHAR('./tests/hars/order.har', {
    url: '**/api/orders',
    update: false,
  });

  await page.goto('/');

  // Ждём, пока приложение получит данные пользователя
  await expect(page.getByText('Настя')).toBeVisible();

  // Добавляем булку
  await page
    .getByTestId('add-ingredient-6acd6b8163765e371c0bd9eb')
    .click();

  // Добавляем начинку
  await page
    .getByTestId('add-ingredient-6acd6b8163765e9acf0bd9ef')
    .click();

  await page
    .getByRole('button', { name: 'Оформить заказ' })
    .click();

  // Ждём именно завершения запроса, а не появления прелоадера
  await expect(
    page.getByText('идентификатор заказа')
  ).toBeVisible();
});