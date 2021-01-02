import React, {useState, useContext} from 'react';
import { View, Text, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

import styles from './src/styles';
import {AuthContext} from './AuthContext';
import {axios_config, url} from './config';

export default function login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const authContext = useContext(AuthContext);
    
    async function Login() {
        try {
            if(!email || !password){
                setMessage("請填入帳號密碼");
            }
            else{
                const result = await axios.get(url+"Account?filterByFormula=AND%28%7Bacc_email%7D%3D%22"+email+"%22%2C%7Bacc_pw%7D%3D%22"+password+"%22%29",axios_config);//filterByFormula=AND({acc_email}="email",{acc_pw}="password")
                console.log(result);
                if(result.data.records.length==0){
                    setMessage("帳號密碼錯誤");
                }
                else{
                    authContext.setAcc(result.data.records[0].id);
                    console.log("帳密對");                    
                    authContext.setStatus(true);
                }
            }    
        }     
        catch(error){    
            setMessage(error.message);    
        }
    }

    return(
        <View style={styles.container}>
            <TextInput style={[styles.textInput, {width:"70%"}]} placeholder='email' value={email} onChangeText={text=>setEmail(text)}/>
            <TextInput style={[styles.textInput, {width:"70%"}]} placeholder='password' value={password} secureTextEntry={true} onChangeText={text=>setPassword(text)}/>
            <Text>{message}</Text>
            <TouchableOpacity style={[styles.btn, {backgroundColor: '#F2B653'}]} onPress={Login}>
              <Text style={{color: '#fff',}}>登入</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, {backgroundColor: '#262c49'}]} onPress={() => navigation.navigate('register')}>
              <Text style={{color: '#fff',}}>我要註冊</Text>
            </TouchableOpacity>
        </View>
    );
}