import React, {useState, useEffect, useContext} from 'react';
import { View, Text, TouchableOpacity, Image, Button, } from 'react-native';
import axios from 'axios';

import styles from '../src/styles';
import {axios_config, url} from '../config';
import {AuthContext} from '../AuthContext';

export default function details({navigation,route}) {
    const authContext = useContext(AuthContext);
    return(
      <View style={styles.container}>
        <Image style={[styles.logo, {alignItems: 'center', justifyContent: 'center',}]} source={{uri:route.params.act_data.fields.act_pic[0].url}} />
        {/* <Text style={styles.itemTitle}>{route.params.act_name}</Text> */}
        <Text style={styles.itemContent}>人數：0/{route.params.act_data.fields.act_limit}</Text>
        <Text style={styles.itemContent}>日期：{route.params.act_data.fields.act_date}</Text>
        <Text style={styles.itemContent}>價格：${route.params.act_data.fields.act_price}/人</Text>
        <Text style={styles.itemContent}>內容：{route.params.act_data.fields.act_content}</Text>
        <Button title="報名" disabled={!authContext.isSignedIn} onPress={() => alert(authContext.signInAcc)}/>
        {/* <Button onPress={() => navigation.navigate('act')} title="返回"/> */}
      </View>
    )
}