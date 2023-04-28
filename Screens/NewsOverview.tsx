import React from "react";
import { ComponentNavigationProps, NewsData } from "../utils/types";
import DetailCard from "../Components/DetailCard";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ToastAndroid} from 'react-native'

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
const storeData = async (value: NewsData) => {
    const data: NewsData[] = (await getData())|| [];
    !data.find((d)=>d.title === value.title) ? data.push(value) : data;
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem("@newsdata", jsonValue);
        ToastAndroid.showWithGravityAndOffset(
          'Data Saved',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
    
   
  } catch (e) {
        return alert("Something went wrong")
         
}
};


const NewsOverview = (props: ComponentNavigationProps) => {
  const { title, content, image_url } = props?.route?.params;

  props.navigation.setOptions({
    headerRight: () => <Button mode="contained" onPress={()=>storeData({title, content, image_url})}>Save</Button>
  });

  return <DetailCard title={title} content={content} image_url={image_url} />;
};

export default NewsOverview;
