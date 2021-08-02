

import * as React from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert, Image, Button, Platform, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { SubmitPost } from '../api';


function AddScreen() {

    const [id, setId] = React.useState();
    const [getUser, setUser] = React.useState(null);


    auth().onAuthStateChanged((user) => {
        if (user) {
            //console.log("user logged (ADDPAGE) = " + user.email);
            setUser(user.email);
        }
    })

    const [state, setState] = React.useState({
        title: '',
        email: '',
        description: '',
        photo: ''
    });



    // create bucket storage reference to not yet existing image
    const [image, setImage] = React.useState(null);
    const [testingimg, setTestingImage] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);
    const [transferred, setTransferred] = React.useState(0);

    const viewImage = async () => {
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                //console.log("======= Checking Response =======");
                //console.log(response);
                const source = { uri: response.uri };
                //console.log("====== Checking Response URL ======");
                //console.log(source);

                //console.log("====== Checking Response Path ======");
                // console.log(response.path);

                setImage(source);
                setTestingImage(response.path);
            }
        })

    }
    // Issue Debugged ===> documentation shows content:// to upload firebase storage. However, it supposed to be path.
    // thus, created testingImg to get the path of the file and upload to img.

    // this is firebase api.
    const uploadImage = async () => {

        if (image == null) {
            setState({ ...state, title: '' });
            setState({ ...state, description: '' });
            return alert("Please Submit an image.");
        }

        const { uri } = image;

        const filename = uri.substring(uri.lastIndexOf('/') + 1);

        console.log("Check FILENAME " + filename);

        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        setUploading(true);
        setTransferred(0);
        const task = storage()
            .ref(filename)
            // do not need to call uploadUri, it will get permission error. use path instead.
            .putFile(testingimg);
        // set progress state
        task.on('state_changed', snapshot => {
            setTransferred(
                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
            );
        });
        try {
            await task;
        } catch (e) {
            console.error(e);
        }


        setUploading(false);


        // Alert.alert(
        //     'Photo uploaded!',
        //     'Your photo has been uploaded to Firebase Cloud Storage!'
        // );

        SubmitEverything(filename);

        setImage(null);
        setTestingImage(null);


    };



    const SubmitEverything = async (filename) => {

        console.log("checking filename in submit : " + filename);
        let url2 = '';


        if (state.title === '' && state.description === '') {
            setState({ ...state, title: '' });
            setState({ ...state, description: '' });
            return alert("Please Enter Both Title and Description.");
        } else if (state.title === '') {
            setState({ ...state, title: '' });
            setState({ ...state, description: '' });
            return alert("Please Enter a title.");
        }


        //`test1=${state.title}&test2=${getUser}`
        try {
            const imageref = storage().ref(filename);
            url2 = await imageref.getDownloadURL();

            //console.log(url2);
            let key = database().ref().push().key;

            fetch(`https://memesterapinodejs.herokuapp.com/createpost/${key}/${encodeURIComponent(url2)}/${getUser}/${state.title}/${state.description}`,
                {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                    })
                }).then((response) => response.text())
                .then((responseText) => {
                    alert("Your post has been posted!");
                })
                .catch((error) => {
                    console.error(error);
                });

            /*
            SubmitPost(id, state.title, getUser, state.description, url2)
                .then((result) => {

                    setId(null);
                    // setState({ ...state, title: '' });
                    // setState({ ...state, description: '' });
                    // setState({ ...state, photo: '' });
                    return alert("Your post has been submitted!");
                })
                .catch((error) => {
                    console.log(error)
                })

            setState({ ...state, title: '' });
            setState({ ...state, description: '' });
            */

        } catch (e) {
            console.log(e);
        }


        return setState({ ...state, title: '', description: '' });


    }

    return (
        <ScrollView>

            <View style={styles.imageContainer}>
                {image !== null ? (
                    <Image source={{ uri: image.uri }} style={styles.imageBox} />
                ) : null}
                {uploading ? (
                    <View style={styles.progressBarContainer}>
                        <Progress.Bar progress={transferred} width={300} />
                    </View>
                ) : null}
                <TouchableOpacity style={styles.selectButton} onPress={viewImage}>
                    <Text style={styles.buttonText}>Pick an image</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Title"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setState({ ...state, title: text })}
                value={state.title}
            />

            <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setState({ ...state, description: text })}
                value={state.description}
            />

            <View style={styles.container2}>
                <TouchableOpacity style={styles.submitButton} onPress={uploadImage}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#bbded6'
    },
    container2: {
        marginTop: 30,
        marginBottom: 50,
        marginRight: 20,
        alignItems: 'flex-end'
    },
    selectButton: {
        marginTop: 20,
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: '#8ac6d1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitButton: {
        marginTop: 20,
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: '#8ac6d1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    uploadButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: '#ffb6b9',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    imageContainer: {
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center'
    },
    progressBarContainer: {
        marginTop: 20
    },
    imageBox: {
        width: 300,
        height: 300
    }
});



export default AddScreen;