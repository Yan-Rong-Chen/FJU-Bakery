import React, {useState, useContext} from 'react';
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity, ToastAndroid } from 'react-native';
import axios from 'axios';

import {axios_config, url} from '../config';
import styles from '../src/styles';
import {ProductContext} from './productContext';
import {AuthContext} from '../AuthContext';

export default function productDetail({navigation}) {
  const proContext = useContext(ProductContext);
  const authContext = useContext(AuthContext);
  const selectedP = proContext.products[proContext.selectedProdIndex];
  let pro_name = selectedP.fields.pro_name, 
    pro_price = selectedP.fields.pro_price, 
    pro_desc = selectedP.fields.pro_desc;
  var height = Dimensions.get('window').height;

  // productFromWhere 判斷product資料是從哪邊來的，0從menu、1從cart
  if (proContext.productFromWhere == 1) {
    pro_name = selectedP.fields.pro_name[0];
    pro_price = selectedP.fields.pro_price[0];
    pro_desc = selectedP.fields.pro_desc[0];
  }

  // whichBtn 判斷是按哪個按鈕，0按「加入購物車」、1按「立即購買」
  async function addToCart(whichBtn) {
    console.log("addToCart");

    if (!authContext.signInAcc) {
      ToastAndroid.show("請先登入", ToastAndroid.LONG);
    } else {
      if (selectedP.fields.Order || proContext.productFromWhere == 1) {
        console.log("already addToCart");
        if (whichBtn == 0) {
          console.log("whichBtn: " + whichBtn);
          ToastAndroid.show("已加入購物車", ToastAndroid.LONG);
        } else {
          console.log("whichBtn: " + whichBtn);
          console.log("add to cart");
        }
      } else {
        console.log("not yet addToCart");
        const addToCart_url = url + "Order/";
        const addRecord = {fields: {
          "ord_cusemail": [ "recBWxZtuBRiO4Jey" ], //到時候改cus id
          "ord_pname": [ selectedP.id ],
          "ord_number": 1,
          "ord_state": "選購中"
        }};
        try {
          const result = await axios.post(addToCart_url, addRecord, axios_config);
          if (whichBtn == 0) {
            console.log("whichBtn: " + whichBtn);
            ToastAndroid.show("已加入購物車 " + result.data.fields.pro_name, ToastAndroid.LONG);
          }
        }
        catch (e) {
          console.log("error:"+e);
        }
        
      }
    }
  }
  
  return (
    <View style={{flex: 1}} >
      <ScrollView style={{flex: 1, height: height}} contentContainerStyle={styles.detailContainer}>
        <Image 
          style={styles.detailImage} 
          source={{ uri: selectedP.fields.pro_pic[0].url }} 
        />
        <View style={styles.detailText} >
          <Text style={styles.itemTitle}>{pro_name}</Text>
          <Text style={styles.detailPrice}>${pro_price}</Text>
          <Text style={styles.detailDesc}>商品描述：</Text>
          <Text style={styles.detailDesc}>{pro_desc}{"\n"}</Text>
          <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity 
              style={[styles.btn, {backgroundColor: '#F2B653'}]}
              onPress={() => {
                addToCart(0)
              }}>
              <Text style={{color: '#fff'}}>加入購物車</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.btn, {backgroundColor: '#262c49'}]}
              onPress = {() => {
                // proContext.setProducts({}), 
                // proContext.setSelectedProdIndex({}),
                addToCart(1),
                navigation.navigate('cart')
              }}>
              <Text style={{color: '#fff'}}>立即購買</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View> 
  );

}