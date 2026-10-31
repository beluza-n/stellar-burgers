import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { useEffect } from 'react';

import { useDispatch, useSelector } from '@services/store';

import { getOrders, getOrdersSelector } from '../../services/slices/orderSlice';

export const ProfileOrders = (): React.JSX.Element => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders = useSelector(getOrdersSelector);

  useEffect(() => {
    void dispatch(getOrders());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
