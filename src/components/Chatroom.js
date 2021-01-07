import React, { useState, useEffect, useRef } from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios'

import Message from './Message'

import socket from '../features/socket'
import { chatroomsSlice } from '../features/chatroomsSlice'
import { messagesSlice } from '../features/messagesSlice'

import { Feather } from '@expo/vector-icons'

function Chatroom({ route }) {
  const [chatMessage, setChatMessage] = useState('') // input

  const inputRef = useRef(null) // for clearing the input

  const dispatch = useDispatch() // dispatcher

  const user = useSelector(state => state.user)
  
  const allMessages = useSelector(state => state.messages)
  const chatroomMessages = allMessages.find(e => e.chatroomId === route.params.id)
  const messages = chatroomMessages ? chatroomMessages.messages : []

  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await axios({
        method: 'GET',
        url: 'http://192.168.100.13:3000/chatrooms/' + route.params.id + '/messages',
        headers: {
          'Authorization': user.token
        }
      })

      dispatch(messagesSlice.actions.updateMessages({
        chatroomId: route.params.id,
        messages: result.data.messages
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const sendMessage = async () => {
    // create the message object
    const result = await axios({
      method: 'POST',
      url: 'http://192.168.100.13:3000/chatrooms/' + route.params.id + '/messages',
      headers: {
        'Authorization': user.token
      },
      data: {
        content: chatMessage
      }
    })

    dispatch(messagesSlice.actions.addMessage({
      chatroomId: route.params.id,
      message: result.data.message
    }))

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
        inverted={true}
      />
      <View style={styles.sendBar}>
        <TextInput
          style={styles.input}
          onChangeText={chatMessage => setChatMessage(chatMessage)}
          placeholder='Write a message'
          ref={inputRef}
        />
        <TouchableOpacity
          onPress={async() => await sendMessage()}
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