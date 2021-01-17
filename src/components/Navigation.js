import React from 'react'
import { StatusBar } from 'react-native'
import { useSelector } from 'react-redux'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SignIn from './SignIn'
import Home from './Home'
import ChatsTitle from './ChatsTitle'
import Chatroom from './Chatroom'
import ChatroomTitle from './ChatroomTitle'
import UserSearch from './UserSearch'
import Settings from './Settings'
import FullImage from './FullImage'
import ChatroomOptions from './ChatroomOptions'

// todo: tinker around with this
const MyDarkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    primary: '#f48fb1',
    header: '#121212',
    background: '#121212',
    card: '#323232',
    text: '#eeeeee',
    subtext: '#ababab',
    secondary: '#0093ff',
  }
}

const Stack = createStackNavigator()

const MyNavigationContainer = () => {
  const user = useSelector(state => state.user)

  return (
    <NavigationContainer theme={MyDarkTheme}>
      <StatusBar backgroundColor={MyDarkTheme.colors.background}/>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerTintColor: MyDarkTheme.colors.text,
        }}
      >
        {!user ? (
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              title: 'Sign In',
              headerTitleStyle: {
                alignSelf: 'center'
              }
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Chats"
              component={Home}
              options={{
                headerTitle: props => <ChatsTitle {...props}/>
              }}
            />
            <Stack.Screen
              name="Chat"
              component={Chatroom}
              options={({ route }) => ({
                headerTitle: props => <ChatroomTitle {...props} id={route.params.id}/>
              })}
            />
            <Stack.Screen
              name="Search"
              component={UserSearch}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
            />
            <Stack.Screen
              name="FullImage"
              component={FullImage}
              options={{
                title: '',
                headerTransparent: true
              }}
            />
            <Stack.Screen
              name="ChatroomOptions"
              component={ChatroomOptions}
              options={{
                title: '',
                headerStyle: {backgroundColor: MyDarkTheme.colors.background}
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
);
}

export default MyNavigationContainer;
