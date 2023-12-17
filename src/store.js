import { configureStore } from '@reduxjs/toolkit';
import overpassDataSlice from './features/overpassDataSlice';
import locationCordinatesSlice from './features/locationCordinatesSlice';
import tollCostSlice from './features/tollCostSlice';
const store = configureStore({
  reducer: {
    overpassData: overpassDataSlice,
    cordinates: locationCordinatesSlice,
    tollCost: tollCostSlice,
  },
});

export default store;
