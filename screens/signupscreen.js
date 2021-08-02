import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { SignUpUser } from '../api';
import auth from '@react-native-firebase/auth';

function Signupscreen({ navigation }) {

    const [state, setState] = React.useState({
        email: '',
        password: ''
    });

    const [user, setUser] = React.useState();


    const signUp = () => {

        if (state.email === '' && state.password === '') {
            return alert("Email and Password are not key in");
        }
        else if (state.email === '') {
            return alert("Please enter your email.");
        } else if (state.password === '') {
            return alert("Please Enter your Password")
        }

        SignUpUser(state.email, state.password).then((data) => {
            alert(data)
        }).catch((error) => {
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
        navigation.navigate('Please update your details');
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
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText} onPress={signUp}>Signup</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: "space-around", marginTop: 10 }}>
                <Text style={{}}>Already have an account? </Text>
                <TouchableOpacity>
                    <Text style={{ color: "#0000FF" }} onPress={() => navigation.navigate('LoginPage')} >Login now</Text>
                </TouchableOpacity>
            </View>

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

export default Signupscreen;