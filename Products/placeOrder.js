import React, {useEffect, useState, useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import axios from 'axios';

import styles from '../src/styles';
import {axios_config, url} from '../config';
import {AuthContext} from '../AuthContext';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function PlaceOrder({navigation, route}) {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [accountData, setAccountData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalName, setModalName] = useState("");
  const [updateData, setUpdateData] = useState("");
  const [selected, setSelected] = useState(-1); //用於卡片種類
  var height = Dimensions.get('window').height;

  async function updateAccount(text, id) {
    console.log("update text: "+text);

    if (validateInputs(text)) {
      console.log("update: true");
      const update_url = url + "Account/" + id;
      let update = {};
      switch (modalName) {
        case "acc_phone":
          update = {fields: {acc_phone: text}};
          break;
        case "acc_address":
          update = {fields: {acc_address: text}};
          break;
        case "acc_cardkind":
          update = {fields: {acc_cardkind: text}};
          break;
        case "acc_cardnum":
          update = {fields: {acc_cardnum: text}};
          break;
        case "acc_cardexpdate":
          update = {fields: {acc_cardexpdate: text}};
          break;
        case "acc_cardsecuritycode":
          update = {fields: {acc_cardsecuritycode: text}};
          break;
        default:null
          break;
      }
        
      const result = await axios.patch(update_url, update, axios_config);
      setIsDataChanged(!isDataChanged);
      console.log("update: " + result.data.fields.acc_cardkind);
      setModalVisible(!modalVisible);
    } else {
      ToastAndroid.show("輸入錯誤!", ToastAndroid.LONG);
    }
  }

  function validateInputs(text) {
    let numreg = "";
    switch (modalName) {
      case "acc_phone":
        numreg = /^09[0-9]{8}$/; //台灣手機號碼
        break;
      case "acc_cardnum":
        numreg = /^\d{16}$/;
        break;
      case "acc_cardexpdate":
        numreg = /^(01|02|03|04|05|06|07|08|09|10|11|12)\/\d{2}$/;
        break;
      case "acc_cardsecuritycode":
        numreg = /^\d{3}$/;
        break;
      default:
        return true;
    }
    return numreg.test(text);
  }

  //手機modal
  function Phone() {
    return (
      <TextInput
        style={[styles.cartTextInput, styles.textInput]} 
        keyboardType='phone-pad'
        placeholder={"手機"}
        defaultValue={accountData.acc_phone} 
        onEndEditing={t => {updateAccount(t.nativeEvent.text, accountData.acc_id)}}
        maxLength={10} />
    )
  }

  //地址modal
  function Address() {
    return (
      <TextInput
        style={[styles.cartTextInput, styles.textInput]} 
        placeholder={"地址"}
        defaultValue={accountData.acc_address}
        onSubmitEditing={(t) =>{updateAccount(t.nativeEvent.text, accountData.acc_id)}} 
        maxLength={40} />
    )
  }

  //卡片種類modal
  function CardKind() {
    //當有初始值時，才set selected，且只執行第一次
    if (selected == -1) {
      switch (accountData.acc_cardkind) {
        case 'VISA':
          setSelected(0);
          break;
        case 'JCB':
          setSelected(1);
          break;
        case 'MASTER CARD':
          setSelected(2);
          break;
        default:
          setSelected(-1);
          break;
      }
    }
    let cardKind = ['VISA', 'JCB', 'MASTER CARD'];
    return(
      <View>
        {cardKind.map((kind, key) => {
          return (
            <View key={kind}>
              {selected == key  ? 
                (<TouchableOpacity style={styles.radioBtn}>
                  <MaterialIcons style={{marginRight: 10}} name="radio-button-checked" size={20} color="#F2B653" />
                  <Text style={[styles.formValue, {color: '#F2B653'}]}>{kind}</Text>
                </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.radioBtn}
                    onPress={() => {
                      setUpdateData(kind),
                      setSelected(key)
                    }}>
                    <MaterialIcons style={{marginRight: 10}} name="radio-button-unchecked" size={20} color="#696969" />
                    <Text style={styles.formValue}>{kind}</Text>
                  </TouchableOpacity>
                )
              }
            </View>
          )
        })}
        <View style={styles.modalBtnView}>
              <Text style={[styles.modalBtnText, {color: '#696969'}]} 
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>取消</Text>
              <Text style={styles.modalBtnText} 
                onPress={() => {
                  updateAccount(updateData, accountData.acc_id)
                  
                }}>修改</Text>
            </View>
      </View>
      
    )
  }

  //卡片號碼modal
  function CardNum() {
    return (
      <TextInput
        style={[styles.cartTextInput, styles.textInput]} 
        keyboardType='number-pad'
        placeholder={"信用卡號碼(16碼)"}
        defaultValue={accountData.acc_cardnum} 
        onSubmitEditing={(t) => {updateAccount(t.nativeEvent.text, accountData.acc_id)}} //t是一object
        maxLength={16} />
    )
  }

  //到期日modal
  function CardExpoDate() {
    return (
      <TextInput
        style={[styles.cartTextInput, styles.textInput]} 
        placeholder={"到期日(例如:09/27)"}
        defaultValue={accountData.acc_cardexpdate} 
        onSubmitEditing={(t) => {updateAccount(t.nativeEvent.text, accountData.acc_id)}} //t是一object
        maxLength={7} />
    )
  }

  //安全碼modal
  function CardSCode() {
    return (
      <TextInput
        style={[styles.cartTextInput, styles.textInput]} 
        placeholder={"安全碼"}
        defaultValue={accountData.acc_cardsecuritycode} 
        onSubmitEditing={(t) => {updateAccount(t.nativeEvent.text, accountData.acc_id)}} //t是一object
        maxLength={3} />
    )
  }

  function ModalView() {
    switch (modalName) {
      case "acc_phone":
        return Phone();
      case "acc_address":
        return Address();
      case "acc_cardkind":
        return CardKind();
      case "acc_cardnum":
        return CardNum();
      case "acc_cardexpdate":
        return CardExpoDate();
      case "acc_cardsecuritycode":
        return CardSCode();
      default:
        return null;
    }
  }
  async function fetchAccountData () {
    const get_url = url + "Account?view=Grid%20view&filterByFormula=SEARCH(%22"+authContext.signInAcc+"%22%2C+acc_id)";
    try {
        const result = await axios.get(get_url, axios_config);
        setAccountData(result.data.records[0].fields);
        setLoading(false);
    } catch(e) {
        console.log("error: " + e);
    }
  }

  async function comfirmOrder(productData) {
    let update_url = "";
    let update = "";
    for (let i in productData) {
      
      update_url = url + "Order/"+ productData[i].id;
      update = {fields: {ord_state: "等待出貨"}}
    
      try {
        const result = await axios.patch(update_url, update, axios_config);
        console.log("comfirm: " + result.data.fields.ord_state);
      } catch(e) {
          console.log("error: " + e);
      }
    }
  }

  useEffect(() => {
    fetchAccountData();
  },[isDataChanged]);

  return (
    <View style={{flex: 1}}>
      {/* {loading &&
        <ActivityIndicator color="#F2B653" size="large" animating={loading} />
      }
      {!loading && */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
        <View style={[styles.container, styles.modalView]}>
          <View style={styles.modal}>
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <MaterialIcons style={{textAlign: 'right'}} name="close" size={24} color="#696969" />
          </TouchableOpacity>
            <ModalView />
            
          </View>
        </View>
      </Modal>
      
      <ScrollView style={{flex: 1, height: height}} contentContainerStyle={styles.detailContainer}>
        <View style={[styles.formGroup, styles.formView]}>
          <Text style={{color: '#696969'}}>請輸入以下資訊</Text>
        </View>

        <View style={styles.formGroup}>
          <TouchableOpacity
            style={styles.formView}
            onPress={() => {
              setModalVisible(true),
              setModalName("acc_phone")
            }}>
            <Text style={styles.formLabel}>手機</Text>
            <Text style={styles.formValue}>
              {(accountData.acc_phone !== undefined ? accountData.acc_phone: "請輸入...")+' 〉'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.formView}
            onPress={() => {
              setModalVisible(true),
              setModalName("acc_address")
            }}>
            <Text style={styles.formLabel}>地址</Text>
            <Text style={styles.formValue}>
              {(accountData.acc_address !== undefined ? accountData.acc_address: "請輸入...")+' 〉'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.formGroup}>
          <TouchableOpacity
            style={styles.formView}
            onPress={() => {
              setModalVisible(true),
              setModalName("acc_cardkind")
            }}>
            <Text style={styles.formLabel}>卡片種類</Text>
            <Text style={styles.formValue}>
              {(accountData.acc_cardkind !== undefined ? accountData.acc_cardkind: "請輸入...")+' 〉'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.formView}
            onPress={() => {
              setModalVisible(true),
              setModalName("acc_cardnum")
            }}>
            <Text style={styles.formLabel}>信用卡號</Text>
            <Text style={styles.formValue}>
              {(accountData.acc_cardnum !== undefined ? accountData.acc_cardnum: "請輸入...")+' 〉'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.formView}
            onPress={() => {
              setModalVisible(true),
              setModalName("acc_cardexpdate")
            }}>
            <Text style={styles.formLabel}>到期日</Text>
            <Text style={styles.formValue}>
              {(accountData.acc_cardexpdate !== undefined ? accountData.acc_cardexpdate: "請輸入...")+' 〉'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.formView}
            onPress={() => {
              setModalVisible(true),
              setModalName("acc_cardsecuritycode")
            }}>
            <Text style={styles.formLabel}>安全碼</Text>
            <Text style={styles.formValue}>
              {(accountData.acc_cardsecuritycode !== undefined ? accountData.acc_cardsecuritycode: "請輸入...")+' 〉'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.placeOrder, {width: '100%', marginHorizontal: 0}]}>
          <Text style={styles.cartTotal} >總付款金額：${route.params.productTot}</Text>
          <TouchableOpacity 
              style={styles.placeOrderBtn}
              onPress={() => {
                comfirmOrder(route.params.productData),
                navigation.navigate('我的訂單')}}
          >
              <Text style={{color: '#696969'}} >確認</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* } */}
    </View>
  );

}