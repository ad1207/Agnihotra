import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
} from "react-native";
import CloseModalButton from "./CloseModalButton";
import Logo from "../assets/icon";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
export default function MainMenu({ navigation, closeModal }) {
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
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
      <CloseModalButton state={"mainMenu"} closeModal={() => closeModal()} />
      <View style={styles.menuContainer}>
        <View style={styles.logo}>
          <Logo width={"100%"} height={"100%"} />
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>AGNIHOTRA TIMER v4</Text>
        </View>
        <View style={styles.pageList}>
          <TouchableOpacity
            style={styles.pageItem}
            onPress={() => navigation.navigate("About")}
          >
            <Text style={styles.pageText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pageItem}
            onPress={() => navigation.navigate("Privacy")}
          >
            <Text style={styles.pageText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pageItem}
            onPress={() => navigation.navigate("Disclaimer")}
          >
            <Text style={styles.pageText}>Disclaimer</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.contactUs} onPress={async ()=>{
          await Linking.openURL('mailto:info@vprana.in');
        }}>
          <Text style={styles.contactText1}>Contact us at</Text>
          <Text style={styles.contactText2}>info@vprana.in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    height: 700,
  },
  logo: {
    height: 100,
    width: 100,
    margin: 30,
  },
  title: {
    height: 50,
    width: 300,
    marginLeft: 30,
  },
  titleText: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "left",
  },
  pageList: {
    height: 200,
    width: 300,
    marginLeft: 30,
    display: "flex",
    justifyContent: "space-around",
  },
  pageText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: "left",
    color: "#6750a4",
  },
  contactUs: {
    height: 60,
    width: 300,
    marginLeft: 30,
    marginTop: 30,
  },
  contactText1: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: "left",
  },
  contactText2: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: "left",
  },
});
