import React, {useState, useEffect, useContext} from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions} from 'react-native';
import axios from 'axios';

import styles from '../src/styles';
import {axios_config, url} from '../config';
import {AuthContext} from '../AuthContext';

export default function details({navigation,route}) {
  const authContext = useContext(AuthContext);
  var height = Dimensions.get('window').height;

  return (
    <View style={{flex: 1}} >
      <ScrollView style={{flex: 1, height: height}} contentContainerStyle={styles.detailContainer}>
        <Image 
          style={styles.detailImage} 
          source={{ uri: route.params.act_data.fields.act_pic[0].url }} 
        />
        <View style={styles.detailText} >
            <Text style={styles.itemTitle}>{route.params.act_data.fields.act_name}</Text>
            <Text style={styles.detailDesc}>已報名人數：0/{route.params.act_data.fields.act_limit}</Text>
            <Text style={styles.detailDesc}>日期：{route.params.act_data.fields.act_date}</Text>
            <Text style={styles.detailPrice}>價格：${route.params.act_data.fields.act_price}/人</Text>
            <Text style={styles.detailDesc}>活動內容：{"\n"}{route.params.act_data.fields.act_content}</Text>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity style={[styles.btn, {backgroundColor: '#F2B653'}]} disabled={!authContext.isSignedIn} onPress={() => alert(authContext.signInAcc)}>
                <Text style={{color: '#fff',}}>立即報名</Text>
              </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </View> 
  );
  // return(
  //   <View style={styles.container}>
  //     <Image style={[styles.logo, {alignItems: 'center', justifyContent: 'center',}]} source={{uri:route.params.act_data.fields.act_pic[0].url}} />
  //     {/* <Text style={styles.itemTitle}>{route.params.act_name}</Text> */}
  //     <Text style={styles.itemContent}>人數：0/{route.params.act_data.fields.act_limit}</Text>
  //     <Text style={styles.itemContent}>日期：{route.params.act_data.fields.act_date}</Text>
  //     <Text style={styles.itemContent}>價格：${route.params.act_data.fields.act_price}/人</Text>
  //     <Text style={styles.itemContent}>內容：{route.params.act_data.fields.act_content}</Text>
  //     <Button title="報名" disabled={!authContext.isSignedIn} onPress={() => alert(authContext.signInAcc)}/>
  //     {/* <Button onPress={() => navigation.navigate('act')} title="返回"/> */}
  //   </View>
  // )
}