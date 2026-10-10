import { useSelector } from '@services/store';
import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';

import { getConstructorSelector } from '../../services/slices/constructorSlice';

import type { TConstructorIngredient, TOrder } from '@utils-types';

export const BurgerConstructor = (): React.JSX.Element | null => {
  const constructorItems = useSelector(getConstructorSelector);
  const orderRequest = false;
  const orderModalData: TOrder | null = null;

  const onOrderClick = (): void => {
    if (!constructorItems.bun || orderRequest) return;
    // TODO: Оформить заказ
  };

  const closeOrderModal = (): void => {
    // TODO: Закрыть модальное окно и сбросить заказ
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
