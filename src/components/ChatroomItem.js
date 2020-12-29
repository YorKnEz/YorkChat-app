import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'

function ChatroomItem({ chatroom, onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image style={styles.picture} source={{ uri: chatroom ? chatroom.picture : null }}/>
      <View style={styles.subcontainer}>
        <Text style={styles.title}>{chatroom.name}</Text>
        <Text style={styles.lastMessage}>{chatroom.messages.length > 0 ? chatroom.messages[chatroom.messages.length-1].content : ''}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  picture: {
    height: 60,
    width: 60,
    borderRadius: 100,
    marginLeft: 10,
    marginRight: 10,
  },
  subcontainer: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 12,
    color: 'black',
  }
})

export default ChatroomItem