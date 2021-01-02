//npm install @react-navigation/native
//expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
//npm install @react-navigation/bottom-tabs
//npm install @react-navigation/drawer
//npm install @react-navigation/stack

import React, {useState, useContext} from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Ionicons, MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';
import {ProductContext} from './Products/productContext';

import Menu from './Products/menu';
import Activity from './Activity/activity';
import ActDetails from './Activity/actDetails';
import EnrollAct from './Activity/enrollAct';
import MyActivity from './Activity/myActivity';
import MyActDetails from './Activity/myActDetails';
import Cart from './Products/cart';
import Login from './login';
import Register from './register';
import Logout from './logout';
import Order from './Products/order';
import styles from './src/styles';
import {AuthContext} from './AuthContext';

function Home() {
  return ( 
    <View style={styles.container}> 
      <Image style={styles.logo} source={require('./src/logo.png')} />
      <View style={styles.detailText} >{/* 店家資訊 */}
        <Text style={styles.detailDesc}>地址：新北市新莊區中正路510號</Text>
        <Text style={styles.detailDesc}>電話：02-2716-0138</Text>
        <Text style={styles.detailDesc}>營業時間：周一至周日 14:00~21:00</Text> 
        <Text style={styles.detailDesc}>介紹：{"\n堅持日本進口的上選原料，確保完美和諧的幸福美味；\n執著費時費工的製作過程，帶來無與倫比的輕柔口感。\n蛋糕保存方式\n"+
"「純戚風蛋糕」建議保存方式：取貨當日未食用完畢請放冷藏，能夠再放置冷藏兩天。\n「鮮奶油」類蛋糕建議保存方式：取貨後一個半小時內放回冷藏，能夠放置兩天。"}</Text>
      </View>
    </View> 
  );  
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Loginstack = () => {
  return(
    <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login}/>
      <Stack.Screen name="register" component={Register}/>     
    </Stack.Navigator>
  )
}

const MyAct = () => {
  return(
    <Stack.Navigator initialRouteName="myAct">
      <Stack.Screen name="myAct" component={MyActivity} options={{headerShown: false}} />
      <Stack.Screen name="myActDetails" component={MyActDetails} options={{
        title: null ,
        headerTransparent: true, 
        headerLeftContainerStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.3)', 
          marginLeft: 10, 
          marginTop: 5,
          borderRadius: 100
        },
        headerTintColor: '#F2B653'} } />
    </Stack.Navigator>
  )
}

const ActStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="act" component={Activity} initialParams={{ change: true }} options={{headerShown: false}}/>     
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
      }/*({ route }) => ({ headerTitleAlign: 'center', title: route.params.act_data.fields.act_name })*/}/>   
      <Stack.Screen name="enroll" component={EnrollAct} options={{
        title: null ,
        headerTransparent: true, 
        headerLeftContainerStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.3)', 
          marginLeft: 10, 
          marginTop: 5,
          borderRadius: 100
        },
        headerTintColor: '#F2B653'
      }} />  
    </Stack.Navigator>
  )
}

const drawer = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signInAcc, setAcc] = useState("");
  const [isEnroll, setIsEnroll] = useState(false);
  return(
    <AuthContext.Provider value={{isSignedIn: isSignedIn, setStatus:setIsSignedIn, signInAcc:signInAcc, setAcc:setAcc, isEnroll:isEnroll, setIsEnroll:setIsEnroll}}>
    <Drawer.Navigator initialRouteName="Home" drawerContentOptions={{
      activeTintColor: '#F2B653',
      inactiveTintColor: 'gray',
    }}>
      <Drawer.Screen name="Home" component={tab} />
      {
        signInAcc?(
        <>       
        <Drawer.Screen name="我的活動" component={MyAct} />
        <Drawer.Screen name="我的訂單" component={Order} />
        <Drawer.Screen name="登出" component={Logout}/>
        </>
        )
        :(
        <>
        <Drawer.Screen name="登入" component={Loginstack} />
        </>
        )
      }
    </Drawer.Navigator>
    </AuthContext.Provider>
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
        } else if (route.name === 'menu') {
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
      <Tab.Screen name="menu" component={Menu} options={{title:"菜單"}} />
      <Tab.Screen name="活動" component={ActStack} />
      <Tab.Screen name="cart" component={Cart} options={{title:"購物車"}} />     
    </Tab.Navigator> 
  )
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [selectedProdIndex, setSelectedProdIndex] = useState([]);
  const [productFromWhere, setProductFromWhere] = useState([]);
  return (      
      <NavigationContainer >
        <ProductContext.Provider 
      value={{
        products: products, 
        setProducts: setProducts,
        selectedProdIndex: selectedProdIndex, 
        setSelectedProdIndex: setSelectedProdIndex,
        productFromWhere: productFromWhere,
        setProductFromWhere: setProductFromWhere
      }}>
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
        </ProductContext.Provider>
      </NavigationContainer>  
    ); 
}