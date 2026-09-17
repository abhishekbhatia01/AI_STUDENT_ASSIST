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
      const response = await login(
        userData.email,
        userData.password
      );

      console.log("Login response:", response);

      const user = response.userWithoutToken.user;

      dispatch(setUser(user));

      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during login.";

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
      console.log("getMe request started");

      const response = await getMe();

      console.log("getMe response:", response);

      dispatch(setUser(response.user));

      console.log("setUser dispatched");

      return response.user;
    } catch (error) {
      const status = error.response?.status;

      console.log(
        "getMe failed:",
        error.response?.data || error.message
      );

      /*
       * User is not logged in.
       * This is normal when opening the login page.
       */
      if (status === 401 || status === 403) {
        dispatch(logout());
        return null;
      }

      /*
       * If getMe fails for another reason, do not show
       * the error on the login form.
       *
       * The user can still attempt to log in.
       */
      dispatch(logout());

      return null;
    } finally {
      dispatch(setLoading(false));
      console.log("getMe loading finished");
    }
  };
};

export const {
  setLoading,
  setUser,
  logout,
  setError,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;