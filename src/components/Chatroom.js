import React, { useState, useEffect, useRef } from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@react-navigation/native'

import axios from 'axios'

import Message from './Message'

import { messagesSlice } from '../features/messagesSlice'

import * as ImagePicker from 'expo-image-picker'
import { Feather } from '@expo/vector-icons'

function Chatroom({ route }) {
  const { colors } = useTheme()

  const [chatMessage, setChatMessage] = useState('') // input

  const inputRef = useRef(null) // for clearing the input

  const dispatch = useDispatch() // dispatcher

  const user = useSelector(state => state.user)
  
  const allMessages = useSelector(state => state.messages)
  const chatroomMessages = allMessages.find(e => e.chatroomId === route.params.id)
  const messages = chatroomMessages ? chatroomMessages.messages : []

  useEffect(() => {
    const fetchMessages = async () => {
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
    }
    fetchMessages()
  }, [])

  const sendImage = async () => {
    // ask for permission to access gallery
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!')
      return
    }

    // if the permission was given open gallery
    const pickerResult = await ImagePicker.launchImageLibraryAsync()

    // create a form for the image
    const formData = new FormData()
    formData.append('image', {
      uri: pickerResult.uri,
      type: 'image/png',
      name: pickerResult.uri,
    })

    // create the message object
    const result = await axios({
      method: 'POST',
      url: 'http://192.168.100.13:3000/chatrooms/' + route.params.id + '/messages/image',
      headers: {
        'Authorization': user.token
      },
      data: formData
    })

    dispatch(messagesSlice.actions.addMessage({
      chatroomId: route.params.id,
      message: result.data.message
    }))
  }

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
        <TouchableOpacity
          onPress={async () => await sendImage()}
          style={styles.sendIcon}
        >
          <Feather name="image" size={20} color={colors.primary} />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { color: colors.text, backgroundColor: colors.card }]}
          onChangeText={chatMessage => setChatMessage(chatMessage)}
          placeholder='Write a message'
          placeholderTextColor={colors.subtext}
          ref={inputRef}
          maxLength={255}
        />
        <TouchableOpacity
          onPress={async () => await sendMessage()}
          style={styles.sendIcon}
        >
          <Feather name="send" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    height: 40,
    width: '80%',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 100,
  },
});
  
export default Chatroom