import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { USE_MOCKS, getMockOrderByNumber } from '../../mocks/data';

import type { TOrder } from '@utils-types';

type TOrderState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  order: null,
  isLoading: false,
  error: null,
};

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (number: number) => {
    if (USE_MOCKS) {
      return getMockOrderByNumber(number);
    }
    const data = await getOrderByNumberApi(number);
    return data.orders[0];
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.error = null;
    },
  },
  selectors: {
    getOrderSelector: (state) => state.order,
    getOrderLoading: (state) => state.isLoading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.order = null;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.order = null;
        state.error = action.error.message ?? null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export const { getOrderSelector, getOrderLoading } = orderSlice.selectors;
