import React, {useState, useEffect, useContext} from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, ToastAndroid} from 'react-native';
import axios from 'axios';

import styles from '../src/styles';
import {axios_config, url} from '../config';
import {AuthContext} from '../AuthContext';

export default function details({navigation,route}) {
  const authContext = useContext(AuthContext);
  var height = Dimensions.get('window').height;

  async function fetchData() {
    if(authContext.isSignedIn){
      const exist = await axios.get(url+"EnrollAct?filterByFormula=AND(%7bacc_id%7d%3d%22"+authContext.signInAcc+"%22%2c%7bact_name%7d%3d%22"+route.params.act_data.fields.act_name+"%22)",axios_config);//filterByFormula=AND({acc_id}="authContext.signInAcc", {act_name}="route.params.act_data.fields.act_name")
      console.log(exist);
      if(exist.data.records.length==0){
        navigation.navigate('enroll',
          {act_name:route.params.act_data}
        )
      }
      else{
        ToastAndroid.show("您已報名", ToastAndroid.LONG);
      }
    }else{
      navigation.navigate('登入')
    }
    
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
            <Text style={styles.detailDesc}>已報名人數：{route.params.act_data.fields.EnrollNumber}/{route.params.act_data.fields.act_limit}</Text>
            <Text style={styles.detailDesc}>日期：{route.params.act_data.fields.act_date}</Text>
            <Text style={styles.detailPrice}>價格：${route.params.act_data.fields.act_price}/人</Text>
            <Text style={styles.detailDesc}>活動內容：{"\n"}{route.params.act_data.fields.act_content}</Text>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
            {
              route.params.act_data.fields.EnrollNumber<route.params.act_data.fields.act_limit?(
                <>
                <TouchableOpacity style={[styles.btn, {backgroundColor: '#F2B653'}]} 
                  // disabled={!authContext.isSignedIn} 
                  onPress={fetchData}>
                  <Text style={{color: '#fff',}}>立即報名</Text>
                </TouchableOpacity>
                </>
              ):(
                <TouchableOpacity style={[styles.btn, {backgroundColor: '#F2B653'}]} 
                  disabled={true} >
                  <Text style={{color: '#fff',}}>報名人數已滿</Text>
                </TouchableOpacity>
              )
            }
            </View>
        </View>
      </ScrollView>
    </View> 
  );
}