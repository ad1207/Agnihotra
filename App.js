import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import Homepage from "./pages/Homepage";
import Menu from "./pages/Menu";

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 1000);

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Homepage"
        >
          <Stack.Screen name="Homepage" component={Homepage} />
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{ ...TransitionPresets.SlideFromRightIOS }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
