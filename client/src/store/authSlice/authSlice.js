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

    try {
      const response = await login(userData.email, userData.password);

      console.log("Login response:", response);

      const user = response.userWithoutToken.user;

      dispatch(setUser(user));

      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during login.";

      if (error.response?.status !== 403) {
        dispatch(setError(errorMessage));
      } else {
        dispatch(clearError());
      }

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const getMeThunk = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      console.log("getMe request started");

      const response = await getMe();

      console.log("getMe response:", response);

      dispatch(setUser(response.user));

      console.log("setUser dispatched");

      return response.user;
    } catch (error) {
      const status = error.response?.status;

      console.log("getMe failed:", error.response?.data || error.message);

      /*
       * 401 means the user is not logged in.
       * This is normal for a new user.
       * Do not store it as a visible error.
       */
      if (status === 401) {
        dispatch(logout());
        return null;
      }

      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching user data.";

      dispatch(setError(errorMessage));

      return null;
    } finally {
      dispatch(setLoading(false));
      console.log("getMe loading finished");
    }
  };
};

export const { setLoading, setUser, logout, setError, clearError } =
  authSlice.actions;

export default authSlice.reducer;
