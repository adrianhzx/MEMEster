

import * as React from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet, StatusBar, TouchableOpacity, Image, ScrollView, BackHandler, Alert } from 'react-native';

import database from '@react-native-firebase/database';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignOutUser } from '../api';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

/*
const getData = () => {
    database().ref().on('value', function (snapshot) {
      setData(snapshot.val());
    });
}
console.log(getData());

*/

//console.log("checking" + JSON.stringify(usering));

//console.log("help me please : " + JSON.stringify(user));



//require('../CA3App/img/meme1.jpg')
//  {/* item.photo */}
/*
function Item({ item }) {

    return (
        <View style={styles.listItem}>
            <View style={{ alignItems: "center", flex: 1 }}>
                <Image source={(item.photo)} style={{ width: '80%', height: 250 }} />
                <Text style={{ fontWeight: "bold", fontSize: 30, marginTop: 10, marginBottom: 10 }}>{item.title}</Text>
                <Text style={{ marginBottom: 10, fontSize: 15 }}>{item.description}</Text>
                <Text style={{ alignSelf: 'flex-start', fontFamily: 'Roboto' }}>Created by : {item.email}</Text>
            </View>
        </View>
    );
}
*/

const HomeScreen = ({ navigation }) => {

    //const Checkinguser = auth().currentUser.getIdToken;
    /*
    auth().currentUser.getIdToken(true).then(function(idToken){
        console.log("CHECHKING: " + idToken);
    }).catch((eror) => {
        console.log(eror)
    })
    */
    //console.log("CHECHKING: " + JSON.stringify(Checkinguser));

    


    React.useEffect(() => {
        const backAction = () => {
            if (navigation.isFocused()) {
                return true;
            }

        };
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, [])

   // const [isLoading, setLoading] = React.useState(true);
    const [users, setUser] = React.useState([]);

    /*
    React.useEffect(() => {
        const userRef = database().ref('/users');
        const LoadingListener = userRef.on('value', snapshot => {
            //console.log("wtf is thisdasodhashd: " + JSON.stringify(snapshot));
            setUser([]);
            snapshot.forEach(function (childSnapshot) {
                console.log("for each what is this : " + JSON.stringify(childSnapshot));
                setUser(users => [...users, childSnapshot.val()]);
            });
        });
        return () => {
            userRef.off('value', LoadingListener)
        }
    }, [])
    */
    
    // Re-render when the page is pressed.
    const isFocused = useIsFocused();

    React.useEffect(() => {
        fetch("https://memesterapinodejs.herokuapp.com/viewallpost", {
            method: 'GET',
            headers: {
                'Accept': "application/json",
                "Content-Type": "application/json",
                "Cache-Control" : "no-cache"
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                //console.log("it did passed! " + JSON.stringify(responseJson));
                setUser([]);
               //const key = Object.keys(responseJson);
                Object.values(responseJson).forEach(function (what){
                    //console.log("mr each what: " + JSON.stringify(what))
                    setUser(users => [...users, what]);
                })
                //setLoading(false);
            })
            .catch(error =>{
                console.log("Error! " + error);
            })
            //.finally(()=> setLoading(false));
    },[isFocused])
    
    

    /*
    React.useEffect(()=>{
       // if(!loading) return;
        const fetchData = async () => {
            const response = await fetch("http://192.168.1.154:3000/viewallpost", {
                method: 'GET',
                headers: {
                    'Accept': "application/json",
                    "Content-Type": "application/json",
                    "Cache-Control" : "no-cache"
                }
            });
            const data = await response.json();
            setUser([]);
            Object.values(data).forEach(function (what){
                console.log("mr each what: " + JSON.stringify(what))
                setUser(users => [...users, what]);
            })
            setLoading(false);
        };
        fetchData();
    },[])
    */
    

    const Data = { data: JSON.parse(JSON.stringify(users)) };

    const [gettingURL, setURL] = React.useState('');


    const Item = ({ item, index }) => {

        //const url = storage().ref(item.photo).getDownloadURL().then(result=> setURL(result));

        return (

            <View style={styles.listItem}>
                <View style={{ alignItems: "center", flex: 1 }}>
                    <Image source={item.photo ? { uri: item.photo } : null} style={{ width: '80%', height: 250 }} />
                    <Text style={{ fontWeight: "bold", fontSize: 30, marginTop: 10, marginBottom: 10 }}>{item.title}</Text>
                    <Text style={{ marginBottom: 10, fontSize: 15 }}>{item.description}</Text>
                    <Text style={{ alignSelf: 'flex-start', fontFamily: 'Roboto' }}>Created by : {item.email}</Text>
                </View>
            </View>
        );
    }


    return (
        <View style={styles.container}>

            <FlatList
                style={{ flex: 1 }}
                data={users}
                extraData={users}
                renderItem={({ item, index }) => {
                    return (
                        <Item item={item} index={index} />
                    )
                }}
                keyExtractor={(item, index) => item.id}
            />

        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        marginTop: 60
    },
    listItem: {
        margin: 5,
        padding: 10,
        backgroundColor: "#FFF",
        width: "85%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5
    }
});

export default HomeScreen;