import { createSlice } from "@reduxjs/toolkit";
import produce from "immer"

const initialState = []

export const chatroomsSlice = createSlice({
  name: 'chatrooms',
  initialState,
  reducers: {
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
    },
    sendMessage(state, action) {
      // the action.payload will be the chatroom id and the message itself
      const chatrooms = state

      const chatroom = chatrooms.find(e => e.id == action.payload.chatroomID)
      const message = chatroom.messages.find(msg => msg.id == action.payload.message.id)

      if (!message) {
        const chatroomIndex = chatrooms.findIndex(chatroom => chatroom.id == action.payload.chatroomID)
        
        const newMessages = produce(state[chatroomIndex].messages, draft => {
          draft.push(action.payload.message)
        })

        state[chatroomIndex].messages = newMessages
      }
      else return state
    }
  }
})

export default chatroomsSlice.reducer