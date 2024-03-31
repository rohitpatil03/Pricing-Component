
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './reducers/themeSlice';

const store = configureStore({
  reducer: {themeReducer}
});

export default store;
