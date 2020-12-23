import React, {useState, useContext} from 'react';
import { View, Text, Image, Button, TextInput } from 'react-native';

import styles from './src/styles';
import {AuthContext} from './AuthContext';

export default function logout() {
    const authContext = useContext(AuthContext);
    
    try{
        authContext.setStatus(false);
        authContext.setAcc("");
        console.log('User signed out successfully!');
    }
    catch(error){
        console.log(error.message);
    }   
    
    return(
        <View>
        <Text >signed out</Text>
        </View>
    )
}