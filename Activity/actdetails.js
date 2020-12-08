import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, Button, } from 'react-native';
import axios from 'axios';

import styles from '../src/styles';
import {axios_config, url} from '../config';

export default function details({navigation,route}) {
    return(
      <View style={styles.container}>
        <Image style={[styles.logo, {alignItems: 'center', justifyContent: 'center',}]} source={require('../src/logo.png')} />
        {/* <Text style={styles.itemTitle}>{route.params.act_name}</Text> */}
        <Text style={styles.itemContent}>人數：0/{route.params.act_limit}</Text>
        <Text style={styles.itemContent}>日期：{route.params.act_date}</Text>
        <Text style={styles.itemContent}>價格：${route.params.act_price}/人</Text>
        <Text style={styles.itemContent}>內容：{route.params.act_content}</Text>
        <Button title="報名"/>
        {/* <Button onPress={() => navigation.navigate('act')} title="返回"/> */}
      </View>
    )
}