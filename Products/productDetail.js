import React, {useState, useContext} from 'react';
import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import styles from '../src/styles';
import {ProductContext} from './productContext';

export default function productDetail() {
  const proContext = useContext(ProductContext);
  const selectedP = proContext.products[proContext.selectedProdIndex].fields;

  return (
    <ScrollView contentContainerStyle={styles.detailContainer} >
        <Image 
          style={styles.detailImage} 
          source={{ uri: selectedP.pro_pic[0].url }} 
        />
        <View style={styles.detailText} >
            <Text style={styles.itemTitle}>{selectedP.pro_name}</Text>
            <Text style={styles.detailPrice}>${selectedP.pro_price}/個</Text>
            <Text style={styles.detailDesc}>商品描述：{"\n"}{selectedP.pro_desc}</Text>
        </View>
    </ScrollView> 
  );

}