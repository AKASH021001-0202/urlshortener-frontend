// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';




const store = configureStore({
  reducer: {
    auth: authReducer,
  
    user: userReducer,

  },
});

export default store; // Exporting the store correctly
