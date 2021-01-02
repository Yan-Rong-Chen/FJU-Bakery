import React, {useState, useEffect, useContext} from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

import styles from '../src/styles';
import {AuthContext} from '../AuthContext';
import {axios_config, url} from '../config';

export default function MyActivity({ navigation,route }) {
  const get_url=url+"EnrollAct";
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const authContext = useContext(AuthContext);

  const Item = ({ index, item, onPress}) => (   
    <TouchableOpacity onPress={onPress} style={styles.items}>
      <Image style={styles.itemImage} source={{ uri: item.fields.act_pic[0].url }} />
      <View style={styles.itemsText}>
        <Text style={styles.itemTitle}>{item.fields.act_name}</Text>
        <Text style={styles.itemContent}>{item.fields.act_date[0]}</Text>
        <Text style={styles.itemContent}>{item.fields.enr_actperiod}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index}) => {
    return (
      <Item index={index} item={item} 
      onPress={() => navigation.navigate('myActDetails',
      {act_data:activity[index],
      id:item.id, }
      )} 
      />
    )
  };

  async function fetchData () {
    const result = await axios.get(get_url+"?filterByFormula=%7bacc_id%7d%3d%22"+authContext.signInAcc+"%22",axios_config);//filterByFormula={acc_id}="authContext.signInAcc"
    console.log(result);
    setActivity(result.data.records);
    setLoading(false);
    authContext.setIsEnroll(false);
  }

  useEffect(() => {
    fetchData();
  },[authContext.isEnroll]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading &&
       <ActivityIndicator color="#F2B653" size="large" animating={loading} />
      }
      {!loading &&
      <FlatList 
          data={activity} 
          renderItem = {renderItem}
          keyExtractor={(item, index) => ""+index}
      >
      </FlatList>
      }
    </View>
  );
}