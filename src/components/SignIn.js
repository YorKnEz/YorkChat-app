import React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native'

import axios from 'axios'

import { chatroomsSlice } from '../features/chatroomsSlice'
import { userSlice } from '../features/userSlice'

import * as Google from 'expo-google-app-auth'

function SignIn() {
  const { colors } = useTheme()

  const dispatch = useDispatch();

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: '739051079592-1vh10mi76ev8377p5vb6m1f2gq15hd3l.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      })

      if (result.type === 'success') {
        const user = await axios({
          method: 'GET',
          url: 'https://www.googleapis.com/userinfo/v2/me',
          headers: { Authorization: `Bearer ${result.accessToken}` }
        })

        const login = await axios({
          method: 'POST',
          url: 'http://192.168.100.13:3000/login',
          data: user.data
        })

        const loggedUser = {...login.data.user, token: login.data.token}
        dispatch(userSlice.actions.signIn(loggedUser))
      } else {
        // return { cancelled: true }
      }
    } catch (e) {
      // return { error: true }
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title='LOG IN WITH GOOGLE'
        color={colors.card}
        onPress={async () => await signInWithGoogleAsync()}
      />
      <View style={{ marginBottom: 10 }} />
      <Button
        title='Test user 1'
        color={colors.card}
        onPress={async () => {
          const login = await axios({
            method: 'POST',
            url: 'http://192.168.100.13:3000/login',
            data: {
              email: 'alexmitreanu04@gmail.com',
              verifiedEmail: true,
              given_name: 'Alex',
              family_name: 'Mitreanu',
              name: 'Alex Mitreanu',
              locale: 'ro',
              picture: 'https://lh3.googleusercontent.com/a-/AOh14GgniH8lGvPAzXGHZBmRA7i_Gpg_mJwOSROA2mXJiA=s96-c'
            }
          })

          const loggedUser = {...login.data.user, token: login.data.token}
          dispatch(userSlice.actions.signIn(loggedUser))
        }}
      />
      <View style={{ marginBottom: 10 }} />
      <Button
        title='Test user 2'
        color={colors.card}
        onPress={async () => {
          const login = await axios({
            method: 'POST',
            url: 'http://192.168.100.13:3000/login',
            data: {
              email: 'yorknez@gmail.com',
              verifiedEmail: true,
              given_name: 'Prietenul',
              family_name: 'Naturii',
              name: 'Prietenul Naturii',
              locale: 'ro',
              picture: 'https://lh3.googleusercontent.com/a-/AOh14GgpSVbD7mMQTME20eTnzbfy3UuH-J4ZvkrPJPTN=s96-c'
            }
          })

          const loggedUser = {...login.data.user, token: login.data.token}
          dispatch(userSlice.actions.signIn(loggedUser))
          dispatch(chatroomsSlice.actions.updateChats([]))
        }}
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