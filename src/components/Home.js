import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import axios from 'axios'

import ChatroomItem from './ChatroomItem'

import socket from '../features/socket'
import { userSlice } from '../features/userSlice'
import { chatroomsSlice } from '../features/chatroomsSlice'

import { FontAwesome } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

function Home({ navigation, route }) {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const chatrooms = useSelector(state => state.chatrooms)

  useEffect(() => {
    // event for catching a message that was sent to you
    socket.on('new message', data => {
      console.log('new message: ' + data.message.content)
      // when we recieve a message we want to make sure that there is a chatroom for both users
      let chatroom = chatrooms.find(chatroom => {
        chatroom.users.find(e => e.id == data.user.id)
      })

      console.log('test...')

      if (!chatroom) {
        const otherUser = data.user

        chatroom = {
          users: [user, otherUser],
          messages: [data.message],
          name: otherUser.name,
          id: data.chatroomID,
          picture: otherUser.picture,
        }

        dispatch(chatroomsSlice.actions.newChat(chatroom))
      }

      dispatch(chatroomsSlice.actions.sendMessage({ chatroomID: chatroom.id, message: data.message }))
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await axios({
        method: 'GET',
        url: 'http://192.168.100.13:3000/chatrooms',
        headers: {
          'Authorization': user.token
        }
      })

      dispatch(chatroomsSlice.actions.updateChats(result.data.chatrooms))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => {
          socket.emit('users request', { socket: socket.id, user: user })
          navigation.navigate('Search')
        }}
      >
        <FontAwesome name="search" size={14} color="black" />
        <Text style={styles.title}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={chatrooms}
        renderItem={item => (
          <ChatroomItem
            chatroom={item.item}
            onPress={() => {
              navigation.navigate('Chat', { id: item.item.id })
            }}
          />
        )}
        keyExtractor={item => String(item.id)}
        ListEmptyComponent={(
          <View style={styles.containerEmpty}>
            <Entypo name="emoji-sad" size={24} color="lightgray" />
            <Text style={styles.titleEmpty}>No conversations available.</Text>
          </View>
        )}
        style={{ width: '100%' }}
      />
      <Button
        title="clear storage"
        onPress={() => AsyncStorage.clear()}
      />
      <Button
        title="logout"
        onPress={() => {
          dispatch(userSlice.actions.signOut())
          socket.emit('log out')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: 10,
    paddingLeft: 20,
    borderRadius: 100,
    width: '90%',
    margin: 5,
  },
  title: {
    marginLeft: 10,
  },
  containerEmpty: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleEmpty: {
    fontSize: 18,
    color: 'lightgray',
    marginLeft: 10,
  },
})

export default Home