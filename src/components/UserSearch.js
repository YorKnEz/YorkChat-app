import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, View, FlatList, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@react-navigation/native'

import axios from 'axios'

import UserItem from './UserItem'

import { chatroomsSlice } from '../features/chatroomsSlice'

import { FontAwesome } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

export default function UserSearch({ navigation }) {
  const { colors } = useTheme()

  const dispatch = useDispatch()

  const [users, setUsers] = useState([]) // user list
  const [usersFilter, setUsersFilter] = useState([]) // users list for flatlist

  const user = useSelector(state => state.user)
  const chatrooms = useSelector(state => state.chatrooms)

  useEffect(() => {
    async function fetchUsers() {
      let tempUsers = await axios({
        method: 'GET',
        url: 'http://192.168.100.13:3000/users',
        headers: {
          'Authorization': user.token
        }
      })
      tempUsers = tempUsers.data.users

      tempUsers = tempUsers.filter(currUser => currUser.id !== user.id)

      setUsers(tempUsers)
      setUsersFilter(tempUsers)
    }
    fetchUsers()
  }, [])

  const createChatroom = async (otherUser) => {
    const result = await axios({
      method: 'POST',
      url: 'http://192.168.100.13:3000/chatrooms',
      headers: { 'Authorization': user.token },
      data: {
        usersIds: [user.id, otherUser.id],
        name: otherUser.name,
        picture: otherUser.picture,
        lastMessage: ''
      }
    })
    let chatroom = result.data.chatroom

    dispatch(chatroomsSlice.actions.newChat(chatroom))

    // finally we navigate to the chatroom
    navigation.navigate('Chats')
    navigation.navigate('Chat', { id: chatroom.id })
  }

  const filterUsers = (input) => {
    let tempArr
    if (input != '')
      tempArr = users.filter(user => user.name.includes(input) || user.email.includes(input))
    else
      tempArr = users
    setUsersFilter(tempArr)
  }

  return (
    <FlatList
      ListHeaderComponent={(
        <View style={[styles.searchBar, {backgroundColor: colors.card}]}>
          <FontAwesome name="search" size={14} color={colors.subtext} />
          <TextInput
            style={[styles.input, {color: colors.text}]}
            placeholder='Search'
            placeholderTextColor={colors.subtext}
            onChangeText={text => {filterUsers(text)}}
          />
        </View>
      )}
      data={usersFilter}
      renderItem={(item, index) => <UserItem user={item.item} onPress={async () => await createChatroom(item.item)}/>}
      keyExtractor={item => String(item.id)}
      ListEmptyComponent={(
        <View style={styles.containerEmpty}>
          <Entypo name="emoji-sad" size={24} color={colors.subtext} />
          <Text style={[styles.titleEmpty, {color: colors.subtext}]}>No conversations available.</Text>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    height: 40,
    borderRadius: 100,
    margin: 10,
    padding: 10,
    paddingLeft: 20,
  },
  input: {
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