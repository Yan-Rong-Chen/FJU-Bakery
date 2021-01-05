import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TextInput, Alert, ToastAndroid, ActivityIndicator, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';

import styles from '../src/styles';
import {axios_config, url} from '../config';
import {ProductContext} from './productContext';
import PlaceOrder from './placeOrder';

export default function Cart({navigation}) {
  const [loading, setLoading] = useState(true);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [numOfProd, setNumOfProd] = useState(null);
  let total = 0;
  const [cartTot, setCartTot] = useState(total);
  const get_url = url + "Order?view=選購中";
  const proContext = useContext(ProductContext);

  // 改變商品數量
  async function updateCart(num, id) {
    console.log("update");
    const update_url = url + "Order/" + id;
    num = parseInt(num);

    // 若為零，則出現alert問是否移除商品
    if (num == 0) {
        removeAlert(id);
    } else {
      console.log("num: " + num);
      const updateNum = {fields: {ord_number: num}};
      const result = await axios.patch(update_url, updateNum, axios_config);
      setNumOfProd(num);
      console.log("update: " + result.data.fields.ord_number);
    }
  }

  async function deleteCart(id) {
    const delete_url = url + "Order/" + id;
    const result = await axios.delete(delete_url, axios_config);
    if( result.data.deleted ) {
      console.log("已移除");
      ToastAndroid.show("已移除", ToastAndroid.LONG);
      setIsDataChanged(!isDataChanged);
    }
  }
  
  function removeAlert(id) {
    console.log("alert");
    Alert.alert(
      "", //title
      "你確定要移除嗎", //message
      //button
      [ { text: "否", onPress: () => setNumOfProd(numOfProd) }, 
        { text: "確定", onPress: () => deleteCart(id) }
      ]
    );
  }

  async function fetchCartData () {
    try {
      const result = await axios.get(get_url, axios_config);
      setCartData(result.data.records);
      setLoading(false);
      for (const i in result.data.records) { //setState會有時間差，不能用cartData，要用result.data.records
        total += result.data.records[i].fields.ord_total;
      }
      setCartTot(total);
      // console.log("fetchCartData: " + cartData[0].fields.ord_number);
      proContext.setProducts(result.data.records);
    } catch(e) {
        console.log("error: " + e);
    }
  }

  function validateInputs(num, id) {
    console.log("validateInputs: " + num);
    let numreg = /^[+-]?\d+$/; //整數
    if (numreg.test(num) && parseInt(num) >= 0) {
      console.log("1numOfProd: ", num);
      updateCart(num, id);
    } else {
      console.log("2numOfProd: ", numOfProd);
      ToastAndroid.show("請輸入正整數", ToastAndroid.LONG);
    } 
  }

  useEffect(() => {
    fetchCartData();
  },[isDataChanged, numOfProd]); // 當 isDataChanged 或 numOfProd 改變時，執行fetchCartData()

  const renderItem = ({ item, index}) => {
    return (
      <View style={styles.items}>
        {/* only set onPress function to image  */}
        <TouchableOpacity 
          onPress = {() => {
            proContext.setSelectedProdIndex(index),
            proContext.setProductFromWhere(1),
            // console.log("cart:"+proContext.products[0]),
            // console.log(proContext.selectedProdIndex),
            // console.log(index),
            navigation.navigate('menu',{screen: 'Detail'})
          }} 
          style={styles.itemImage} 
        >
          <Image style={styles.itemImage} source={{ uri: item.fields.pro_pic[0].url }} />
        </TouchableOpacity>  
        <View style={styles.itemsText} >
          <Text style={styles.itemTitle}>{item.fields.pro_name[0]}</Text>
          
          {/* 商品數量輸入和按鈕 */}
          <View style={styles.cartPrice}>
            <Text style={styles.itemContent}>${item.fields.pro_price[0]} × </Text>
            <TouchableOpacity 
              style={styles.cartPriceLeft}
              onPress={() => {updateCart(item.fields.ord_number-1, item.id)}}
            >
              <Text style={styles.cartPriceLeftRightText}>–</Text>
            </TouchableOpacity>
            <TextInput 
              style={styles.cartTextInput} 
              keyboardType='number-pad'
              textAlign='center'
              defaultValue={item.fields.ord_number.toString()} 
              onEndEditing={(num) => {validateInputs(num.nativeEvent.text, item.id)}} //num是一object
              maxLength={10}
            />
            <TouchableOpacity 
              style={styles.cartPriceRight}
              onPress={() => {updateCart(item.fields.ord_number+1, item.id)}}
            >
              <Text style={styles.cartPriceLeftRightText}>＋</Text>
            </TouchableOpacity>
          </View>
          
          {/* 移除商品(垃圾桶) */}
          <Feather name="trash-2" size={20} color="#DCDCDC" style={{width: 20}} onPress={() => {removeAlert(item.id)}} />
          {/* <Text style={styles.itemContent}>${item.fields.ord_total}</Text> */}
        </View>
        
        
      </View>
    )
  };

  function CartHome() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {loading &&
        <ActivityIndicator color="#F2B653" size="large" animating={loading} />
        }
        {!loading &&
          <FlatList 
              data={cartData} 
              renderItem = {renderItem}
              keyExtractor={(item, index) => ""+index}
              onRefresh={()=>{setIsDataChanged(!isDataChanged)}} //pull to refresh --function
              refreshing={loading} //pull to refresh --boolean
          >
          </FlatList>
        }
        <View style={styles.placeOrder}>
          <Text style={styles.cartTotal} >小結：${cartTot}</Text>
          <TouchableOpacity 
              style={styles.placeOrderBtn}
              onPress={() => navigation.navigate('PlaceOrder', {productTot: cartTot })}
          >
              <Text style={{color: '#696969'}} >去結帳</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const CartStack = createStackNavigator();

  return (
    <CartStack.Navigator>
      <CartStack.Screen name="CartHome" component={CartHome} options={{headerShown:false}} />
      <CartStack.Screen name="PlaceOrder" component={PlaceOrder} 
        options={{
          title: null ,
          headerTransparent: true, 
          headerLeftContainerStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0.3)', 
            marginLeft: 10, 
            marginTop: 5,
            borderRadius: 100
          },
          headerTintColor: '#F2B653'
        }} 
      />
    </CartStack.Navigator>
  );

}