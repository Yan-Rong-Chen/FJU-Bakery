import React, {useState, useEffect, useContext} from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, Alert, ToastAndroid} from 'react-native';
import axios from 'axios';

import styles from '../src/styles';
import {axios_config, url} from '../config';
import {AuthContext} from '../AuthContext';

export default function myActDetails({navigation,route}) {
  const authContext = useContext(AuthContext);
  var height = Dimensions.get('window').height;

  async function deleteData(id) {
    const del = await axios.delete(url+"EnrollAct/"+id,axios_config);
    console.log("已刪除");
    ToastAndroid.show("已刪除", ToastAndroid.LONG);
    authContext.setChEnroll(true);
    navigation.navigate("myAct")
  }
  
  function delConfirm(id) {
    Alert.alert(
      "", //title
      "你確定要移除嗎", //message
      //button
      [ { text: "否" }, 
        { text: "確定", onPress: () => deleteData(id) }
      ]
    );
  }
  
  return (
    <View style={{flex: 1}} >
      <ScrollView style={{flex: 1, height: height}} contentContainerStyle={styles.detailContainer}>
        <Image 
          style={styles.detailImage} 
          source={{ uri: route.params.act_data.fields.act_pic[0].url }} 
        />
        <View style={styles.detailText} >
            <Text style={styles.itemTitle}>{route.params.act_data.fields.act_name}</Text>
            <Text style={styles.detailDesc}>報名人數：{route.params.act_data.fields.enr_people}</Text>
            <Text style={styles.detailDesc}>活動時間：{route.params.act_data.fields.act_date[0]} {route.params.act_data.fields.enr_actperiod}</Text>
            <Text style={styles.detailPrice}>總金額：${route.params.act_data.fields.enr_price}</Text>
            <Text style={styles.detailDesc}>活動內容：{"\n"}{route.params.act_data.fields.act_content[0]}</Text>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>           
            <TouchableOpacity style={[styles.btn, {backgroundColor: '#F2B653'}]} 
              onPress={() => delConfirm(route.params.id)}>
                <Text style={{color: '#fff',}}>取消報名</Text>
            </TouchableOpacity>           
            <TouchableOpacity style={[styles.btn, {backgroundColor: '#262c49'}]} 
              onPress={() => navigation.navigate("editAct",{act_data:route.params.act_data})}>
                <Text style={{color: '#fff',}}>修改報名</Text>
            </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </View> 
  );
}