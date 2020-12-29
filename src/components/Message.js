import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function Message({ user, message }) {
  return (
    <View style={styles.container}>
      {user.id == message.sender.id ? (
        <>
          <Text style={styles.userMessage}>{message.content}</Text>
        </>
      ) : (
        <Text style={styles.otherUserMessage}>{message.content}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  userMessage: {
    backgroundColor: '#00695C',
    alignSelf: 'flex-end',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  otherUserMessage: {
    backgroundColor: '#00695C',
    alignSelf: 'flex-start',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
  }
})