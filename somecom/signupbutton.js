import * as React from 'react';
import {View,Text,Button} from 'react-native';

class signupbutton extends React.Component{
    render(){
        return(
            <View>
                <Button title="Sign Up" onPress={ () => {this.props.navigation.navigate('')}}/>
            </View>
        ) 
    }
}