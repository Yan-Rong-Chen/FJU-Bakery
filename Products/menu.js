// npm install @react-navigation/material-top-tabs react-native-tab-view
// npm install @react-navigation/stack

import React, {useState} from 'react';
import { View, Text, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import styles from '../src/styles';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

export default function Menu() {
  return (
    <TopTab.Navigator
      tabBarOptions={{
        activeTintColor: '#F2B653',
        inactiveTintColor: 'gray',
        indicatorStyle: {backgroundColor: '#F2B653'},
        style: {  },
      }}
    >
      <TopTab.Screen name="全部" component={AllScreen} />
      <TopTab.Screen name="蛋糕" component={CakeScreen} />
    </TopTab.Navigator>
  )
}

function detailStack() {
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>CakeScreen</Text>
    </View>
  );
}

function AllScreen() {
  const data =[
    {name:"巧克力蛋糕", price:380},
    {name:"戚風蛋糕", price:390},
    {name:"蘋果派", price:290},
  ]
  const [products, setProducts] = useState(data);

  const renderItem = ({ item, index }) => {
    return (
        <TouchableOpacity /*onPress = {()=>setSelected(index)}*/ style={styles.items}>
          <Image style={[styles.logo, {height: '100%', flex: 2,}]} source={require('../src/logo.png')} />
          <View style={styles.itemsText} >
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemContent}>${item.price}/個</Text>
          </View>
        </TouchableOpacity>
    )
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList 
          data={products} 
          renderItem = {renderItem}
          keyExtractor={item => item.name}
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

const TopTab = createMaterialTopTabNavigator();
// const MenuStack = createStackNavigator();

// function MenuStack() {
//   // const [search, setSearch] = useState("");

//   return (
//     // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
//     //     <TextInput style={styles.textInput} 
//     //       placeholder="搜尋商品" 
//     //       value={search} 
//     //       onChangeText={text=>setSearch(text)}
//     //     />
//     <MenuStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#F2B653' },title: 'FJU Bakery' }}>
//       <MenuStack.Screen name="Home" component={menuStack} />
//       <MenuStack.Screen name="Detail" component={detailStack} />
//     </MenuStack.Navigator>
//     // </View> 
//   );

// }