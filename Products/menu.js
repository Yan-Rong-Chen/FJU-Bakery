// npm install @react-navigation/material-top-tabs react-native-tab-view
// npm install @react-navigation/stack
//expo install axios

import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Image, TextInput, FlatList, TouchableOpacity, } from 'react-native';
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
  
  async function fetchProductsData () {
    try {
        const result = await axios.get(get_url, axios_config);
        proContext.setProducts(result.data.records);
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
            navigation.navigate('Detail'),
            proContext.setSelectedProIndex(index)
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
      <FlatList 
          data={proContext.products} 
          renderItem = {renderItem}
          keyExtractor={(item, index) => ""+index}
      >
      </FlatList>
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
  const [products, setProducts] = useState([]);
  const [selectedProdIndex, setSelectedProIndex] = useState([]);

  return (
    <ProductContext.Provider 
      value={{
        products: products, 
        setProducts: setProducts,
        selectedProdIndex: selectedProdIndex, 
        setSelectedProIndex: setSelectedProIndex
      }}>
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
    </ProductContext.Provider>
  );

}