import { createSlice } from "@reduxjs/toolkit"
import produce from "immer"

const initialState = []

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action) {
      // action.payload will contain chatroomId and the message

      // find the messages by chatroomId
      const allMessages = state
      const messagesIndex = allMessages.findIndex(e => e.chatroomId === action.payload.chatroomId)

      // add the message
      if (messagesIndex != -1) {
        state[messagesIndex].messages = [action.payload.message, ...state[messagesIndex].messages]
      }
    },
    updateMessages(state, action) {
      // action.payload will contain chatroomId and the messages

      // find the messages by chatroomId
      const allMessages = state
      const messagesIndex = allMessages.findIndex(e => e.chatroomId === action.payload.chatroomId)
      
      // update the messages
      if (messagesIndex != -1) {
        state[messagesIndex].messages = action.payload.messages
      }
      else {
        const newState = produce(state, draft => {
          draft.push(action.payload)
        })

        return newState
      }
    }
  }
})

export default messagesSlice.reducer