
import * as React from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SignOutUser } from '../api';
import database from '@react-native-firebase/database';
import { useIsFocused } from '@react-navigation/native';

const signout = () => {
    SignOutUser().then((data) => {
        alert(data)
        //navigation.navigate('LoginPage');
    }).catch((error) => {
        alert(error)
    })

}

const ProfileScreen = ({ navigation }) => {

    const user = auth().currentUser;
    //console.log("help me please : " + JSON.stringify(user.photoURL));
    //console.log("help me please : " + JSON.stringify(user.displayName));


    const [getUsers, setUser] = React.useState([]);

    const [user2, setUser2] = React.useState();


    //console.log("cheking child" + JSON.stringify(user));
    /*
    React.useEffect(() => {
        const userRef = database().ref('/users');
        const query = userRef.orderByChild("email").equalTo(user.email);
        const LoadingListener = query.on('value', snapshot => {
            setUser([]);
            snapshot.forEach(function (childSnapshot) {
                setUser(getUsers => [...getUsers, childSnapshot.val()]);
            });
        });

        const removeChildListener = userRef.on('child_removed', snapshot => {
            alert("Your post has been removed!");
        })
        return () => {
            userRef.off('value', LoadingListener);
            userRef.off('child_removed', removeChildListener)
        }
    }, [])
    */

    const isFocused = useIsFocused();

    
    React.useEffect(() => {
        fetch(`https://memesterapinodejs.herokuapp.com/viewOwnPost/${user.email}`, {
            method: 'GET',
            headers: {
                'Accept': "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                //console.log("it did passed! " + JSON.stringify(responseJson));
                setUser([]);
                //const key = Object.keys(responseJson);
                Object.values(responseJson).forEach(function (what) {
                    //console.log("mr each what: " + JSON.stringify(what))
                    setUser(getUsers => [...getUsers, what]);
                })
                //setLoading(false);
            })
            .catch(error => {
                console.log("Error! " + error);
            })

    }, [isFocused])
    

    /*
    alert(JSON.stringify(item));
    database().ref('users/' + item.id).remove().then(() => {
    }).catch((error) => {
        alert(error);
    })
    */


    const deletePost = (item) => {

        //alert("test");
     
            fetch(`https://memesterapinodejs.herokuapp.com/removepost/${item.id}`, { method: "DELETE" })
                .then(response => response.json())
                .then(responseJson => {
                    //alert("what");

                    alert("Your post has been deleted!");
                    fetch(`https://memesterapinodejs.herokuapp.com/viewOwnPost/${user.email}`, {
                        method: 'GET',
                        headers: {
                            'Accept': "application/json",
                            "Content-Type": "application/json",
                            "Cache-Control": "no-cache"
                        }
                    })
                        .then(response => response.json())
                        .then(responseJson => {
                            //console.log("it did passed! " + JSON.stringify(responseJson));
                            setUser([]);
                            //const key = Object.keys(responseJson);
                            Object.values(responseJson).forEach(function (what) {
                                //console.log("mr each what: " + JSON.stringify(what))
                                setUser(getUsers => [...getUsers, what]);
                            })
                            //setLoading(false);
                        })
                        .catch(error => {
                            console.log("Error! " + error);
                        })

                })
                .catch(error => {
                    console.log("Error! " + error);
                })
    

    }

    //console.log("checking result " + JSON.stringify(getUsers));

    const updatePost = item => {
        alert("item" + item.title);
    }


    function Item({ item }) {

        return (
            <View style={styles.listItem}>
                <Image source={item.photo ? { uri: item.photo } : null} style={{ width: 60, height: 60, borderRadius: 30 }} />

                <View style={{ alignItems: "center", justifyContent: "space-around", flex: 1 }}>
                    <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                </View>

                <View style={{ height: 60, width: 50, justifyContent: "center", alignItems: "center" }}>
                    {/* <TouchableOpacity onPress={() => updatePost(item)}>
                        <Ionicons name="clipboard-outline" size={20} color="#777777" style={{ marginBottom: 15 }} />
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => deletePost(item)}>
                        <Ionicons name="trash-outline" size={20} color="#777777" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }



    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    {/* <Image source={user.photoURL ? {uri: user.photoURL} : null} /> */}
                    <Image source={user.photoURL ? { uri: user.photoURL } : null} style={{ width: 90, height: 90, borderRadius: 45 }} />
                    <View style={{ marginLeft: 20 }}>
                        <Text style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>{user.displayName}</Text>
                        <TouchableOpacity onPress={signout}>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Ionicons name="log-out-outline" size={20} color="#777777" />
                                <Text style={{ color: "#777777", marginLeft: 5 }}>Log out</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>



            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    {/* <Icon name="email" color="#777777" size={20} /> */}
                    <Ionicons name="mail-outline" size={20} color="#777777" />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{user.email}</Text>
                </View>
            </View>


            <View style={styles.container2}>
                <FlatList
                    style={{ flex: 1 }}
                    data={getUsers}
                    renderItem={({ item, index }) => {
                        return (
                            <Item item={item} index={index} />
                        )
                    }}
                    keyExtractor={(item, index) => item.id}
                />
            </View>

        </SafeAreaView>
    );

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
        marginTop: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
    container2: {
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


export default ProfileScreen;