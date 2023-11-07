import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  useFonts,
  NotoSans_700Bold,
  NotoSans_400Regular,
} from "@expo-google-fonts/noto-sans";

export default function Header({ dark }) {
  const [dateText, setDateText] = useState("Loading...");
  const [dayText, setDayText] = useState("Loading...");
  const [timeText, setTimeText] = useState(
    new Date().toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
    });
    const dayOfWeek = daysOfWeek[today.getDay()];
    setDateText(formattedDate);
    setDayText(dayOfWeek);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeText(
        new Date().toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const [fontsLoaded, fontError] = useFonts({
    NotoSans_700Bold,
    NotoSans_400Regular,
  });
  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.date}>
        <Text style={dark ? styles.topTextDark : styles.topTextLight}>
          {dateText}
        </Text>
        <Text style={dark ? styles.bottomTextDark : styles.bottomTextLight}>
          {dayText}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.time}>
        <Text style={dark ? styles.topTextDark : styles.topTextLight}>
          {timeText}
        </Text>
        <Text style={dark ? styles.bottomTextDark : styles.bottomTextLight}>
          Current Time
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  date: {
    textAlign: "left",
    flex: 1,
  },
  time: {
    textAlign: "right",
    flex: 1,
    alignItems: "flex-end",
  },
  topTextLight: {
    fontFamily: "NotoSans_700Bold",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
    color: "#003d60",
  },
  bottomTextLight: {
    fontFamily: "NotoSans_400Regular",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
    color: "#003d60",
    textTransform: "uppercase",
  },
  topTextDark: {
    fontFamily: "NotoSans_700Bold",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
    color: "#ffffff",
  },
  bottomTextDark: {
    fontFamily: "NotoSans_400Regular",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
    color: "#ffffff",
    textTransform: "uppercase",
  },
});
