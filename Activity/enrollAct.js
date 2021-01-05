import React, {useState, useEffect, useContext} from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, TextInput, ToastAndroid} from 'react-native';
import axios from 'axios';
import {Ionicons, MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';

import styles from '../src/styles';
import {axios_config, url} from '../config';
import {AuthContext} from '../AuthContext';

export default function enrollAct({navigation,route}) {
    const get_url=url+"EnrollAct";
    const [people, setPeople] = useState("");
    const [period, setPeriod] = useState("9:00~12:00");   
    const [message, setMessage] = useState("");
    const [total, setTotal] = useState(0);
    const authContext = useContext(AuthContext);
    const [checked, setChecked] = useState("");

    const data = ["9:00~12:00", "14:00~17:00"];
    async function Enroll() {
        const EnrAct={
            fields:{      
              enr_cusemail: [authContext.signInAcc],
              enr_actname: [route.params.act_name.id],
              enr_people: parseInt(people),
              enr_actperiod: period,             
            }      
        }
        try {
            if(!people || people<=0){
                setMessage("請輸入欄位");
            }
            else{
                console.log(EnrAct);
                const num = await axios.get(url+"Activity?filterByFormula=%7bact_name%7d%3d%22"+route.params.act_name.fields.act_name+"%22", axios_config);
                console.log("已報名 "+num.data.records[0].fields.EnrollNumber);
                if(num.data.records[0].fields.EnrollNumber+parseInt(people)<=num.data.records[0].fields.act_limit){
                    const result = await axios.post(get_url, EnrAct, axios_config);
                    console.log(result);
                    authContext.setChEnroll(true);
                    ToastAndroid.show("報名成功", ToastAndroid.LONG);
                    navigation.navigate("act",{change:false})
                }
                else{
                    ToastAndroid.show("超過報名人數", ToastAndroid.LONG);
                }               
            }
        }     
        catch(error){    
            setMessage(error.message);    
        }
    }

    return (
        <View style={styles.container}  >
            <View style={styles.detailText} >
            <Text>{route.params.act_name.fields.act_name}</Text>
            <TextInput style={[styles.textInput,]} placeholder='人數' keyboardType="number-pad" value={people} onChangeText={text=> {setPeople(text); setTotal(route.params.act_name.fields.act_price*text)}}/>
            <Text>{route.params.act_name.fields.act_date}</Text>
            <Text>請選擇以下活動時段</Text>
            {data.map((data, key) => {
                return (
                <View key={data}>
                {checked == key ? (
                    <TouchableOpacity onPress={() => {setChecked(key);  setPeriod(data)}}style={{flexDirection: 'row', alignItems: 'center'}}>
                    <AntDesign name="check" size={20} color="black" />
                    <Text>{data}</Text>
                    </TouchableOpacity>                
                ) : (
                    <TouchableOpacity onPress={() => {setChecked(key); setPeriod(data)}} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <AntDesign name="check" size={20} color="#f2f2f2" />
                    <Text>{data}</Text>
                    </TouchableOpacity>
                )
                }            
                </View>
                );
            })}      
            
            <Text>總金額：$ {total}</Text>
            <Text>{message}</Text>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity style={[styles.btn, {backgroundColor: '#F2B653'}]} 
              onPress={Enroll}>
                <Text style={{color: '#fff',}}>確定報名</Text>
              </TouchableOpacity>
            </View>
            </View>
        </View>        
    );  
}