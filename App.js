/*
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';

function App() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
      />
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
}

export default App;
*/

/*
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
*/

/*
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Boookcase extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Bookcase
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
*/

import * as React from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet, StatusBar, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { SigninUser, SignOutUser } from './api';
import Signupscreen from './screens/signupscreen';
import auth from '@react-native-firebase/auth';
import HomeScreen from './screens/homepage';
import AddScreen from './screens/addpage';
import ProfileScreen from './screens/profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginPage from './screens/LoginPage';
import profileDetails from './screens/profileDetails';







const Tab = createBottomTabNavigator();

const PassingPageWithTab = ({ navigation }) => {

  auth().onAuthStateChanged((user) => {
    if (user == null) {
      navigation.navigate('LoginPage');
    }
  });

  return (
    <NavigationContainer independent={true} >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home-outline'
            } else if (route.name === 'Add') {
              iconName = 'add-outline'
            } else if (route.name === 'Profile') {
              iconName = 'person-circle-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={20} color={color} />;
          },
          headerLeft: () => null,
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}


      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='First' >
        <Stack.Screen name="LoginPage" component={LoginPage} options={{headerTitle:null, headerShown: false}} />
        <Stack.Screen name="SignUp" component={Signupscreen} />
        <Stack.Screen name="Please update your details" component={profileDetails} options={{ headerLeft: null }} />
        <Stack.Screen name="AllinOne" component={PassingPageWithTab} options={{
          headerLeft: null,
          headerTitle: <Image source={{uri: "https://firebasestorage.googleapis.com/v0/b/ca3-app.appspot.com/o/logoades.JPG?alt=media&token=69db6b6f-5023-4a37-b523-17c2321a69ba"}} style={{height:20, width: 70}}/>
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}