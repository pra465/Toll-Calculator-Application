import { configureStore } from '@reduxjs/toolkit';
import overpassDataSlice from './features/overpassDataSlice';
import locationCordinatesSlice from './features/locationCordinatesSlice';
const store = configureStore({
  reducer: {
    overpassData: overpassDataSlice,
    cordinates: locationCordinatesSlice,
  },
});

export default store;
