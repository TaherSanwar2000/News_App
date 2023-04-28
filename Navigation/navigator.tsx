import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import SavedScreen from "../Screens/SavedScreen";
import NewsOverview from "../Screens/NewsOverview";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen options={{tabBarIcon(props) {
          return <Icon 
           name={props.focused? "home-circle": "home-circle-outline"}
           {...props}/>
      },
      }} name="Home" component={HomeScreen}  />
      <Tab.Screen  options={{tabBarIcon(props) {
          return <Icon 
           name={props.focused? "content-save-all": "content-save-all-outline"}
           {...props}/>
      },
      }} name="Saved" component={SavedScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
    return (
      <NavigationContainer>
         <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={MyTabs} options={{headerShown:false}} />
        <Stack.Screen name="NewsOverview" component={NewsOverview}  />

      </Stack.Navigator>
      </NavigationContainer>
    );
  }