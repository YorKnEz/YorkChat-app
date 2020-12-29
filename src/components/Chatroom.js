import React, { useState, useEffect, useRef } from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { Feather } from '@expo/vector-icons'

import socket from '../features/socket'
import { useDispatch, useSelector } from 'react-redux';
import { chatroomsSlice } from '../features/chatroomsSlice';
import Message from './Message'

function Chatroom({ route }) {
  const [chatMessage, setChatMessage] = useState('') // input

  const inputRef = useRef(null) // for clearing the input

  const dispatch = useDispatch() // dispatcher

  const user = useSelector(state => state.user)
  const chatrooms = useSelector(state => state.chatrooms)
  const chatroom = chatrooms.find(chatroom => chatroom.id == route.params.id)
  const messages = chatroom ? chatroom.messages : null

  const sendMessage = () => {
    // get the date of the message
    const d = new Date()
    const m = d.getMinutes()
    const h = d.getHours()

    // create the message object
    const message = {
      content: chatMessage,
      timestamp: h + ':' + m,
      sender: user,
      id: messages.length + 1
    }

    // add the message to the user's chatroom
    dispatch(chatroomsSlice.actions.sendMessage({ chatroomID: chatroom.id, message: message }))
    
    console.log(chatroom.users[1].name)

    // send the message to the other user
    socket.emit('send message', {
      otherUserID: chatroom.users[1].id,
      chatroomID: chatroom.id,
      message: message
    })
    console.log('message sent')

    // clear the state used to store the message and the message bar
    setChatMessage('')
    inputRef.current.clear()
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={messages}
        renderItem={item => (
          <Message user={user} message={item.item} />
        )}
        keyExtractor={item => String(item.id)}
      />
      <View style={styles.sendBar}>
        <TextInput
          style={styles.input}
          onChangeText={chatMessage => setChatMessage(chatMessage)}
          placeholder='Write a message'
          ref={inputRef}
        />
        <TouchableOpacity
          onPress={sendMessage}
        >
          <Feather name="send" size={24} color="lightgray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '90%',
  },
  sendBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingLeft: 20,
    paddingRight: 10,
  },
});
  
export default Chatroom