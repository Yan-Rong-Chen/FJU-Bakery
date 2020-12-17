//expo install axios
import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

import styles from '../src/styles';
import {axios_config, url} from '../config';

export default function Activity({ navigation,route }) {
  const get_url=url+"Activity?maxRecords=50&view=Grid%20view";
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const Item = ({ index, item, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.items}>
      <Image style={styles.itemImage} source={{ uri: item.fields.act_pic[0].url }} />
      <View style={styles.itemsText}>
        <Text style={styles.itemTitle}>{item.fields.act_name}</Text>
        <Text style={styles.itemContent}>{item.fields.act_date}</Text>
        <Text style={styles.itemContent}>價格：${item.fields.act_price}/人</Text>          
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index}) => {
    return (
      <Item index={index} item={item} 
      onPress={() => navigation.navigate('details',
      {act_name:activity[index].fields.act_name,
      act_date:activity[index].fields.act_date,
      act_limit:activity[index].fields.act_limit,
      act_content:activity[index].fields.act_content,
      act_price:activity[index].fields.act_price,
      act_pic: activity[index].fields.act_pic,
      id:item.id, }
      )} />
    )
  };

  async function fetchData () {
    const result = await axios.get(get_url,axios_config);
    //console.log(result);
    setActivity(result.data.records);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading &&
       <ActivityIndicator color="#F2B653" size="large" animating={loading} />
      }
      {!loading &&
      <FlatList 
          data={activity} 
          renderItem = {renderItem}
          keyExtractor={item => item.fields.act_name}
      >
      </FlatList>
      }
    </View>
  );

}