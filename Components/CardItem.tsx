import { Pressable } from "react-native";
import React from "react";
import { useTheme, Card, Button } from "react-native-paper";

type Props = {
  title: string;
  image_url: string;
  description: string;
  content: string;
  navigation: NavigationProp<Route>;
  handleDelete?:(val:string)=>void;
};
const CardItem = (props: Props) => {
  const theme = useTheme();
  const handlePress = () => {
    props.navigation.navigate("NewsOverview", {
      title: props.title,
      description: props.description,
      image_url: props.image_url,
      content: props.content,
    });
  };
  return (
    <Pressable onPress={handlePress}>
      <Card
        style={{
          marginVertical: 10,
          backgroundColor: theme.colors.elevation.level5,
        }}
      >
        <Card.Cover borderRadius={10} source={props.image_url? {uri: props.image_url} : {uri:"https://firebasestorage.googleapis.com/v0/b/forstoringimages-364e6.appspot.com/o/NoImageFound.jpg.png?alt=media&token=8167afe0-fd72-4ef4-b5f5-63e8209e691f"}} />
        <Card.Title
          title={props.title}
          subtitle={props.description}
          titleNumberOfLines={1}
        />
        {props.handleDelete && (
            <Card.Actions>
            <Button onPress={()=>props.handleDelete && props.handleDelete(props.title)}>Delete</Button>
        </Card.Actions>
        )}
        
      </Card>
    </Pressable>
  );
};

export default CardItem;
