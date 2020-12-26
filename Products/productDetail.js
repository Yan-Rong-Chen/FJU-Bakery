import React, {useState, useContext} from 'react';
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../src/styles';
import {ProductContext} from './productContext';

export default function productDetail({navigation}) {
  const proContext = useContext(ProductContext);
  const selectedP = proContext.products[proContext.selectedProdIndex].fields;
  let pro_name = selectedP.pro_name, 
    pro_price = selectedP.pro_price, 
    pro_desc = selectedP.pro_desc;
  var height = Dimensions.get('window').height;

  // productFromWhere 判斷product資料是從哪邊來的，0從menu、1從cart
  if (proContext.productFromWhere == 1) {
    pro_name = selectedP.pro_name[0];
    pro_price = selectedP.pro_price[0];
    pro_desc = selectedP.pro_desc[0];
  }
  
  return (
    <View style={{flex: 1}} >
      <ScrollView style={{flex: 1, height: height}} contentContainerStyle={styles.detailContainer}>
        <Image 
          style={styles.detailImage} 
          source={{ uri: selectedP.pro_pic[0].url }} 
        />
        <View style={styles.detailText} >
            <Text style={styles.itemTitle}>{pro_name}</Text>
            <Text style={styles.detailPrice}>${pro_price}</Text>
            <Text style={styles.detailDesc}>商品描述：</Text>
            <Text style={styles.detailDesc}>{pro_desc}{"\n"}</Text>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity style={[styles.btn, {backgroundColor: '#F2B653'}]}>
              <Text style={{color: '#fff'}}>加入購物車</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.btn, {backgroundColor: '#262c49'}]}
              onPress = {() => {
                // proContext.setProducts({}), 
                // proContext.setSelectedProdIndex({}),
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