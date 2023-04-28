import { View, FlatList } from 'react-native'
import React,{useEffect,useState} from 'react'
import {Appbar } from 'react-native-paper'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useIsFocused} from "@react-navigation/native"
import CardItem from '../Components/CardItem';
import { ComponentNavigationProps, NewsData } from '../utils/types';


const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("@newsdata");
    if (value !== null) {
      // value previously stored
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
   alert("Something went wrong")
   return;
  }
};
const storeData = async (value: string) => {
  const data: NewsData[] = (await getData())|| [];
  const filtered  = data.filter((news) => news.title !== value)
try {
  const jsonValue = JSON.stringify(filtered);
  await AsyncStorage.setItem("@newsdata", jsonValue);
    
} catch (e) {
      return alert("Something went wrong")
       
}
};
const SavedScreen = (props:ComponentNavigationProps) => {
  const [savedNews,setSavedNews] = useState([]);
  const focused = useIsFocused();

  const deleteHandler = async (val:string)=>{
    await storeData(val);
  }
  useEffect(()=>{
    getData().then((data)=>setSavedNews(data))
  },[focused,deleteHandler])





  return (
    <View style={{flex:1}}>
    <Appbar.Header>
        <Appbar.Content title="Saved News"></Appbar.Content>
      </Appbar.Header>
      <FlatList
       keyExtractor={(item)=>item.title}
        style={{flex:1,height:"auto",display:"flex"}}
        data={savedNews}
        renderItem={({ item }) => (
          <CardItem
           handleDelete={deleteHandler}
            navigation={props.navigation}
            description={item.description || " "}
            image_url={item.image_url}
            title={item.title}
            content={item.content}    
          />
        )}
        />
      </View>
  )
}

export default SavedScreen