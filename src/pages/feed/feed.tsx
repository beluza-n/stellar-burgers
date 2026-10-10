import { useDispatch, useSelector } from '@services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useEffect } from 'react';

import { getFeeds, getFeedOrders } from '../../services/slices/feedSlice';

export const Feed = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const orders = useSelector(getFeedOrders);

  useEffect(() => {
    void dispatch(getFeeds());
  }, [dispatch]);

  const handleGetFeeds = (): void => {
    void dispatch(getFeeds());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
