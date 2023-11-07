import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../assets/icon";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function SplashScreenComponent() {
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });
  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <LinearGradient style={styles.gradient} colors={["#fdff88", "#c28c00"]}>
        <SafeAreaView style={styles.frame}>
          <View>
            <View style={styles.logo}>
              <Logo width={"500%"} />
            </View>
            <View>
              <Text style={styles.title}>Agnihotra Timer</Text>
            </View>
          </View>
          <View>
            <Text style={styles.copyright}>
              Copyright 2021-2024, VPRANA and SQUAPL{"\n"} All rights reserved.
              Version 4.0
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    textAlign: "center",
  },
  frame: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    textAlign: "center",
    margin: "3%",
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    width: "100",
    borderRadius: 100,
    marginTop: "20%",
    marginBottom: "10%",
    marginHorizontal: "auto",
  },
  copyright: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 11,
    fontWeight: "400",
    lineHeight: 13,
    letterSpacing: 0,
    textAlign: "center",
    paddingHorizontal: "10%",
  },
  title: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 46,
    fontWeight: "400",
    lineHeight: 56,
    letterSpacing: 0,
    textAlign: "center",
    textTransform: "uppercase",
    color: "#004c6e",
    shadowColor: "#00000040",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
});
