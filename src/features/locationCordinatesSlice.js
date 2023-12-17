import { createSlice } from '@reduxjs/toolkit';

const locationCordinatesSlice = createSlice({
  name: 'cordinates',
  initialState: {
    userCurrentLocationCordinates: [null, null],
    destinantionCordinates: [null, null],
  },
  reducers: {
    addUserCurrentLocationCordinates: (state, action) => {
      state.userCurrentLocationCordinates = action.payload;
    },

    addDestinationCordinates: (state, action) => {
      state.destinantionCordinates = action.payload;
    },
  },
});

export const { addUserCurrentLocationCordinates, addDestinationCordinates } =
  locationCordinatesSlice.actions;
export default locationCordinatesSlice.reducer;
