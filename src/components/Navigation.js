import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux';

import SignIn from './SignIn'
import Home from './Home'
import ChatsTitle from './ChatsTitle'
import Chatroom from './Chatroom'
import ChatroomTitle from './ChatroomTitle'
import UserSearch from './UserSearch'


const Stack = createStackNavigator()

const MyNavigationContainer = () => {
  const user = useSelector(state => state.user)

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions= {{
          headerStyle: {
              backgroundColor: '#004D40',
          },
          headerTintColor: '#fff'
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
);
}

export default MyNavigationContainer;
