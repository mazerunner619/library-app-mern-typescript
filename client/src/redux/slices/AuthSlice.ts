import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LoginUserPayload, RegisterUserPayload, User } from "../../models/User";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

interface FetchUserPayload {
  userId: string;
  property: "loggedInUser" | "profileUser";
}

interface AuthSliceState {
  loggedInUser: User | undefined;
  profileUser: User | undefined;
  libraryCard: string;
  loading: boolean;
  error: boolean;
  registerSuccess: boolean;
  errorDetail: any;
}

const initialState: AuthSliceState = {
  loggedInUser: undefined,
  profileUser: undefined,
  libraryCard: "",
  loading: false,
  error: false,
  registerSuccess: false,
  errorDetail: undefined,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user: LoginUserPayload, thunkApi) => {
    try {
      const { data } = await axios.post(BASE_URL + "/api/auth/login", user);
      return data.user;
    } catch (error: any) {
      if (error.response?.data?.message)
        return thunkApi.rejectWithValue(error.response.data.message);
      else return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user: RegisterUserPayload, thunkApi) => {
    try {
      const { data } = await axios.post(BASE_URL + "/api/auth/register", user);
      return data.user;
    } catch (error: any) {
      if (error.response?.data?.message)
        return thunkApi.rejectWithValue(error.response.data.message);
      else return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetch",
  async (user: FetchUserPayload, thunkApi) => {
    try {
      const { data } = await axios.get(BASE_URL + `/api/user/${user.userId}`);
      return {
        user: data.user,
        property: user.property,
      };
    } catch (error: any) {
      if (error.response?.data?.message)
        return thunkApi.rejectWithValue(error.response.data.message);
      else return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/update",
  async (user: User, thunkApi) => {
    try {
      const { data } = await axios.put(BASE_URL + `/api/user`, user);
      return data.user;
    } catch (error: any) {
      if (error.response?.data?.message)
        return thunkApi.rejectWithValue(error.response.data.message);
      else return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getLibraryCard = createAsyncThunk(
  "auth/librarycard",
  async (userId: string, thunkApi) => {
    try {
      const { data } = await axios.post(BASE_URL + `/api/card`, {
        user: userId,
      });
      return data.libraryCard;
    } catch (error: any) {
      if (error.response?.data?.message)
        return thunkApi.rejectWithValue(error.response.data.message);
      else return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    resetRegisterSuccess: (state) => {
      return {
        ...state,
        registerSuccess: false,
        errorDetail: undefined,
        error: false,
      };
    },
    resetUser: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        [action.payload]: undefined,
        libraryCard: "",
      };
    },
  },
  extraReducers: (builder) => {
    // login pending logic..
    builder.addCase(loginUser.pending, (state, _) => {
      return {
        ...state,
        error: false,
        loading: true,
      };
    });

    //login resolved login..
    builder.addCase(loginUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        loggedInUser: action.payload,
      };
    });

    //login failed logic..
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        error: true,
        loading: false,
        errorDetail: action.payload,
      };
    });

    // register pending logic..
    builder.addCase(registerUser.pending, (state, _) => {
      return {
        ...state,
        error: false,
        loading: true,
      };
    });

    // register resolved login..
    builder.addCase(registerUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        registerSuccess: true,
        loggedInUser: action.payload,
      };
    });

    // register failed logic..
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        error: true,
        loading: false,
        errorDetail: action.payload,
      };
    });

    builder.addCase(fetchUser.pending, (state, _) => {
      return {
        ...state,
        loading: true,
        error: false,
      };
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        [action.payload.property]: action.payload.user,
      };
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: true,
        errorDetail: action.payload,
      };
    });

    builder.addCase(updateUser.pending, (state, _) => {
      return {
        ...state,
        loading: true,
        error: false,
      };
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        loggedInUser: action.payload,
        profileUser: action.payload,
      };
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: true,
        errorDetail: action.payload,
      };
    });

    builder.addCase(getLibraryCard.pending, (state, _) => {
      return {
        ...state,
        loading: true,
        error: false,
      };
    });

    builder.addCase(getLibraryCard.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        error: false,
        libraryCard: action.payload._id,
      };
    });
  },
});

export const { resetRegisterSuccess, resetUser } = AuthSlice.actions;

export default AuthSlice.reducer;
