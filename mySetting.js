import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Image, Button, TextInput, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import axios from 'axios';

import styles from './src/styles';
import {AuthContext} from './AuthContext';
import {axios_config, url} from './config';

export default function mySetting({ navigation }) {
    const authContext = useContext(AuthContext);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [kind, setKind] = useState("");
    const [num, setNum] = useState("");
    const [expdate, setExpdate] = useState("");
    const [securitycode, setSecuritycode] = useState("");
    const [loading, setLoading] = useState(true);
    data = ["VISA", "JCB", "MASTER CARD"];

    async function fetchData () {
        const result = await axios.get(url+"Account?filterByFormula=%7bacc_id%7d%3d%22"+authContext.signInAcc+"%22",axios_config);//filterByFormula={acc_id}="authContext.signInAcc"
        console.log(result);
        setLoading(false);
    }
    useEffect(() => {
        fetchData();
    },[]);

    return(
        <View style={styles.container}>
            { loading ? (
            <ActivityIndicator color="#F2B653" size="large" animating={loading} />
            ) : (
            <>
            <Text>姓名</Text>
            <TextInput style={[styles.textInput, {width:"70%"}]} placeholder='姓名' value={name}  onChangeText={text=>setName(text)}/>
            <Text>手機</Text>
            <TextInput style={[styles.textInput, {width:"70%"}]} placeholder='手機' value={phone}  onChangeText={text=>setPhone(text)}/>
            <Text>地址</Text>
            <TextInput style={[styles.textInput, {width:"70%"}]} placeholder='地址' autoCapitalize="none" value={address}  onChangeText={text=>setAddress(text)}/>
            <Text>信用卡類別</Text>
            <TextInput style={[styles.textInput, {width:"70%"}]} placeholder='信用卡類別' autoCapitalize="none" value={kind}  onChangeText={text=>setKind(text)}/>
            <Text>16碼卡號</Text>
            <TextInput style={[styles.textInput, {width:"70%"}]} placeholder='16碼卡號' autoCapitalize="none" value={num}  onChangeText={text=>setNum(text)}/>
            <Text>到期</Text>
            <TextInput style={[styles.textInput, {width:"70%"}]} placeholder='到期' autoCapitalize="none" value={expdate}  onChangeText={text=>setExpdate(text)}/>
            <Text>安全碼</Text>
            <TextInput style={[styles.textInput, {width:"70%"}]} placeholder='安全碼' autoCapitalize="none" value={securitycode}  onChangeText={text=>setSecuritycode(text)}/>
            </>
            ) }
            
            
        </View>
    );
}