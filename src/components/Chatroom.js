import React, { useState, useEffect, useRef } from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { Feather } from '@expo/vector-icons'
import io from 'socket.io-client'

const socket = io("http://192.168.100.13:3000");

function Chatroom() {
  const [chatMessage, setChatMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    socket.on('chat message', msg => {
      let tempArr = chatMessages

      tempArr.push({ message: msg})

      console.log('tempArr: ' + tempArr)

      setChatMessages(tempArr)
    })
  }, [])

  const renderItem = ({ item }) => (
    <Text style={styles.message}>{item.message}</Text>
  )

  const submitChatMessage = () => {
    if (chatMessage !== '') {
      socket.emit('chat message', chatMessage)
      console.log('message:' + chatMessage)
      setChatMessage('')
      inputRef.current.clear()
    }
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={chatMessages}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
      />
      <Button
        title='Test'
        onPress={() => console.log(chatMessages)}
      />
      <View style={styles.sendBar}>
        <TextInput
          style={styles.input}
          onChangeText={chatMessage => {
          setChatMessage(chatMessage)
          }}
          placeholder='Write a message'
          ref={inputRef}
        />
        <TouchableOpacity
          onPress={submitChatMessage}
        >
          <Feather name="send" size={24} color="lightgray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 18,
    color: 'lightgray'
  },
  input: {
    height: 40,
    width: '80%',
  },
  sendBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingLeft: 20,
    paddingRight: 10,
  },
});
  
export default Chatroom