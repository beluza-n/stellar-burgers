// для записи поменять update на true и запустить команду:
// npm run e2e -- record.pl.tsx
import { test, expect } from '@playwright/test';

test('должен записать HAR-файл', async ({ page }) => {
  // Начинаем запись HAR
  await page.routeFromHAR('./tests/hars/ingredients.har', {
    url: '**/api/ingredients',
    update: false, // true - Режим записи
  });

  await page.goto('/');

  // Ждём загрузки данных
  await expect(page.getByText('Краторная булка N-200i')).toBeVisible();

  // HAR-файл будет сохранён автоматически
});