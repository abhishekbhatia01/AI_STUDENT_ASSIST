import { createSlice } from "@reduxjs/toolkit";
import { login, getMe } from "../../api/auth/authApi.js";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
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
      state.isAuthenticated = true;
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
      dispatch(setUser(response.userWithoutToken));
      return response;
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "An error occurred during login.",
        ),
      );

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
      const response = await getMe();
      dispatch(setUser(response.user));
      return response;
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "An error occurred while fetching user data.",
        ),
      );

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const { 
    setLoading, 
    setUser,  
    logout, 
    setError, 
    clearError 
} = authSlice.actions;

export default authSlice.reducer;
