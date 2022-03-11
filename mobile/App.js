// In App.js in a new project

import React, { useState, useEffect } from 'react';
import { View, LogBox, Text, SafeAreaView, Button, Settings } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage'
// SCREENS 
import HomeScreen from './screens/Home';
import PostScreen from './screens/Post';
import LoginScreen from './screens/Login'
import ProfileScreen from './screens/Profile'
import FriendsScreen from './screens/Friends';
import SettingsScreen from './screens/Settings'
import ChatScreen from './screens/Chat';
import CreateScreen from './screens/Create';
import MapScreen from './screens/Map'
import EditprofileScreen from './screens/EditProfile';
import NotificationsScreen from "./screens/Notifications"
// WARNINGS
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

function App() {

  const [user, setUser] = useState()

  const getLoggedUser = async () => {
    try {
      const data = await AsyncStorage.getItem('key')
      setUser("data")
    } catch (e) {
      console.log(e)
    }
    console.log(user)

  }

  const headerTitleStyle = {
    headerStyle: {
      backgroundColor: "#00aced",
    },
    headerTintColor: "white",
    headerTitleStyle: {
      fontWeigh: "bold"
    }
  }

  const headerHome = {
    navigationOptions: {
      title: 'MyScreen',
      headerLeft: null
    }
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={headerTitleStyle} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerBackVisible: false, headerStyle: { backgroundColor: "#00aced" }, headerTintColor: "white" }} />
        <Stack.Screen name="Friends" component={FriendsScreen} options={{ headerBackVisible: false, headerStyle: { backgroundColor: "#00aced" }, headerTintColor: "white" }} />
        <Stack.Screen name="Post" component={PostScreen} options={headerTitleStyle} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerBackVisible: false, headerStyle: { backgroundColor: "#00aced" }, headerTintColor: "white" }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerBackVisible: false, headerStyle: { backgroundColor: "#00aced" }, headerTintColor: "white" }} />
        <Stack.Screen name="Create" component={CreateScreen} options={headerTitleStyle} />
        <Stack.Screen name="Maps" component={MapScreen} options={headerTitleStyle} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={headerTitleStyle} />
        <Stack.Screen name="EditProfile" component={EditprofileScreen} options={headerTitleStyle} />
        <Stack.Screen name="Chat" component={ChatScreen} options={headerTitleStyle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;