import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { useSelector } from 'react-redux'

function ChatsTitle() {
  const user = useSelector(state => state.user)

  return (
    <View style={styles.container}>
      <Image source={{ uri: user ? user.picture : null }} style={styles.image}/>
      <Text style={styles.title}>Chats</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: 'center',
    borderRadius: 100,
  },
  title: {
    marginLeft: 10,
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  }
})

export default ChatsTitle