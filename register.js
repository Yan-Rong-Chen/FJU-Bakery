import React, {useState, useContext} from 'react';
import { View, Text, Image, Button, TextInput } from 'react-native';

import styles from './src/styles';

export default function register({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();

    function Register() {

    }

    return(
        <View style={styles.container}>
            <TextInput style={[styles.textInput, {width:"70%"}]} placeholder='email' value={email} />
            <TextInput style={[styles.textInput, {width:"70%"}]} placeholder='password' value={password} secureTextEntry={true} />
            <TextInput style={[styles.textInput, {width:"70%"}]} placeholder='name' value={name} />
            <Button title="註冊" onPress={Register} />
            <Text onPress={() => navigation.navigate('login')}>我要登入</Text>
        </View>
    );
}