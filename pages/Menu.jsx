import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import MainMenu from "../components/MainMenu";
import Disclaimer from "../components/Disclaimer";
import About from "../components/About";
import Privacy from "../components/Privacy";
import { NavigationContainer } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";

const Stack = createStackNavigator();

export default function Menu({ navigation }) {
  const closeModal = () => {
    navigation.navigate("Homepage");
  };

  useEffect(() => {
    if (navigation.isFocused()) NavigationBar.setBackgroundColorAsync("#fff");
  });

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="MainMenu"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainMenu">
          {(props) => <MainMenu {...props} closeModal={() => closeModal()} />}
        </Stack.Screen>
        <Stack.Screen
          name="Disclaimer"
          options={{ ...TransitionPresets.SlideFromRightIOS }}
        >
          {(props) => <Disclaimer {...props} closeModal={() => closeModal()} />}
        </Stack.Screen>
        <Stack.Screen
          name="About"
          options={{ ...TransitionPresets.SlideFromRightIOS }}
        >
          {(props) => <About {...props} closeModal={() => closeModal()} />}
        </Stack.Screen>
        <Stack.Screen
          name="Privacy"
          options={{ ...TransitionPresets.SlideFromRightIOS }}
        >
          {(props) => <Privacy {...props} closeModal={() => closeModal()} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
