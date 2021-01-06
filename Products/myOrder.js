
import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import {axios_config, url} from '../config';

import styles from '../src/styles';
import {AuthContext} from '../AuthContext';

export default function MyOrder() {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [ordertData, setOrderData] = useState([]);
  let total = 0;
  const [orderTot, setOrderTot] = useState(total);
  const [isDataChanged, setIsDataChanged] = useState(false);

  async function fetchOrderData () {
    const get_url = url + "Order?view=等待出貨&filterByFormula=SEARCH(%22"+authContext.signInAcc+"%22%2C+acc_email)";
    try {
      const result = await axios.get(get_url, axios_config);
      setOrderData(result.data.records);
      setLoading(false);
      for (const i in result.data.records) { //setState會有時間差，不能用cartData，要用result.data.records
        total += result.data.records[i].fields.ord_total;
      }
      setOrderTot(total);
      // console.log("fetchCartData: " + cartData[0].fields.ord_number);
    } catch(e) {
        console.log("error: " + e);
    }
  }

  useEffect(() => {
    fetchOrderData();
  },[]); 

  const renderItem = ({ item, index}) => {
    return (
      <View style={styles.itemGroup}>
        <View style={[styles.items, {borderBottomColor:'#696969', marginTop: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0}]}>
          <TouchableOpacity 
            // onPress = {() => {
            //   navigation.navigate('menu',{screen: 'Detail'})
            // }} 
            style={styles.itemImage} 
          >
            <Image style={[styles.itemImage, { borderBottomLeftRadius: 0}]} source={{ uri: item.fields.pro_pic[0].url }} />
          </TouchableOpacity>  
          <View style={styles.itemsText} >
            <Text style={styles.itemTitle}>{item.fields.pro_name[0]}</Text>
            <Text style={styles.itemContent}>${item.fields.pro_price}/個</Text>
          </View>
        </View>
        <Text style={{textAlign: 'right'}}>商品狀態：{ordertData[index].fields.ord_state}</Text>
      </View>
    )
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
      {loading &&
        <ActivityIndicator color="#F2B653" size="large" animating={loading} />
      }
      {!loading &&
        <FlatList 
          data={ordertData} 
          renderItem = {renderItem}
          keyExtractor={(item, index) => ""+index}
          onRefresh={()=>{setIsDataChanged(!isDataChanged)}} //pull to refresh --function
          refreshing={loading} //pull to refresh --boolean
        >
        </FlatList>
      } 
    </View> 
  );

}