import * as React from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';



const profileDetails = ({navigation}) => {

    const user = auth().currentUser;

    const [getName, setName] = React.useState('');
    const [getPhone, setPhone] = React.useState('');

    const [image, setImage] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);
    const [transferred, setTransferred] = React.useState(0);
    const [testingimg, setTestingImage] = React.useState(null);

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
                console.log("====== Checking Response URL ======");
                console.log(source);

                console.log("====== Checking Response Path ======");
                console.log(response.path);

                setImage(source);
                setTestingImage(response.path);
            }
        })

    }

    const uploadImage = async () => {

        if(image == null){
            return alert("Please submit an image");
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

        if(getName === ''){
            return alert("Please enter your name");
        }

        try {
            const imageref = storage().ref(filename);
            url2 = await imageref.getDownloadURL();

            console.log("checking url2 : " + url2);
            console.log("checking name : " + getName);
            //console.log("checking for phone number : " + getPhone);
            console.log("checking if correct user : " + JSON.stringify(user));


            user.updateProfile({
                displayName: getName,
                photoURL: url2, 
            }).then(() => {
                alert("Profile Done!");
                navigation.navigate('AllinOne');

            }).catch((error) => {
                console.log(error);
            });


        } catch (e) {
            console.log(e);
        }


    }



    return (
        <ScrollView>

            <View style={styles.imageContainer}>
                <Text></Text>
                {image !== null ? (
                    <Image source={{ uri: image.uri }} style={styles.imageBox} />
                ) : null}
                {uploading ? (
                    <View style={styles.progressBarContainer}>
                        <Progress.Bar progress={transferred} width={300} />
                    </View>
                ) : null}
                <TouchableOpacity style={styles.selectButton} onPress={viewImage} >
                    <Text style={styles.buttonText}>Pick image</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView behavior='position' style={{ flex: 1 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Please enter your name"
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setName(text)}
                    value={getName}
                //value={state.title}
                />
                </KeyboardAvoidingView>
                {/* <TextInput
                    style={styles.input}
                    placeholder="Please enter your phone number"
                    keyboardType='number-pad'
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setPhone(text)}
                    value={getPhone}
                    maxLength={8}
                //value={state.title}
                /> */}
            

            <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.selectButton} onPress={uploadImage} >
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
    selectButton: {
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


export default profileDetails;