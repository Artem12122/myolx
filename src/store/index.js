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


const store = configureStore({
    reducer: { 
               [authSlice.name]:persistReducer({key: 'auth', storage}, authSlice.reducer), 
               [api.reducerPath]: api.reducer
             },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}}),
            api.middleware],

})

export const persistor = persistStore(store)

console.log(api)
console.log(store)

export default store


// {
//     "persist:auth": "{\"token\":\"\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2NjE0N2E0NTRmYTM0YjFiMDJjZDEyYWUiLCJsb2dpbiI6ImFydGVtVHN0IiwiYWNsIjpbIjY2MTQ3YTQ1NGZhMzRiMWIwMmNkMTJhZSIsInVzZXIiXX0sImlhdCI6MTcxMjg1NDEwNX0.NVd8mq4HbEbwqaLrYw6EYeiCl0BbHvbBbrialQzVwQ4\\\"\",\"payload\":\"{\\\"sub\\\":{\\\"id\\\":\\\"66147a454fa34b1b02cd12ae\\\",\\\"login\\\":\\\"artemTst\\\",\\\"acl\\\":[\\\"66147a454fa34b1b02cd12ae\\\",\\\"user\\\"]},\\\"iat\\\":1712854105}\",\"userInfo\":\"{\\\"_id\\\":\\\"66147a454fa34b1b02cd12ae\\\",\\\"login\\\":\\\"artemTst\\\",\\\"nick\\\":null,\\\"avatar\\\":null}\",\"_persist\":\"{\\\"version\\\":-1,\\\"rehydrated\\\":true}\"}"
// }