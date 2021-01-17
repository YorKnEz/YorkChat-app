import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, Image, View, TextInput, Button } from 'react-native'
import Modal from 'react-native-modal'
import { useNavigation, useTheme } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios'

import { userSlice } from '../features/userSlice'

import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { Entypo, Feather } from '@expo/vector-icons'

function Settings() {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const [modalVisible, setModalVisible] = useState(false)
  const [firstName, setFirstName] = useState(user ? user.firstName : '')
  const [lastName, setLastName] = useState(user ? user.lastName : '')

  const settings = [
    {
      icon: () => <Entypo name="log-out" size={24} color={colors.text} style={styles.icon} />,
      image: null, 
      title: 'Logout',
      onPress: () => {
        navigation.popToTop()
        dispatch(userSlice.actions.signOut())
      },
    },
    {
      icon: () => <Entypo name="log-out" size={24} color={colors.text} style={styles.icon} />,
      image: null, 
      title: 'Logout2',
      onPress: () => {
        navigation.popToTop()
        dispatch(userSlice.actions.signOut())
      },
    }
  ]

  const updateAvatar = async () => {
    // ask for permission to access gallery
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!')
      return
    }

    // if the permission was given open gallery
    const pickerResult = await ImagePicker.launchImageLibraryAsync()

    console.log(pickerResult)

    // crop the image
    let crop
    if (pickerResult.width > pickerResult.height) {
      crop = {
        originX: pickerResult.width/2 - pickerResult.height/2, 
        originY: 0,
        width: pickerResult.height,
        height: pickerResult.height,
      }
    } else {
      crop = {
        originX: 0, 
        originY: pickerResult.height/2 - pickerResult.width/2,
        width: pickerResult.width,
        height: pickerResult.width,
      }
    }
    const manipResult = await ImageManipulator.manipulateAsync(
      pickerResult.uri,
      [{ crop }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG } 
    )

    // create a form for the image
    const formData = new FormData()
    formData.append('profile_image', {
      uri: manipResult.uri,
      type: 'image/png',
      name: manipResult.uri,
    })

    // send the form to the server
    const result = await axios({
      method: 'PUT',
      url: 'http://192.168.100.13:3000/user/' + user.id + '/avatar',
      headers: {
        'Authorization': user.token
      },
      data: formData
    })

    dispatch(userSlice.actions.signIn({
      ...user,
      picture: 'http://192.168.100.13:3000/' + result.data.filename
    }))
  }

  const updateUser = async () => {
    const result = await axios({
      method: 'PUT',
      url: 'http://192.168.100.13:3000/user/' + user.id,
      headers: {
        'Authorization': user.token
      },
      data: {
        ...user,
        firstName,
        lastName,
        name: firstName + ' ' + lastName
      }
    })

    dispatch(userSlice.actions.signIn(result.data.user))

    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <Modal
        isVisible={modalVisible}
      >
        <View style={[styles.modal, {backgroundColor: colors.card}]}>
          <Text
            style={[styles.title, { color: colors.text }]}
            onPress={() => setModalVisible(!modalVisible)}
          >Change your name</Text>
          <View style={styles.form}>
            <Text style={[styles.formTitle, {color: colors.text}]}>First Name</Text>
            <TextInput
              style={[styles.formInput, {
                borderBottomColor: colors.secondary,
                color: colors.text
              }]}
              defaultValue={user ? user.firstName : ''}
              onChangeText={input => setFirstName(input)}
            />
            <Text style={[styles.formTitle, {color: colors.text}]}>Last Name</Text>
            <TextInput
              style={[styles.formInput, {
                borderBottomColor: colors.secondary,
                color: colors.text
              }]}
              defaultValue={user ? user.lastName : ''}
              onChangeText={input => setLastName(input)}
            />
          </View>
          <View style={styles.buttons}>
            <Text
              style={[styles.text, {color: colors.secondary}]}
              onPress={() => setModalVisible(false)}
            >CANCEL</Text>
            <Text
              style={[styles.text, {color: colors.secondary}]}
              onPress={updateUser}
            >EDIT</Text>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={updateAvatar}>
        <Image
          source={{uri: user ? user.picture : 'ok google'}}
          style={styles.profilePicture}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Feather name="edit" size={24} color={colors.text} />
        <Text style={[styles.profileName, {color: colors.text}]}>{user ? user.name : ''}</Text>
      </TouchableOpacity>
      <FlatList
        data={settings}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={item.onPress}
            style={styles.setting}
          >
            {item.icon ? (
              <item.icon/>
            ) : (
              <Image source={{uri : item.image}} />
            )}
            <Text style={[styles.title, {color: colors.text}]}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.title}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  modal: {
    padding: 20,
    width: 320,
    alignSelf: 'center',
  },
  form: {
    paddingTop: 20,
    margin: 5,
  },
  formTitle: {
    fontSize: 18,
  },
  formInput: {
    margin: 5,
    marginBottom: 25,
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  text: {
    marginLeft: 10,
    marginRight: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 100,
  },
  profileName: {
    fontSize: 20,
    alignSelf: 'center',
    padding: 10,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
  },
})

export default Settings