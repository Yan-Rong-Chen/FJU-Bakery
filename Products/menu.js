// npm install @react-navigation/material-top-tabs react-native-tab-view
// npm install @react-navigation/stack
//expo install axios

import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';

import styles from '../src/styles';
import productDetail from './productDetail';
import {axios_config, url} from '../config';
import {ProductContext} from './productContext';

const TopTab = createMaterialTopTabNavigator();
const MenuStack = createStackNavigator();

function MenuTopTab() {
  return (
    <TopTab.Navigator
      tabBarOptions={{
        activeTintColor: '#F2B653',
        inactiveTintColor: 'gray',
        indicatorStyle: {backgroundColor: '#F2B653'},
      }}
    >
      <TopTab.Screen name="全部" component={AllScreen} />
      <TopTab.Screen name="蛋糕" component={CakeScreen} />
    </TopTab.Navigator>
  )
}

function AllScreen({ navigation }) {
  const get_url = url + "Products?maxRecords=50&view=All";
  const proContext = useContext(ProductContext);
  const [loading, setLoading] = useState(true);
  
  async function fetchProductsData () {
    try {
        const result = await axios.get(get_url, axios_config);
        proContext.setProducts(result.data.records);
        setLoading(false);
        // console.log("menu:"+proContext.products[0].fields.pro_name);
    } catch(e) {
        console.log("error: " + e);
    }
  }

  useEffect(() => {
      fetchProductsData();
  },[]);

  const renderItem = ({ item, index}) => {
    return (
        <TouchableOpacity 
          onPress = {() => {
            proContext.setSelectedProdIndex(index),
            proContext.setProductFromWhere(0),
            console.log("menu:"+proContext.products[0]),
            console.log(proContext.selectedProdIndex),
            navigation.navigate('Detail')
          }} 
          style={styles.items}>
          <Image style={styles.itemImage} source={{ uri: item.fields.pro_pic[0].url }} />
          <View style={styles.itemsText} >
            <Text style={styles.itemTitle}>{item.fields.pro_name}</Text>
            <Text style={styles.itemContent}>${item.fields.pro_price}/個</Text>
          </View>
        </TouchableOpacity>
    )
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading &&
        <ActivityIndicator color="#F2B653" size="large" animating={loading} />
      }
      {!loading &&
        <FlatList 
            data={proContext.products} 
            renderItem = {renderItem}
            keyExtractor={(item, index) => ""+index}
            onRefresh={()=>{fetchProductsData()}} //pull to refresh --function
            refreshing={loading} //pull to refresh --boolean
        >
        </FlatList>
      }
    </View>
  );
}

function CakeScreen() {
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>CakeScreen</Text>
    </View>
  );
}

export default function Menu() {
  return (
      <MenuStack.Navigator>
        <MenuStack.Screen name="Home" component={MenuTopTab} options={{headerShown:false}} />
        <MenuStack.Screen name="Detail" component={productDetail} 
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
      </MenuStack.Navigator>
  );

}