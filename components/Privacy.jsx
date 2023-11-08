import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import CloseModalButton from "./CloseModalButton";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function Privacy({ navigation, closeModal }) {
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
        state={"privacy"}
        goBack={() => navigation.navigate("MainMenu")}
        closeModal={() => closeModal()}
      />
      <View style={styles.disclaimerContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Privacy Policy</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>
            By using this app you are agreeing to our Privacy policy and other
            terms listed below.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Privacy Policy</Text>
          <Text style={styles.content}>
            We do not or sell or share this app’s user data to any third
            parties.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Data Collection</Text>
          <Text style={styles.content}>This app collects the following</Text>
          <Text style={styles.content}>
            1. GPS Location data to calculate the sunrise and sunset time.
          </Text>
          <Text style={styles.content}>
            2. Device time to calculate the difference between current time and
            Agnihotra time.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.content}>
            Some data collected by Google Play store are goverened by Google
            Play Store’s privacy policy and Terms of use.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>GDPR Compliance</Text>
          <Text style={styles.content}>
            This app does not collect and store users personal data in any cloud
            storage locations. Only the last detected GPS location is stored in
            this device.
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
