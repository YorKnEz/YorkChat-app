import { combineReducers, configureStore,getDefaultMiddleware } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';


import userSliceReducer from './userSlice'
import chatroomsSliceReducer from './chatroomsSlice'

const rootReducer = combineReducers({
   user: userSliceReducer,
   chatrooms: chatroomsSliceReducer
})

const persistConfig = {
  key: 'root',
  version: 0,
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  }),
})

export const persistor = persistStore(store);

export default store
