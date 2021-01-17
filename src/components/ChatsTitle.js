import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation, useTheme } from '@react-navigation/native'

import { Entypo } from '@expo/vector-icons'

function ChatsTitle() {
  const navigation = useNavigation()
  const { colors } = useTheme()

  const user = useSelector(state => state.user)

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={{ uri: user ? user.picture : null }} style={styles.image}/>
        <Text style={[styles.title, {color: colors.text}]}>Chats</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Entypo name="dots-three-vertical" size={18} color={colors.text} />
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
  titleContainer: {
    flexDirection: 'row',
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
    fontWeight: 'bold',
  }
})

export default ChatsTitle