import { createSlice } from '@reduxjs/toolkit';

const tollCostSlice = createSlice({
  name: 'tollCost',
  initialState: {
    cost: null,
  },
  reducers: {
    addTollCost: (state, action) => {
      state.cost = action.payload;
    },
  },
});

export const { addTollCost } = tollCostSlice.actions;

export default tollCostSlice.reducer;
