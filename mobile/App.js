// In App.js in a new project

import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AsyncStorage } from '@react-native-async-storage/async-storage'
// SCREENS 
import HomeScreen from './screens/Home';
import PostScreen from './screens/Post';
import LoginScreen from './screens/Login'
import ProfileScreen from './screens/Profile'
const Stack = createNativeStackNavigator();

function App() {

  const [user, setUser] = useState()

  useEffect(() => {
    _retrieveData()
  }, [])

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        setUser(value)
      }
    } catch (error) {
      setUser(null)
      // Error retrieving data
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user === null ?
          <Stack.Screen name="Login" component={LoginScreen} /> :
          <Stack.Screen name="Home" component={HomeScreen} />}
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;