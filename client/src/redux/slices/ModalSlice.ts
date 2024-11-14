import { createSlice } from "@reduxjs/toolkit";

interface ModalSliceState {
  displayLogin: boolean;
  displayLibraryCard: boolean;
  displayLoad: boolean;
}

const initialState: ModalSliceState = {
  displayLogin: false,
  displayLibraryCard: false,
  displayLoad: false,
};

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setDisplayLogin: (state, action) => {
      return {
        ...state,
        displayLogin: action.payload,
      };
    },
    setDisplayLibraryCard: (state, action) => {
      return {
        ...state,
        displayLibraryCard: action.payload,
      };
    },
    setDisplayLoad: (state, action) => {
      return {
        ...state,
        displayLoad: action.payload,
      };
    },
  },
});

export const { setDisplayLibraryCard, setDisplayLoad, setDisplayLogin } =
  ModalSlice.actions;
export default ModalSlice.reducer;
