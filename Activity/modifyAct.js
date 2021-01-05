import React, {useState, useEffect, useContext} from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, TextInput, ToastAndroid} from 'react-native';
import axios from 'axios';
import {Ionicons, MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';

import styles from '../src/styles';
import {axios_config, url} from '../config';
import {AuthContext} from '../AuthContext';

export default function modifyAct({navigation,route}) {
    const get_url=url+"EnrollAct/"+route.params.act_data.id;
    const [people, setPeople] = useState(route.params.act_data.fields.enr_people.toString());
    const [period, setPeriod] = useState(route.params.act_data.fields.enr_actperiod);   
    const [message, setMessage] = useState("");
    const [total, setTotal] = useState(route.params.act_data.fields.enr_price);
    const authContext = useContext(AuthContext);
    var k=0;
    if(route.params.act_data.fields.enr_actperiod=="14:00~17:00"){
        k = 1;
    }
    const [checked, setChecked] = useState(k);

    const data = ["9:00~12:00", "14:00~17:00"];
    async function Modify() {
        const EditAct={
            fields:{      
              enr_people: parseInt(people),
              enr_actperiod: period,             
            }      
        }
        try {
            if(!people || people<=0){
                setMessage("請輸入欄位");
            }
            else{
                const num = await axios.get(url+"Activity?filterByFormula=%7bact_name%7d%3d%22"+route.params.act_data.fields.act_name+"%22", axios_config);
                if(num.data.records[0].fields.EnrollNumber+parseInt(people)<=num.data.records[0].fields.act_limit){
                    const result = await axios.patch(get_url, EditAct, axios_config);
                    console.log(result);
                    authContext.setChEnroll(true);
                    ToastAndroid.show("修改成功", ToastAndroid.LONG);
                    navigation.navigate("myActDetails", {act_data:result.data, id:result.data.id})
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
            <Text>{route.params.act_data.fields.act_name}</Text>
            <TextInput style={[styles.textInput,]} placeholder='人數' keyboardType="number-pad" defaultValue={people} value={people} onChangeText={text=> {setPeople(text); setTotal(route.params.act_data.fields.act_price*text)}}/>
            <Text>{route.params.act_data.fields.act_date}</Text>
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
              onPress={Modify}>
                <Text style={{color: '#fff',}}>確定修改</Text>
              </TouchableOpacity>
            </View>
            </View>
        </View>        
    );  
}