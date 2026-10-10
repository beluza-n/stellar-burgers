import { combineSlices } from '@reduxjs/toolkit';

import { feedSlice } from './slices/feedSlice';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { orderSlice } from './slices/orderSlice';

export const rootReducer = combineSlices(ingredientsSlice, feedSlice, orderSlice);
