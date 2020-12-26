import { combineReducers, configureStore  } from '@reduxjs/toolkit'

import userSliceReducer from './userSlice'

const rootReducer = combineReducers({
   user: userSliceReducer,
})

const store = configureStore({
  reducer: rootReducer
})

export const dispatch = store.dispatch()

export default store