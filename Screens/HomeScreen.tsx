import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import React, { useState } from "react";
import { Appbar, Chip, Button, ProgressBar } from "react-native-paper";
import { ComponentNavigationProps, NewsData } from "../utils/types";
import CardItem from "../Components/CardItem";

const HomeScreen = (props: ComponentNavigationProps) => {
  const Catagories = [
    "Business",
    "Entertainment",
    "Environment",
    "Technology",
    "Sports",
    "Science",
    "Food",
    "Politics",
  ];
  const API = "pub_209615da3098c5369a4b0407b2db888bd0bd2";
  const [selectedCtg, setSelectedCtg] = useState([]);
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [nextPage, setNextPage] = useState("");
  const [isLoading, setISLoading] = useState(false);

  const handleSelect = (val: string) => {
    setSelectedCtg((prev: string[]) =>
      prev.find((p) => p === val)
        ? prev.filter((ctg) => ctg !== val)
        : [...prev, val]
    );
  };

  const handlePress = async () => {
    const URL = `https://newsdata.io/api/1/news?apikey=pub_209615da3098c5369a4b0407b2db888bd0bd2&country=in&language=en${
      selectedCtg.length > 0 ? `&category=${selectedCtg.join()} ` : " "
    }${nextPage?.length > 0 ? `&page=${nextPage}` : " "}`;
    try {
      setISLoading(true);
      await fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          setNewsData((prev) => [...prev, ...data.results]);
          setNextPage(data.nextPage);
        });
      setISLoading(false);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Home"></Appbar.Content>
      </Appbar.Header>
      <ScrollView
       horizontal showsHorizontalScrollIndicator={false}
        style={{}}
      >
        {Catagories.map((ctg) => (
          <Chip
            key={ctg}
            mode="outlined"
            style={styles.chipItem}
            textStyle={{ fontWeight: "400", color: "white", padding: 1}}
            showSelectedOverlay
            selected={selectedCtg.find((c) => ctg === c) ? true : false}
            onPress={() => handleSelect(ctg)}
          >
            {ctg}
          </Chip>
        ))}
       
      </ScrollView>

      <Button
          style={{marginHorizontal:20,marginVertical:10}}
          icon={"sync"}
          mode="outlined"
          buttonColor="black"
          onPress={handlePress}
        >
          Refresh
        </Button>

      
      <ProgressBar visible={isLoading} indeterminate color="red"  style={{marginVertical:10}}/>
      <View style={{height:'65%'}}>
      <FlatList
        keyExtractor={(item) => item.title}
        onEndReached={() => handlePress()}
        style={{ }}
        data={newsData}
        renderItem={({ item }) => (
          <CardItem
            navigation={props.navigation}
            description={item.description}
            image_url={item.image_url}
            title={item.title}
            content={item.content}
          />
        )}
      />
      </View>
      
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
  
  },
  filter: {
   
    margin: 10,
  },
  chipItem: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
});
