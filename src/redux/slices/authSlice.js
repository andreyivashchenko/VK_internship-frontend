import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    return await axios
      .post("/auth/registration", params)
      .then((res) => {
        return res.data;
      })
      .catch((rej) => {
        throw new Error(rej.response.data.message);
      });
  }
);
export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (params) => {
    return await axios
      .post("/auth/login", params)
      .then((res) => {
        return res.data;
      })
      .catch((rej) => {
        throw new Error(rej.response.data.message);
      });
  }
);
export const Authorized = createAsyncThunk("auth/Authorized ", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = "loading";
      window.localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(Authorized.pending, (state) => {
        state.status = "loading";
      })
      .addCase(Authorized.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(Authorized.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = "error";
        state.data = null;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectIsAuth = (state) => Boolean(state.auth.data);

export default authSlice.reducer;
