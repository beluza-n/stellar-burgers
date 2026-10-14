import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi,
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

import type { TLoginData, TRegisterData } from '@api';
import type { TUser } from '@utils-types';

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TUser | null;
  loginUserError: string | null;
  loginUserRequest: boolean;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false,
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: TRegisterData) => {
    const data = await registerUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const getUser = createAsyncThunk('user/getUser', async () => getUserApi());

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<TRegisterData>) => updateUserApi(userData)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  selectors: {
    getUserSelector: (state) => state.data,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getIsAuthenticated: (state) => state.isAuthenticated,
    getLoginUserError: (state) => state.loginUserError,
    getLoginUserRequest: (state) => state.loginUserRequest,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message ?? null;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message ?? null;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.data = null;
        state.isAuthenticated = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
      });
  },
});

export const { authChecked, userLogout } = userSlice.actions;

export const logoutUser = createAsyncThunk('user/logoutUser', (_, { dispatch }) => {
  logoutApi()
    .then(() => {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      dispatch(userLogout());
    })
    .catch(() => {
      console.log('Ошибка выполнения выхода');
    });
});

export const checkUserAuth = createAsyncThunk('user/checkUser', (_, { dispatch }) => {
  if (getCookie('accessToken')) {
    void dispatch(getUser()).finally(() => {
      dispatch(authChecked());
    });
  } else {
    dispatch(authChecked());
  }
});

export const {
  getUserSelector,
  getIsAuthChecked,
  getIsAuthenticated,
  getLoginUserError,
  getLoginUserRequest,
} = userSlice.selectors;
