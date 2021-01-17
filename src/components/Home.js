import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@react-navigation/native'

import io from 'socket.io-client'
import axios from 'axios'

import ChatroomItem from './ChatroomItem'

import { userSlice } from '../features/userSlice'
import { chatroomsSlice } from '../features/chatroomsSlice'
import { messagesSlice } from '../features/messagesSlice'

import { FontAwesome, Entypo } from '@expo/vector-icons'

function Home({ navigation }) {
  const { colors } = useTheme()
  
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const chatrooms = useSelector(state => state.chatrooms)

  useEffect(() => {
    const socket = io.connect("http://192.168.100.13:3000", { query: `token=${user.token}` })

    // event for catching a message that was sent to you
    socket.on('NEW_MESSAGE', data => {
      if (data.chatroom) {
        dispatch(chatroomsSlice.actions.newChat(data.chatroom))
      }

      dispatch(messagesSlice.actions.addMessage({
        chatroomId: data.message.ChatroomId,
        message: data.message,
        lastMessage: data.lastMessage
      }))
    })

    return () => {
      socket.disconnect(true)
    }
  }, [])

  useEffect(() => {
    const fetchChatrooms = async () => {
      const result = await axios({
        method: 'GET',
        url: 'http://192.168.100.13:3000/chatrooms',
        headers: {
          'Authorization': user.token
        }
      })

      dispatch(chatroomsSlice.actions.updateChats(result.data.chatrooms))
    }
    fetchChatrooms()
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.searchBar, { backgroundColor: colors.card }]}
        onPress={() => {
          navigation.navigate('Search')
        }}
      >
        <FontAwesome name="search" size={14} color={colors.subtext} />
        <Text style={[styles.searchBarTitle, { color: colors.subtext }]}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={chatrooms}
        renderItem={({ item }) => (
          <ChatroomItem
            chatroom={item}
            onPress={() => {
              navigation.navigate('Chat', { id: item.id })
            }}
          />
        )}
        keyExtractor={item => String(item.id)}
        ListEmptyComponent={(
          <View style={styles.containerEmpty}>
            <Entypo name="emoji-sad" size={24} color={colors.subtext} />
            <Text style={[styles.titleEmpty, { color: colors.subtext }]}>No conversations available.</Text>
          </View>
        )}
        style={{ width: '100%' }}
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
    width: '90%',
    height: 40,
    borderRadius: 100,
    margin: 10,
    padding: 10,
    paddingLeft: 20,
  },
  searchBarTitle: {
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
    marginLeft: 10,
  },
})

export default Home