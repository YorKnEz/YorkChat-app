import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { chatroomsSlice } from '../features/chatroomsSlice'

import { MaterialIcons } from '@expo/vector-icons'

function ChatsTitle({ id }) {
  const navigation = useNavigation()

  const dispatch = useDispatch()

  const chatrooms = useSelector(state => state.chatrooms)
  const chatroom = chatrooms.find(chatroom => chatroom.id == id)

  const deleteChat = () => {
    navigation.popToTop() // go home
    
    dispatch(chatroomsSlice.actions.deleteChat(id))
  }

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Image style={styles.image} source={{ uri: chatroom ? chatroom.picture : null }} />
        <Text style={styles.title}>{chatroom ? chatroom.name : ''}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteChat()}>
      <MaterialIcons name="delete" size={28} color="red" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    alignItems: 'center',
  },
  subcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '93%',
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 100,
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  }
})

export default ChatsTitle