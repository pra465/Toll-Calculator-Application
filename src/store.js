import { configureStore } from '@reduxjs/toolkit';
import overpassDataSlice from './features/overpassDataSlice';
const store = configureStore({
  reducer: {
    overpassData: overpassDataSlice,
  },
});

export default store;
