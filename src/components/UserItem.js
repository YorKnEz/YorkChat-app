import React from 'react'
import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import { useTheme } from '@react-navigation/native'

export default function UserItem({ user, onPress }) {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <Image style={styles.image} source={{ uri: user.picture }}/>
      <Text style={[styles.title, { color: colors.text }]}>{user.name}</Text>
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
    fontWeight: 'bold',
  },
})