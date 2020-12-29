import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, View, FlatList, Image, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { chatroomsSlice } from '../features/chatroomsSlice'

import UserItem from './UserItem'

import { FontAwesome } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

export default function UserSearch({ navigation }) {
  // const users = [
  //   {
  //     email: 'brucewayne@gmail.com',
  //     family_name: 'Wayne',
  //     given_name: 'Bruce',
  //     id: '12038102983012890481',
  //     locale: 'en',
  //     name: 'Bruce Wayne',
  //     picture: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
  //     verified_email: true,
  //   },
  //   {
  //     email: 'palaghean4@gmail.com',
  //     family_name: 'Palaghean',
  //     given_name: 'Andrei',
  //     id: '12038102983013890481',
  //     locale: 'ro',
  //     name: 'Andrei Palaghean',
  //     picture: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
  //     verified_email: true,
  //   },
  //   // {
  //   //   id: '106387574477615885994',
  //   //   email: 'alexmitreanu04@gmail.com',
  //   //   verified_email: true,
  //   //   name: 'Alex Mitreanu',
  //   //   given_name: 'Alex',
  //   //   family_name: 'Mitreanu',
  //   //   picture: 'https://lh3.googleusercontent.com/a-/AOh14GgniH8lGvPAzXGHZBmRA7i_Gpg_mJwOSROA2mXJiA=s96-c',
  //   //   locale: 'en'
  //   // },
  //   {
  //     id: '103862505022028486682',
  //     email: 'alexmitreanu10@gmail.com',
  //     verified_email: true,
  //     name: 'Alex Mitreanu',
  //     given_name: 'Alex',
  //     family_name: 'Mitreanu',
  //     picture: 'https://lh3.googleusercontent.com/a-/AOh14Gi_BStg9h0WXqkRGPrgCn_m0HwU3zy7d18PjPfO=s96-c',
  //     locale: 'en-GB'
  //   }
  // ]

  const dispatch = useDispatch()

  const [users, setUsers] = useState([]) // user list
  const [usersFilter, setUsersFilter] = useState([]) // users list for flatlist

  const user = useSelector(state => state.user)
  const chatrooms = useSelector(state => state.chatrooms)

  useEffect(() => {
    async function fetchUsers() {
      let tempUsers = await fetch('http://192.168.100.13:3000/users')
        .then(response => response.json())

      tempUsers = tempUsers.filter(currUser => currUser.id != user.id)

      setUsers(tempUsers)
      setUsersFilter(tempUsers)
    }
    fetchUsers()
  }, [])

  const createChatroom = (otherUser) => {
    // check if chatroom already exists
    let chatroom = chatrooms.find(chatroom => {
      const isOtherUserInChatroom = chatroom.users.find(user => user.id == otherUser.id)
      if(isOtherUserInChatroom) {
        return isOtherUserInChatroom
      }
      else return false
    })
    if (!chatroom) { // if it doesn't then we create a new chatroom
      chatroom = {
        users: [user, otherUser],
        messages: [],
        name: otherUser.name,
        id: String(user.id) + String(otherUser.id),
        picture: otherUser.picture,
      }
      dispatch(chatroomsSlice.actions.newChat(chatroom))
    }

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
        <View style={styles.searchBar}>
          <FontAwesome name="search" size={14} color="black" />
          <TextInput
            style={styles.input}
            placeholder='Search'
            placeholderTextColor='#000'
            onChangeText={text => {filterUsers(text)}}
          />
        </View>
      )}
      data={usersFilter}
      renderItem={(item, index) => <UserItem user={item.item} onPress={() => createChatroom(item.item)}/>}
      keyExtractor={item => item.id}
      ListEmptyComponent={(
        <View style={styles.containerEmpty}>
          <Entypo name="emoji-sad" size={24} color="lightgray" />
          <Text style={styles.titleEmpty}>No conversations available.</Text>
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
    backgroundColor: 'lightgray',
    padding: 10,
    paddingLeft: 20,
    borderRadius: 100,
    width: '90%',
    margin: 5,
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
    color: 'lightgray',
    marginLeft: 10,
  },
})