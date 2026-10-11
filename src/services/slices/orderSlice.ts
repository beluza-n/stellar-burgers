import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TOrder } from '@utils-types';

type TOrderState = {
  orders: TOrder[];
  order: TOrder | null;
  orderModalData: TOrder | null;
  orderRequest: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orders: [],
  order: null,
  orderModalData: null,
  orderRequest: false,
  isLoading: false,
  error: null,
};

export const getOrders = createAsyncThunk('order/getOrders', async () => getOrdersApi());

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data.orders[0];
  }
);

export const orderBurger = createAsyncThunk(
  'order/create',
  async (ingredients: string[]) => orderBurgerApi(ingredients)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.error = null;
    },
    clearOrderModal: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    },
  },
  selectors: {
    getOrdersSelector: (state) => state.orders,
    getOrderSelector: (state) => state.order,
    getOrderLoading: (state) => state.isLoading,
    getOrderModalData: (state) => state.orderModalData,
    getOrderRequest: (state) => state.orderRequest,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
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
      })
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      });
  },
});

export const { clearOrder, clearOrderModal } = orderSlice.actions;
export const {
  getOrdersSelector,
  getOrderSelector,
  getOrderLoading,
  getOrderModalData,
  getOrderRequest,
} = orderSlice.selectors;
