import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import Hamburger from "../assets/Hamburger";
import Power from "../assets/Power";
import { useFonts, NotoSans_700Bold } from "@expo-google-fonts/noto-sans";
import LocationLight from "../assets/LocationLight.png";
import LocationDark from "../assets/LocationDark.png";
import { useEffect, useState } from "react";
export default function Navbar({ dark, openModal, location }) {
  const [locationText, setLocationText] = useState("Detecting Location...");
  const [fontsLoaded, fontError] = useFonts({
    NotoSans_700Bold,
  });

  // console.log(location);

  useEffect(() => {
    if (location) {
      fetch(
        `https://us1.locationiq.com/v1/reverse?key=pk.8f440d4c6dc3c086e69d01b5134012bb&lat=${location.coords.latitude}&lon=${location.coords.longitude}&format=json`
      )
        .then((res) => res.json())
        .then((data) => {
          let text =
            data.address.city ??
            data.address.state_district ??
            data.address.state ??
            data.address.country ??
            convertToDMS(location.coords.latitude, location.coords.longitude);
          setLocationText(text.toUpperCase());
        })
        .catch((err) => {
          setLocationText(
            convertToDMS(location.coords.latitude, location.coords.longitude)
          );
        });
    }
  }, [location]);

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  const closeApp = () => {
    Alert.alert(
      "Exit App",
      "Do you want to exit?",
      [
        {
          text: "No",
          style: "cancel",
        },
        { text: "Yes", onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.navbarContainer}>
      <TouchableOpacity style={styles.hamburger} onPress={openModal}>
        <Hamburger dark={dark} />
      </TouchableOpacity>
      <View style={styles.location}>
        <Image
          source={dark ? LocationDark : LocationLight}
          style={{ width: "12%", aspectRatio: 1 }}
        />
        <Text
          numberOfLines={1}
          style={dark ? styles.locationTextDark : styles.locationTextLight}
        >
          {locationText}
        </Text>
      </View>
      <TouchableOpacity style={styles.power} onPress={closeApp}>
        <Power dark={dark} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    height: 56,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  hamburger: {
    flex: 1,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  power: {
    flex: 1,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  location: {
    flex: 4,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  locationTextLight: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
    letterSpacing: 0,
    fontFamily: "NotoSans_700Bold",
    textAlign: "center",
  },
  locationTextDark: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
    letterSpacing: 0,
    fontFamily: "NotoSans_700Bold",
    textAlign: "center",
    color: "#ffffff",
  },
});

function convertToDMS(latitude, longitude) {
  // Convert latitude to DMS (Degrees, Minutes, Seconds)
  const latDMS = convertToDegreesMinutesSeconds(latitude);
  const latDirection = latitude >= 0 ? "N" : "S";

  // Convert longitude to DMS (Degrees, Minutes, Seconds)
  const lonDMS = convertToDegreesMinutesSeconds(longitude);
  const lonDirection = longitude >= 0 ? "E" : "W";

  // Format the result
  const formattedResult = `${latDMS.toFixed(
    1
  )} ${latDirection}, ${lonDMS.toFixed(1)} ${lonDirection}`;

  return formattedResult;
}

function convertToDegreesMinutesSeconds(coordinate) {
  const absoluteCoordinate = Math.abs(coordinate);
  const degrees = Math.floor(absoluteCoordinate);
  const minutes = (absoluteCoordinate - degrees) * 60;

  return degrees + minutes / 60;
}
