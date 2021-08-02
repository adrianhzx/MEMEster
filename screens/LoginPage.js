import * as React from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet, StatusBar, TouchableOpacity, Image, TextInput, Alert } from 'react-native';

import { SigninUser, SignOutUser } from '../api';
import auth from '@react-native-firebase/auth';



const LoginPage = ({ navigation }) => {

    // const userEmail = [email,setEmail] = React.useState('asd');
    // const userPassword = [password,setPassword] = React.useState('asd'); 

    const [state, setState] = React.useState({
        email: '',
        password: ''
    });

    const [user, setUser] = React.useState();

    const signIn = () => {

        if (state.email === '' && state.password === '') {
            return alert("Email and Password are not key in");
        }
        else if (state.email === '') {
            return alert("Please enter your email.");
        } else if (state.password === '') {
            return alert("Please Enter your Password")
        }

        SigninUser(state.email, state.password).then((data) => {
            setState({ ...state, email: '' })
            setState({ ...state, password: '' })
            alert(data)
        }).catch((error) => {
            setState({ ...state, email: '' })
            setState({ ...state, password: '' })
            alert(error)
        })
        //alert(JSON.stringify(state));
    }

    const onAuthStateChanged = user => {
        setUser(user);
    };

    
    React.useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);
    


    if (user != null) {
        // i need to pass the user json to this screens.

        if (user.displayName != null && user.photoURL != null) {
            navigation.navigate('AllinOne');
        } else {
            navigation.navigate('Please update your details');
        }


    }
    

    return (
        <View style={styles.container}>
            <Image source={{ uri: "https://firebasestorage.googleapis.com/v0/b/ca3-app.appspot.com/o/logoades.JPG?alt=media&token=69db6b6f-5023-4a37-b523-17c2321a69ba" }} style={{ height: 50, width: 200, marginBottom: 30 }} />
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Email..."
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setState({ ...state, email: text })}
                    value={state.email} />
            </View>
            <View style={styles.inputView} >
                <TextInput
                    secureTextEntry={true}
                    style={styles.inputText}
                    placeholder="Password..."
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setState({ ...state, password: text })}
                    value={state.password} />
            </View>
            {/* <TouchableOpacity>
             <Text style={styles.forgot}>Forgot Password?</Text>
             </TouchableOpacity> */}
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText} onPress={signIn}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 10 }}>
                <Text style={styles.loginText} onPress={() => navigation.navigate('SignUp')} >Signup</Text>
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
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
});

export default LoginPage;