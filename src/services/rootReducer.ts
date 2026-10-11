import { combineSlices } from '@reduxjs/toolkit';

import { constructorSlice } from './slices/constructorSlice';
import { feedSlice } from './slices/feedSlice';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { orderSlice } from './slices/orderSlice';
import { userSlice } from './slices/userSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  feedSlice,
  orderSlice,
  constructorSlice,
  userSlice
);
