import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://679b661733d316846323b711.mockapi.io/users";

// 🚀 **Emailni tekshirish**
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      const user = response.data.find((u) => u.email === email);

      if (!user) {
        return rejectWithValue("Email not found!");
      }

      return email; // ✅ Email mavjud bo'lsa, uni qaytaramiz
    } catch (error) {
      return rejectWithValue("Email verification failed.");
    }
  }
);

// 🚀 **Parolni yangilash**
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      const user = response.data.find((u) => u.email === email);

      if (!user) {
        return rejectWithValue("User not found!");
      }

      await axios.put(`${API_URL}/${user.id}`, { password: newPassword });

      return "Password updated successfully!";
    } catch (error) {
      return rejectWithValue("Failed to reset password.");
    }
  }
);

// 🚀 **Login qilish**
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      const user = response.data.find((u) => u.email === email);

      if (!user) {
        return rejectWithValue("Email not found!");
      }

      if (user.password !== password) {
        return rejectWithValue("Incorrect password! Try again.");
      }

      localStorage.setItem("userData", JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue("Login failed. Please try again.");
    }
  }
);

// 🚀 **Ro‘yxatdan o‘tish**
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      const existingUser = response.data.find((u) => u.email === email);

      if (existingUser) {
        return rejectWithValue("User with this email already exists.");
      }

      if (password !== confirmPassword) {
        return rejectWithValue("Passwords do not match.");
      }

      const newUser = { name, email, password };
      const createdUser = await axios.post(API_URL, newUser);
      return createdUser.data;
    } catch (error) {
      return rejectWithValue("Registration failed. Please try again.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("userData")) || null,
    loading: false,
    error: null,
    message: null,
    emailVerified: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmail.fulfilled, (state) => {
        state.emailVerified = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.emailVerified = false; // ✅ Email verification statusini tiklash
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.message = "User registered successfully!";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
