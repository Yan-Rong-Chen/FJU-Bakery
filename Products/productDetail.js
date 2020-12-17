import React, {useState, useContext} from 'react';
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../src/styles';
import {ProductContext} from './productContext';

export default function productDetail() {
  const proContext = useContext(ProductContext);
  const selectedP = proContext.products[proContext.selectedProdIndex].fields;
  var height = Dimensions.get('window').height;
  return (
    <View style={{flex: 1}} >
      <ScrollView style={{flex: 1, height: height}} contentContainerStyle={styles.detailContainer}>
        <Image 
          style={styles.detailImage} 
          source={{ uri: selectedP.pro_pic[0].url }} 
        />
        <View style={styles.detailText} >
            <Text style={styles.itemTitle}>{selectedP.pro_name}</Text>
            <Text style={styles.detailPrice}>${selectedP.pro_price}</Text>
            <Text style={styles.detailDesc}>商品描述：</Text>
            <Text style={styles.detailDesc}>{selectedP.pro_desc}{"\n"}</Text>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity style={[styles.btn, {backgroundColor: '#F2B653'}]}>
              <Text style={{color: '#fff',}}>加入購物車</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, {backgroundColor: '#262c49'}]}>
              <Text style={{color: '#fff',}}>立即購買</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View> 
  );

}