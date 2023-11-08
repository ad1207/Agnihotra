import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import CloseModalButton from "./CloseModalButton";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function About({ navigation, closeModal }) {
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
    <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
      <CloseModalButton
        state={"about"}
        goBack={() => navigation.navigate("MainMenu")}
        closeModal={() => closeModal()}
      />
      <View style={styles.disclaimerContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>About</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.content}>
            Agnihotra Timer is a no-ads, absolutely free app that enables people
            to know the exact sunrise and sunset time at their location to
            perform Agnihotra yagya.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.listText1}>Design Ninja</Text>
          <Text style={styles.listText2}>VPRANA LLP</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.listText1}>Code Ninja</Text>
          <Text style={styles.listText2}>SQUAPL Pvt. Ltd.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.listText1}>API Ninja</Text>
          <Text style={styles.listText2}>sunrise-sunset.org/api</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.listText1}>App Version</Text>
          <Text style={styles.listText2}>4.0</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.content}>
            Copyright 2023 VPRANA LLP & SQUAPL Pvt. Ltd. All rights reserved.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  disclaimerContainer: {
    padding: 20,
  },
  section: {
    marginVertical: 15,
  },
  titleText: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "left",
  },
  heading: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: "left",
  },
  content: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: "left",
  },
  listText1: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: "left",
  },
  listText2: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: "left",
  },
});
