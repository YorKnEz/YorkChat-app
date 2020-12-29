import { createSlice } from "@reduxjs/toolkit";

const initialState = null

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn(state, action) {
      return action.payload
    },
    signOut(state, action) {
      return initialState;
    },
  }
})

export default userSlice.reducer