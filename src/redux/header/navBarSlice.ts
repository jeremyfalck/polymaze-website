import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NavBarState {
  itemSelected: number;
}

const initialState: NavBarState = {
  itemSelected: 0,
};

export const navBarSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setItemSelected: (state, action: PayloadAction<number>) => {
      state.itemSelected = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setItemSelected } = navBarSlice.actions;

export default navBarSlice.reducer;
