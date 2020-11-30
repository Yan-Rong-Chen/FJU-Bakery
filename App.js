//npm install @react-navigation/native
//expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
//npm install @react-navigation/bottom-tabs

import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {Ionicons, MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';

import Menu from './Products/menu';
import Activity from './Activity/activity';
import Cart from './Products/cart';
import styles from './src/styles';

function Home() {
    return ( 
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./src/logo.png')} />
        <View >{/* 店家資訊 */}
          <Text>地址：</Text>
          <Text>電話：</Text>
          <Text>營業時間：</Text> 
          <Text>介紹：</Text>
        </View>

      </View> 
    );  
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#F2B653' },title: 'FJU Bakery' }}>
        <Stack.Screen name="Index" component={Index} />
        {/* <Stack.Screen name="Detail" component={detailStack} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Index() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === '首頁') {
              iconName = focused ? 'home' : 'home';
              return <AntDesign name={iconName} size={size} color={color} />             
            } else if (route.name === '菜單') {
              iconName = focused ? 'bread-slice-outline' : 'bread-slice-outline';             
              return <MaterialCommunityIcons name={iconName} size={size} color={color}/>;
            }else if (route.name === '活動') {
              iconName = focused ? 'ios-calendar' : 'ios-calendar';
              return <Ionicons name={iconName} size={size} color={color} />;
            }else {
              iconName = focused ? 'shoppingcart' : 'shoppingcart';
              return <AntDesign name={iconName} size={size} color={color} />;
            }
            // You can return any component that you like here!
            // return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#F2B653',
          inactiveTintColor: 'gray',
        }}>
          <Tab.Screen name="首頁" component={Home} />
          <Tab.Screen name="菜單" component={Menu} />
          <Tab.Screen name="活動" component={Activity} />
          <Tab.Screen name="購物車" component={Cart} />
        </Tab.Navigator>
  
    ); 
}