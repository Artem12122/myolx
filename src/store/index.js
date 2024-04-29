import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice/authSlice';
import { api } from './api';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore, FLUSH, 
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER} from 'redux-persist';
import feedSlice from './feedSlice/feedSlice';
import messageSlice from './messageSlice/messageSlice';


const store = configureStore({
    reducer: { 
               [authSlice.name]:persistReducer({key: 'auth', storage}, authSlice.reducer),
               [feedSlice.name]:persistReducer({key: 'feed', storage}, feedSlice.reducer),
               [messageSlice.name]:persistReducer({key: 'message', storage}, messageSlice.reducer),
               [api.reducerPath]: api.reducer
             },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}}),
            api.middleware],

})

export const persistor = persistStore(store)
export default store
