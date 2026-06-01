import { createSlice } from "@reduxjs/toolkit";

const TOKEN_KEY = "app_token";
const USER_KEY  = "app_user";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token:       null,
    user:        null,
    isHydrated:  false,   // ← ye false hai jab tak localStorage read nahi hua
  },
  reducers: {
    // Login ke baad call karo — Redux + localStorage dono update
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user  = action.payload.user;
      if (typeof window !== "undefined") {
        localStorage.setItem(TOKEN_KEY, action.payload.token);
        localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user));
      }
    },

    // Logout — dono jagah se clear
    clearCredentials: (state) => {
      state.token = null;
      state.user  = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    },

    // App mount pe ek baar call karo — localStorage → Redux
    hydrateFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem(TOKEN_KEY);
        const user  = localStorage.getItem(USER_KEY);
        if (token) {
          state.token = token;
          state.user  = user ? JSON.parse(user) : null;
        }
      }
      state.isHydrated = true;  // ← ab consumers ko pata hai hydration ho gayi
    },
  },
});

export const { setCredentials, clearCredentials, hydrateFromStorage } = authSlice.actions;
export default authSlice.reducer;