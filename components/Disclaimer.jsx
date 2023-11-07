import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CloseModalButton from "./CloseModalButton";

import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function Disclaimer({ navigation, closeModal }) {
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
    <SafeAreaView>
      <CloseModalButton
        state={"disclaimer"}
        goBack={() => navigation.navigate("MainMenu")}
        closeModal={() => closeModal()}
      />
      <View style={styles.disclaimerContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Disclaimer</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Time Accuracy</Text>
          <Text style={styles.content}>
            In rare cases, there may be a few seconds difference observed in
            sunrise or sunset time data. VPRANA LLP or SQUAPL Pvt. Ltd. are not
            reponsible for inaccuracies as the time data is provided by our
            global time data vendor.
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
});
