import { createSlice } from "@reduxjs/toolkit"
import produce from "immer"

const initialState = []

export const chatroomsSlice = createSlice({
  name: 'chatrooms',
  initialState,
  reducers: {
    updateChats(state, action) {
      // the action.payload will be the array of chatrooms
      return action.payload
    },
    newChat(state, action) {
      // the action.payload will be a new chatroom

      //check if the chatroom already exists
      const chatrooms = state
      const chatroom = chatrooms.find(e => e.id == action.payload.id)

      if (!chatroom) {
        const newState = produce(state, draft => {
          draft.unshift(action.payload)
        })

        return newState
      }
      else return state
    },
    deleteChat(state, action) {
      // the action.payload will be the id of the chatroom to delete
      const newState = produce(state, draft => {
        const index = draft.findIndex(chatroom => chatroom.id === action.payload)
        if (index !== -1) draft.splice(index, 1)
      })

      return newState
    }
  }
})

export default chatroomsSlice.reducer