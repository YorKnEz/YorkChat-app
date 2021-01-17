import React, { useState } from 'react'
import { View, Dimensions, Animated, StyleSheet } from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'

const win = Dimensions.get('window')

export default function FullImage({ route }) {
  let width = route.params.width
  let height = route.params.height
  let ratio

  // if (width > height) {
  //   ratio = win.width/width
  //   width = win.width
  //   height = height * ratio
  // }
  // else {
  //   ratio = win.height/height
  //   width = width * ratio
  //   height = win.height
  // }

  width = win.width
  height = win.height

  let scale = new Animated.Value(1)

  let onPinchEvent = Animated.event([
    { nativeEvent: { scale }},
  ], {useNativeDriver: true})

  let onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 1,
      }).start()
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <PinchGestureHandler
        onGestureEvent={onPinchEvent}
        onHandlerStateChange={onPinchStateChange}
      >
        <Animated.Image
          source={{ uri: route.params.uri }}
          style={[
            styles.image,
            {
              transform: [
                { scale },
                // { translateX: x },
                // { translateY: y }
              ],
            }
          ]}
          resizeMode='contain'
        />
      </PinchGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: win.width,
    height: win.height
  }
})