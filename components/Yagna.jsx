import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import Logo from "../assets/icon";

export default function Yagna({ morning, handleDone }) {
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_700Bold,
  });
  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  let text = morning
    ? `“Sooryaaya swahaa sooryaaya idam na mama Prajaapataye swahaa prajaapataye idam na mama”`
    : `“Agnaye swahaa Agnaye idam na mama Prajaapataye swahaa prajaapataye idam na mama”`;
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#fdff88" />
      <View style={styles.yagnaPage}>
        <LinearGradient
          colors={["#fdff88", "#c28c00"]}
          style={{ height: "100%", width: "100%" }}
        >
          <View style={styles.yagnaContainer}>
            <View style={styles.head}>
              <Text style={styles.headText}>
                ITS TIME!{"\n"}PERFORM YOUR YAGNA NOW
              </Text>
            </View>

            <View style={styles.logo}>
              <Logo width={"100%"} height={"70%"} />
            </View>
            <View style={styles.content}>
              <ScrollView style={styles.scroll}>
                <Text style={styles.contentText}>{text}</Text>
              </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonShadow}>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.6}
                  onPress={handleDone}
                >
                  <Text style={styles.buttonText}>DONE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  yagnaPage: {},
  yagnaContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  head: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
  },
  logo: {
    height: 165,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    width: "100%",
  },
  content: {
    height: 350,
    width: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    width: "95%",
    padding: 20,
  },
  headText: {
    fontFamily: "Montserrat_700Bold",
    lineHeight: 17,
    letterSpacing: 0,
    fontSize: 14,
    textAlign: "center",
    color: "#00263c",
  },

  contentText: {
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
    fontSize: 24,
    lineHeight: 29,
    color: "#00263c",
  },
  buttonContainer: {
    width: "100%",
    height: 100,
    alignItems: "center",
    paddingTop: 15,
  },
  button: {
    backgroundColor: "#fff",
    height: 50,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    elevation: 10,
    shadowColor: "#00000090",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  buttonShadow: {
    shadowColor: "#00000040",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  buttonText: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: "center",
  },
});
