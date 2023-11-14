import {
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
  Platform,
  UIManager,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Card from "../components/Card";
import Yagna from "../components/Yagna";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import * as NavigationBar from "expo-navigation-bar";
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CONFIG = {
  duration: 1000,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.linear,
  },
  delete: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
};

export default function Homepage({ navigation }) {
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_400Regular,
  });
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let morningGradient = ["#81d4f4", "#e1f5fe"];
  let eveningGradient = ["#004c6f", "#01212f"];
  const [dark, setDark] = useState(false);
  const [morning, setMorning] = useState(true);
  const [state, setState] = useState("morning");
  const [yagna, setYagna] = useState(false);
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();

  const [sunriseRemaining, setSunriseRemaining] = useState();
  const [sunsetRemaining, setSunsetRemaining] = useState();

  const [tommorowSunrise, setTomorowSunrise] = useState();

  const [tommorowSunriseRemaining, setTommorowSunriseRemaining] = useState();

  const fetchData = async () => {
    const response = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${location?.coords.latitude}&lng=${location?.coords.longitude}&formatted=0`
    );
    const data = await response.json();
    setSunrise(getConvertedTime(data?.results?.sunrise));
    setSunset(getConvertedTime(data?.results?.sunset));
    setSunriseRemaining(
      remainingTime(getConvertedTime(data?.results?.sunrise))
    );
    setSunsetRemaining(remainingTime(getConvertedTime(data?.results?.sunset)));
    const tommorowResponse = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${location?.coords.latitude}&lng=${location?.coords.longitude}&formatted=0&date=tomorrow`
    );
    const tommorowData = await tommorowResponse.json();
    setTomorowSunrise(getConvertedTime(tommorowData?.results?.sunrise));
    setTommorowSunriseRemaining(
      nextDayRemainingTime(getConvertedTime(tommorowData?.results?.sunrise))
    );
    setLoading(false);
  };

  useEffect(() => {
    if (location) fetchData();
  }, [location]);

  useEffect(() => {
    setSunriseRemaining(remainingTime(sunrise));
    setSunsetRemaining(remainingTime(sunset));
    setTommorowSunriseRemaining(nextDayRemainingTime(tommorowSunrise));
  }, [sunrise, sunset, tommorowSunrise]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sunriseRemaining) setSunriseRemaining(reduceTime(sunriseRemaining));
      if (sunriseRemaining) setSunsetRemaining(reduceTime(sunsetRemaining));
      if (tommorowSunriseRemaining)
        setTommorowSunriseRemaining(reduceTime(tommorowSunriseRemaining));
    }, 1000);
    return () => clearInterval(interval);
  }, [sunriseRemaining, sunsetRemaining, tommorowSunriseRemaining]);

  useEffect(() => {
    if (sunriseRemaining === "00:00:01" && state === "morning") {
      setTimeout(() => {
        LayoutAnimation.configureNext(CONFIG);
        setYagna(true);
        setState("evening");
      }, 500);
    } else if (sunsetRemaining === "00:00:01" && state === "evening") {
      setTimeout(() => {
        LayoutAnimation.configureNext(CONFIG);
        setYagna(true);
        setState("night");
      }, 500);
    } else if (
      sunriseRemaining === "00:00:00" &&
      sunsetRemaining === "00:00:00" &&
      yagna === false
    ) {
      setState("night");
    } else if (
      sunriseRemaining === "00:00:00" &&
      state === "morning" &&
      yagna === false
    ) {
      setState("evening");
      setMorning(false);
    }
  }, [sunriseRemaining, sunsetRemaining, yagna]);

  const handleDone = () => {
    LayoutAnimation.configureNext(CONFIG);
    setYagna(false);
  };

  useEffect(() => {
    if (navigation.isFocused())
      NavigationBar.setBackgroundColorAsync(dark ? "#01212f" : "#e1f5fe");
  });

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  useEffect(() => {
    if (!location) getLocation();
  });

  useEffect(() => {
    if (yagna) return;
    if (state === "morning") {
      setDark(false);
      setMorning(true);
    } else if (state === "evening") {
      setDark(false);
      setMorning(false);
    } else if (state === "night") {
      setDark(true);
      setMorning(false);
    }
  }, [state, yagna]);

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (yagna) return <Yagna morning={morning} handleDone={handleDone} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={dark ? "#004c6f" : "#81d4f4"}
      />
      <View style={styles.container}>
        <LinearGradient
          style={styles.gradient}
          colors={dark ? eveningGradient : morningGradient}
        >
          <Navbar
            dark={dark}
            location={location}
            openModal={() => navigation.navigate("Menu")}
          />
          <Header dark={dark} />
          {loading ? (
            <View style={styles.loader}>
              <Text style={styles.loaderText}>
                Calculating Agnihotra Time...
              </Text>
            </View>
          ) : dark ? (
            <Card
              dark={dark}
              displayTime={get12HourTime(tommorowSunrise)}
              remainingTime={tommorowSunriseRemaining}
            />
          ) : (
            <>
              <Card
                active={morning}
                displayTime={get12HourTime(sunrise)}
                remainingTime={sunriseRemaining}
                morning={true}
                dark={dark}
              />
              <Card
                active={!morning}
                displayTime={get12HourTime(sunset)}
                remainingTime={sunsetRemaining}
                morning={false}
                dark={dark}
              />
            </>
          )}
        </LinearGradient>
      </View>
    </SafeAreaView>
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
    height: "100%",
    width: "100%",
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
  loader: {
    height: 350,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loaderText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
  },
});

