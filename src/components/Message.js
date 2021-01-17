import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'

export default function Message({ user, message }) {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const [width, setWidth] = useState(9)
  const [height, setHeight] = useState(16)

  useEffect(() => {
    const getImageSize = async () => {
      await Image.getSize(
        'http://192.168.100.13:3000/' + message.content,
        (width, height) => {
          setWidth(width)
          setHeight(height)
        }
      )
    }
    if (message.mediaType === 'image') getImageSize()
  })

  if (message.mediaType === null)
    return (
      <View style={styles.container}>
        {user.id == message.UserId? (
          <Text
            style={[styles.message, {
              alignSelf: 'flex-end',
              backgroundColor: colors.primary
            }]}
          >{message.content}</Text>
        ) : (
          <Text
            style={[styles.message, {
              alignSelf: 'flex-start',
              backgroundColor: colors.card
            }]}
          >{message.content}</Text>
        )}
      </View>
    )
  else if (message.mediaType === 'image') {
    const win = Dimensions.get('window')
    const ratio = win.width/width

    return (
      <View style={styles.container}>
        {user.id == message.UserId ? (
          <TouchableOpacity
            onPress={() => navigation.navigate(
              'FullImage',
              {
                uri: 'http://192.168.100.13:3000/' + message.content,
                width,
                height,
              }
            )}
          >
            <Image
              source={{ uri: 'http://192.168.100.13:3000/' + message.content }}
              style={{
                alignSelf: 'flex-end',
                width: win.width * 0.4,
                height: (height * ratio) * 0.4,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate(
              'FullImage',
              {
                uri: 'http://192.168.100.13:3000/' + message.content,
                width,
                height,
              }
            )}
          >
            <Image
              source={{ uri: 'http://192.168.100.13:3000/' + message.content }}
              style={{
                alignSelf: 'flex-start',
                width: win.width * 0.4,
                height: (height * ratio) * 0.4,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  message: {
    color: '#EEEEEE',
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  }
})