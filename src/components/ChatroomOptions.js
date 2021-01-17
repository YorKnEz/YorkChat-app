import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, Image, Text, TouchableOpacity, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import axios from 'axios'

const win = Dimensions.get('window')
const width = (win.width - 30)/3

export default function ChatroomOptions({ route }) {
  const { colors } = useTheme()

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const chatroom = route.params.chatroom

  const [photos, setPhotos] = useState([])

  useEffect(() => {
    const fetchPhotos = async () => {
      const result = await axios({
        method: 'GET',
        url: 'http://192.168.100.13:3000/chatrooms/' + chatroom.id + '/photos',
        headers: {
          'Authorization': user.token
        }
      })

      setPhotos(result.data.photos)
    }
    fetchPhotos()
  }, [])

  const options = [
    {
      title: 'Change Nickname',
      onPress: async () => {
        // todo endpoint for changing chatroom name
      },
    }
  ]

  return (
    <>
    <FlatList
      ListHeaderComponent={() => (
        <View style={styles.otherUserProfile}>
          <Image
            source={{uri: chatroom.picture}}
            style={styles.profilePicture}
          />
          <Text
            style={[
              styles.profileName,
              {color: colors.text}
            ]}
          >{chatroom.name}</Text>
        </View>
      )}
      data={options}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={item.onPress}
        >
          <Text style={[
            styles.optionTitle,
            { color: colors.text }
          ]}
          >{item.title}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.title}
      ListFooterComponent={() => (
        <>
        <Text style={[
          styles.optionTitle,
            { color: colors.text }
          ]}
        >Shared Photos</Text>
        <FlatList
          data={photos}
          renderItem={({ item }) => {
            console.log(item)
            return (
              <Image
                source={{ uri: 'http://192.168.100.13:3000/' + item.content}}
                style={styles.photo}
              />
            )
          }}
          keyExtractor={item => item.uri}
          columnWrapperStyle={true}
          numColumns={3}
        />
        </>
      )}
    />
    </>
  )
}

const styles = StyleSheet.create({
  profilePicture: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 100,
  },
  profileName: {
    fontSize: 20,
    alignSelf: 'center',
    padding: 10,
  },
  optionTitle: {
    fontSize: 20,
    margin: 10,
  },
  photo: {
    width: width,
    height: width,
    margin: 5
  }
})