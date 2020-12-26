import React from 'react'
import { StyleSheet } from 'react-native'
import { dispatch } from '../features/store'

import signIn from '../features/userSlice'

import * as Google from 'expo-google-app-auth'

function SignIn() {
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: '739051079592-1vh10mi76ev8377p5vb6m1f2gq15hd3l.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      })

      if (result.type === 'success') {
        let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me',
          {
            headers: { Authorization: `Bearer ${result.accessToken}` },
          })
          .then(response => response.json())
          .catch(error => {console.error('Fetch error: ', error)})

        const payload = {
          user: userInfoResponse,
          chatroom: null // query obj from a database probably
        }

        dispatch(signIn(payload))
      } else {
        return { cancelled: true }
      }
    } catch (e) {
      return { error: true }
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title='LOG IN WITH GOOGLE'
        onPress={async () => await signInWithGoogleAsync()}
      />
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

export default SignIn