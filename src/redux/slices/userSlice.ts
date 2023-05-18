import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { IUser } from "../../types/types";
import { fetchUserLogin } from "./authSlice";
import { baseUrlAuth } from "../../utills/Url";

export const getMe = createAsyncThunk("auth/getMe ", async (_, thunkAPI) => {
  try {
    const response = await fetch(`${baseUrlAuth}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return await response.json();
  } catch (e) {
    return thunkAPI.rejectWithValue((e as Error).message);
  }
});

interface UserState {
  user: IUser | null;
  status: "loaded" | "loading" | "error";
  error: null | string;
}

const initialState: UserState = {
  user: null,
  status: "loading",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.status = "loading";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.status = "loaded";
        state.user = action.payload;
      })
      .addMatcher(isRejectedWithValue(fetchUserLogin), (state, action: any) => {
        state.status = "error";
        state.user = null;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
