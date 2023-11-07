import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import MainMenu from "../components/MainMenu";
import Disclaimer from "../components/Disclaimer";
import About from "../components/About";
import Privacy from "../components/Privacy";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function Menu({ navigation }) {
  const closeModal = () => {
    navigation.navigate("Homepage");
  };

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
          options={{ ...TransitionPresets.ScaleFromCenterAndroid }}
        >
          {(props) => <Disclaimer {...props} closeModal={() => closeModal()} />}
        </Stack.Screen>
        <Stack.Screen
          name="About"
          options={{ ...TransitionPresets.ScaleFromCenterAndroid }}
        >
          {(props) => <About {...props} closeModal={() => closeModal()} />}
        </Stack.Screen>
        <Stack.Screen
          name="Privacy"
          options={{ ...TransitionPresets.ScaleFromCenterAndroid }}
        >
          {(props) => <Privacy {...props} closeModal={() => closeModal()} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
