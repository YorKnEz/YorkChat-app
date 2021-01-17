import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { useTheme } from '@react-navigation/native'

function ChatroomItem({ chatroom, onPress }) {
  const { colors } = useTheme()

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image style={styles.picture} source={{ uri: chatroom ? chatroom.picture : null }}/>
      <View style={styles.subcontainer}>
        <Text style={[styles.title, { color: colors.text }]}>{chatroom.name}</Text>
        <Text 
          style={[styles.lastMessage], { color: colors.subtext }}
          numberOfLines={1}
          ellipsizeMode='tail'
        >{chatroom.lastMessage ? chatroom.lastMessage : ''}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingRight: 10,
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
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 12,
  }
})

export default ChatroomItem