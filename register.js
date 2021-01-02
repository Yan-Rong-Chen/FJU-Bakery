import React, {useState, useContext} from 'react';
import { View, Text, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

import styles from './src/styles';
import {AuthContext} from './AuthContext';
import {axios_config, url} from './config';

export default function register({ navigation }) {
    const get_url=url+"Account";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const authContext = useContext(AuthContext);

    async function Register() {
        const newAccount={
            fields:{      
              acc_email:email,
              acc_name:name,      
              acc_pw:password,
              acc_auth:"customer",      
            //   acc_cardnum:"",
            //   acc_cardkind:"",
            //   acc_address:""
            }      
        }
        try {
            if(!email || !password || !name){
                setMessage("請輸入欄位");
            }
            else{
                const exist = await axios.get(get_url+"?filterByFormula=%7Bacc_email%7D%3D%22"+email+"%22",axios_config);//filterByFormula={acc_email}="email"
                console.log(exist);
                if(exist.data.records.length==0){
                    const result = await axios.post(get_url,newAccount, axios_config);
                    console.log(result);  
                    authContext.setAcc(result.data.records[0].id);
                    authContext.setStatus(true);
                }
                else{
                    setMessage("帳號已註冊");
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
            <TextInput style={[styles.textInput, {width:"70%"}]} placeholder='name' value={name} onChangeText={text=>setName(text)}/>
            <Text>{message}</Text>
            <TouchableOpacity style={[styles.btn, {backgroundColor: '#F2B653'}]} onPress={Register}>
              <Text style={{color: '#fff',}}>註冊</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, {backgroundColor: '#262c49'}]} onPress={() => navigation.navigate('login')}>
              <Text style={{color: '#fff',}}>我要登入</Text>
            </TouchableOpacity>
        </View>
    );
}