import React from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const SignUpUser = (email,password) => {
    return new Promise(function(resolve,reject){
        auth()
        .createUserWithEmailAndPassword(email,password)
        .then(() => {
            resolve('Sign up Successfully');
        }).catch((error)=>{
            reject(error);
        })
    })
}

export const SigninUser = (email,password) => {
    return new Promise(function(resolve,reject){
        auth()
        .signInWithEmailAndPassword(email,password)
        .then(() => {
            resolve('Sign in Successfully');
        }).catch((error)=>{
            reject(error);
        })
    })
}

export const SignOutUser = () => {
    return new Promise(function(resolve,reject){
        auth()
        .signOut()
        .then(() => {
            resolve('Sign out Successfully');
        }).catch((error)=>{
            reject(error);
        })
    })
}

export const SubmitPost = (id,title, email, description, photo) => {
    return new Promise(function(resolve,reject){
        let key;
        if(id != null){
            key = id;
        }else{
            key=database().ref().push().key;
        }

        let dataToSave = {
            id : key,
            title : title,
            email : email,
            description : description,
            photo : photo
        };

        database()
            .ref('users/' + key )
            .update(dataToSave)
            .then(snapshot => {
                resolve(snapshot);
            })
            .catch( err => {
                reject(err);
            })
    })
}