const getConvertedTime = (dateString) => {
  if (!dateString) return;
  const date = new Date(dateString);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  const convertedTime = date.toLocaleString("en-US", options);
  return convertedTime;
};

const get12HourTime = (dateString) => {
  if (!dateString) return;
  const [hours, minutes, seconds] = dateString.split(":").map(Number);

  // Format the time in 12-hour format with AM/PM
  const formattedTime = new Date(
    0,
    0,
    0,
    hours,
    minutes,
    seconds
  ).toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return formattedTime.replace(/(\d{1,2}:\d{2}:\d{2})/, (_, time) => {
    const [hh, mm, ss] = time.split(":");
    return `${hh.padStart(2, "0")}:${mm}:${ss}`;
  });
};

const nextDayRemainingTime = (targetTime) => {
  if (!targetTime) return;
  let now = new Date();
  const [targetHours, targetMinutes, targetSeconds] = targetTime
    .split(":")
    .map(Number);
  const targetDate = new Date(now);
  targetDate.setHours(targetHours, targetMinutes, targetSeconds, 0);
  if (targetDate < now) {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  const remainingTimeInMilliseconds = targetDate - now;

  const remainingHours = Math.floor(remainingTimeInMilliseconds / 3600000);
  const remainingMinutes = Math.floor(
    (remainingTimeInMilliseconds % 3600000) / 60000
  );
  const remainingSeconds = Math.floor(
    (remainingTimeInMilliseconds % 60000) / 1000
  );

  let remainingTime = "";
  if (remainingHours < 10) remainingTime += "0";
  remainingTime += `${remainingHours}:`;
  if (remainingMinutes < 10) remainingTime += "0";
  remainingTime += `${remainingMinutes}:`;
  if (remainingSeconds < 10) remainingTime += "0";
  remainingTime += `${remainingSeconds}`;
  return remainingTime;
};

const remainingTime = (targetTime) => {
  if (!targetTime) return;
  let now = new Date();
  const [targetHours, targetMinutes, targetSeconds] = targetTime
    .split(":")
    .map(Number);
  const targetDate = new Date(now);
  targetDate.setHours(targetHours, targetMinutes, targetSeconds, 0);
  if (targetDate < now) {
    return "00:00:00";
    targetDate.setDate(targetDate.getDate() + 1);
  }

  const remainingTimeInMilliseconds = targetDate - now;

  const remainingHours = Math.floor(remainingTimeInMilliseconds / 3600000);
  const remainingMinutes = Math.floor(
    (remainingTimeInMilliseconds % 3600000) / 60000
  );
  const remainingSeconds = Math.floor(
    (remainingTimeInMilliseconds % 60000) / 1000
  );

  // Print the remaining time
  let remainingTime = "";
  if (remainingHours < 10) remainingTime += "0";
  remainingTime += `${remainingHours}:`;
  if (remainingMinutes < 10) remainingTime += "0";
  remainingTime += `${remainingMinutes}:`;
  if (remainingSeconds < 10) remainingTime += "0";
  remainingTime += `${remainingSeconds}`;
  return remainingTime;
};

// reduce 1 second from remaining time
const reduceTime = (time) => {
  if (!time) return;
  if (time === "00:00:00") return time;
  const [hours, minutes, seconds] = time.split(":").map(Number);
  let newSeconds = seconds - 1;
  let newMinutes = minutes;
  let newHours = hours;
  if (newSeconds < 0) {
    newSeconds = 59;
    newMinutes -= 1;
  }
  if (newMinutes < 0) {
    newMinutes = 59;
    newHours -= 1;
  }
  if (newHours < 0) {
    return "00:00:00";
  }
  let newTime = "";
  if (newHours < 10) newTime += "0";
  newTime += `${newHours}:`;
  if (newMinutes < 10) newTime += "0";
  newTime += `${newMinutes}:`;
  if (newSeconds < 10) newTime += "0";
  newTime += `${newSeconds}`;
  return newTime;
};
