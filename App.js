import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import styles from './src/styles';
import { AppLoading } from "expo";
import { useFonts, Mansalva_400Regular } from "@expo-google-fonts/mansalva";

export default function App() {
  let [fontsLoaded] = useFonts({
    Mansalva_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.cover}>
          <Image
            style={styles.logo}
            source={require('./src/logo.png')}
          />
        </View>
        <Text style={styles.title}>FJU Bakery</Text>
        <View style={{width:'80%',flex:3, flexDirection: 'column', alignItems: 'stretch'}}>
          <TouchableOpacity style={styles.box}>
            <Text style={styles.text_btn} >預約手作</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box}>
            <Text style={styles.text_btn} >立即購買</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.box, {backgroundColor: '#fff'}]}>
            <Text style={[
              styles.text_btn, 
              {color:'#262C49', textDecorationLine:'underline'}
            ]} >我是店家</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1.2}}/>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}