import React from 'react'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SignIn from './src/components/SignIn'
import Home from './src/components/Home'
import Chatroom from './src/components/Chatroom'
import userSlice from './src/features/userSlice'

const Stack = createStackNavigator()

function App() {
  const user = useSelector(state => userSlice.state.user)

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions= {{
          headerStyle: {
            backgroundColor: '#00796B',
          },
          headerTintColor: '#fff'
        }}
      >
        {user ? (
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              title: 'Sign In',
              headerStyle: {
                alignItems: 'center'
              },
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
            />
            <Stack.Screen
              name="Chat"
              component={Chatroom}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App