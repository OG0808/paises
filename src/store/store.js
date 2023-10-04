import { configureStore } from '@reduxjs/toolkit'
import dataCountry from './slices/filterSlice';
import  darkModeReducer   from "./slices/darkMode";

const store = configureStore({
  reducer: {
    dataCountry,
    darkMode: darkModeReducer
  },
});


export default store;