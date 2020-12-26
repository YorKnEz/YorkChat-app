import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'

function Splash() {
  return (
    <View style={styles.container}>
      <Text>Loading ...</Text>
      <ActivityIndicator size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Splash