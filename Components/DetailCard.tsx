import { View,Dimensions, ScrollView} from "react-native";
import React from "react";
import { Card, Text, useTheme } from "react-native-paper";

type Props = {
  title: string;
  image_url: string;
  content: string;
};

const DetailCard = (props: Props) => {
  const theme = useTheme();
  return (
    <ScrollView style={{margin:15}}>
      <Text style={{ marginVertical: 10, color:'black', fontWeight:'bold',fontSize:25 }} >
        {props.title}
      </Text>
      <Card
        style={{ backgroundColor: theme.colors.background }}
        contentStyle={{ width: Dimensions.get("window").width }}
      > 
      {props.image_url && (
      <Card.Cover source={{uri:props.image_url}}></Card.Cover>
      )} 
        <Card.Content>
            <Text style={{ marginEnd:30,fontSize:20,marginTop:10 ,}}
             >
                {props.content}
            </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default DetailCard;
