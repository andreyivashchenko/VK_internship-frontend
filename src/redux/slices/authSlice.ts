import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ILogin, IRegisteration, tokenType } from "../../types/types";
import { baseUrlAuth } from "../../utills/Url";

export const fetchRegistration = createAsyncThunk<tokenType, IRegisteration>(
  "auth/fetchRegistration",
  async (arg, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrlAuth}/registration`, {
        method: "POST",
        body: JSON.stringify(arg),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const fetchUserLogin = createAsyncThunk<tokenType, ILogin>(
  "auth/fetchUserData",
  async (arg, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrlAuth}/login`, {
        method: "POST",
        body: JSON.stringify(arg),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export interface LoginRes {
  token: tokenType;
}

export interface AuthState {
  data: null | tokenType;
  status: "loaded" | "loading" | "error";
  error: null | string;
}

const initialState: AuthState = {
  data: null,
  status: "loading",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutAuth: (state) => {
      state.data = null;
      state.status = "loading";
      window.localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogin.pending, (state) => {
        state.status = "loading";
        state.data = null;
        state.error = null;
      })
      .addCase(
        fetchUserLogin.fulfilled,
        (state, action: PayloadAction<tokenType>) => {
          state.status = "loaded";
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchRegistration.pending, (state) => {
        state.status = "loading";
        state.data = null;
        state.error = null;
      })
      .addCase(
        fetchRegistration.fulfilled,
        (state, action: PayloadAction<tokenType>) => {
          state.status = "loaded";
          state.data = action.payload;
          state.error = null;
        }
      )
      .addMatcher(
        isRejectedWithValue(fetchUserLogin, fetchRegistration),
        (state, action: any) => {
          state.status = "error";
          state.data = null;
          state.error = action.payload ?? "Unknown error";
        }
      );
  },
});

export const { logoutAuth } = authSlice.actions;
export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);

export default authSlice.reducer;
