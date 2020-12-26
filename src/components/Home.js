import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
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

export default Home