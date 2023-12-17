import { createSlice } from '@reduxjs/toolkit';

const overpassDataSlice = createSlice({
  name: 'overpassData',
  initialState: {
    locationData: null,
  },
  reducers: {
    searchLocation: (state, action) => {
      state.locationData = action.payload;
    },
  },
});

export const { searchLocation } = overpassDataSlice.actions;

export default overpassDataSlice.reducer;
