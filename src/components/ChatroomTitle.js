import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation, useTheme } from '@react-navigation/native'

import { chatroomsSlice } from '../features/chatroomsSlice'

import { Entypo } from '@expo/vector-icons'

function ChatsTitle({ id }) {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const dispatch = useDispatch()

  const chatrooms = useSelector(state => state.chatrooms)
  const chatroom = chatrooms.find(chatroom => chatroom.id == id)

  // const deleteChat = () => {
  //   navigation.popToTop() // go home
    
  //   dispatch(chatroomsSlice.actions.deleteChat(id))
  // }

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Image style={styles.image} source={{ uri: chatroom ? chatroom.picture : null }} />
        <Text style={[styles.title, { color: colors.text }]}>{chatroom ? chatroom.name : ''}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('ChatroomOptions', {
          chatroom
        })}
      >
      <Entypo name="dots-three-vertical" size={18} color={colors.primary} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  subcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 100,
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  }
})

export default ChatsTitle