import { createSlice } from "@reduxjs/toolkit";
import { login, getMe } from "../../api/auth/authApi.js";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
      state.loading = false;
      state.error = null;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const loginThunk = (userData) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const response = await login(userData.email, userData.password);

      const user =
        response.userWithoutToken?.user ||
        response.userWithoutToken ||
        response.user;

      dispatch(setUser(user));

      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during login.";

      dispatch(setError(errorMessage));

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const getMeThunk = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    // Clear any old error before checking authentication.
    dispatch(clearError());

    try {
      const response = await getMe();

      dispatch(setUser(response.user));

      return response.user;
    } catch {
      dispatch(logout());

      return null;
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const { setLoading, setUser, logout, setError, clearError } =
  authSlice.actions;

export default authSlice.reducer;
