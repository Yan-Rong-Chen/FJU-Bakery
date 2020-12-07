import React, {useState, useContext} from 'react';
import { View, Text, Image, Button, TextInput } from 'react-native';

import styles from './src/styles';

export default function login({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    function Login() {

    }

    return(
        <View style={styles.container}>
            <TextInput style={[styles.textInput, {width:"70%"}]} placeholder='email' value={email} />
            <TextInput style={[styles.textInput, {width:"70%"}]} placeholder='password' value={password} secureTextEntry={true} />
            <Button title="登入" onPress={Login} />
            <Text onPress={() => navigation.navigate('register')}>我要註冊</Text>
        </View>
    );
}