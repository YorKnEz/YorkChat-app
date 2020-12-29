import React from 'react'
import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native'

export default function UserItem({ user, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <Image style={styles.image} source={{ uri: user.picture }}/>
      <Text style={styles.title}>{user.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center'
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 100,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
})