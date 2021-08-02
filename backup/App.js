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
import { SafeAreaView,Text, View, FlatList, StyleSheet, StatusBar, TouchableOpacity,Image, TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import HomeScreen from './screens/homepage';
import AddScreen from './screens/addpage';
import ProfileScreen from './screens/profile';
import { SignUpUser } from './api';
import Signupscreen from './screens/signupscreen';





const test1 = ({navigation}) => {
 
  // const userEmail = [email,setEmail] = React.useState('asd');
  // const userPassword = [password,setPassword] = React.useState('asd'); 

  const [state, setState] = React.useState({
    email: '',
    password:''
  });
  const signUp = () => {
    SignUpUser(state.email, state.password).then((data) => {
      alert(data)
    }).catch((error) => {
      alert(error)
    })
    //alert(JSON.stringify(state));
  }
  const signout = () => {
    alert('Sign Out');
  }

  return(
    <View style={styles.container}>
      <View style={styles.inputView} >
        <TextInput  
          style={styles.inputText}
          placeholder="Email..." 
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setState({...state, email:text})}
          value = {state.email} />      
      </View>
      <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={ (text) => setState({...state, password:text})}
            value = {state.password}/>          
        </View>
           {/* <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.loginText} onPress={() => navigation.navigate('test2')} >Signup</Text>
          </TouchableOpacity>
    </View>
  );
}

const test2 = ({navigation}) => {
 
  // const userEmail = [email,setEmail] = React.useState('asd');
  // const userPassword = [password,setPassword] = React.useState('asd'); 

  const [state, setState] = React.useState({
    email: '',
    password:''
  });
  const signUp = () => {
    SignUpUser(state.email, state.password).then((data) => {
      alert(data)
    }).catch((error) => {
      alert(error)
    })
    //alert(JSON.stringify(state));
  }
  
  return(
    <View style={styles.container}>
      <Text>SIGN UP</Text>
      <View style={styles.inputView} >
        <TextInput  
          style={styles.inputText}
          placeholder="Email..." 
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setState({...state, email:text})}
          value = {state.email} />      
      </View>
      <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={ (text) => setState({...state, password:text})}
            value = {state.password}/>          
        </View>
          <TouchableOpacity>
            <Text style={styles.loginText} onPress={signUp} >Signup</Text>
          </TouchableOpacity>
    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
});

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {

  createHomeStack = () =>{
    <Stack.Navigator>
      <Stack.Screen name="test2" component={test2}/>
    </Stack.Navigator>  
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home-outline'
            } else if (route.name === 'Add') {
              iconName = 'add-outline'
            } else if (route.name === 'Profile'){
              iconName = 'person-circle-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={20} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="test" component={test1} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}