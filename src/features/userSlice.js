import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    signIn(state, action) {
      return action.payload
    },
    signOut(state, action) {
      return null
    }
  }
})

export const { signIn, signOut } = userSlice.actions

export default userSlice.reducer