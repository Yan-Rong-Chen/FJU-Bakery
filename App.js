//npm install @react-navigation/native
//expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
//npm install @react-navigation/bottom-tabs
//npm install @react-navigation/drawer
//npm install @react-navigation/stack

import * as React from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Ionicons, MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';

import Menu from './Products/menu';
import Activity from './Activity/activity';
import ActDetails from './Activity/actDetails';
import Cart from './Products/cart';
import Login from './login';
import Register from './register';
import Order from './Products/order';
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
const Drawer = createDrawerNavigator();

const Loginstack = () => {
  return(
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login}/>
      <Stack.Screen name="register" component={Register}/>     
    </Stack.Navigator>
  )
}

const ActStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="act" component={Activity} options={{headerShown: false}}/>
      <Stack.Screen name="details" component={ActDetails} options={{
        title: null ,
        headerTransparent: true, 
        headerLeftContainerStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.3)', 
          marginLeft: 10, 
          marginTop: 5,
          borderRadius: 100
        },
        headerTintColor: '#F2B653'
      }/*({ route }) => ({ headerTitleAlign: 'center', title: route.params.act_name })*/}/>     
    </Stack.Navigator>
  )
}

const drawer = () => {
  return(
    <Drawer.Navigator initialRouteName="Home" drawerContentOptions={{
      activeTintColor: '#F2B653',
      inactiveTintColor: 'gray',
    }}>
      <Drawer.Screen name="Home" component={tab} />
      <Drawer.Screen name="登入" component={Loginstack} />
      <Drawer.Screen name="我的訂單" component={Order} />
    </Drawer.Navigator>
  )
}

const tab = () => {
  return(
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
      <Tab.Screen name="活動" component={ActStack} />
      <Tab.Screen name="購物車" component={Cart} />     
    </Tab.Navigator> 
  )
}

export default function App() {
    return (      
      <NavigationContainer >
        <Stack.Navigator screenOptions={({navigation}) => ({ headerStyle: { backgroundColor: '#F2B653'},
        headerTitleAlign: 'center', title: 'FJU Bakery',
        headerLeft: () => (
          <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer()) }>
            <Ionicons name='ios-menu' size={24} color={'black'} />
          </TouchableOpacity>
          ), 
        })}>
          <Stack.Screen name="Index" component={drawer} />
        </Stack.Navigator>
      </NavigationContainer>  
    ); 
}