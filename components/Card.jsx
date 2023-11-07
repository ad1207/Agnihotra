import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function Card({
  active,
  morning,
  dark,
  displayTime,
  remainingTime,
}) {
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });
  const [displayTimeHnM, setDisplayTimeHnM] = useState(
    displayTime?.substring(0, 5)
  );
  const [displayTimeS, setDisplayTimeS] = useState(
    displayTime?.substring(6, 8)
  );

  const [remainingTimeH, setRemainingTimeH] = useState(
    remainingTime?.substring(0, 2)
  );
  const [remainingTimeM, setRemainingTimeM] = useState(
    remainingTime?.substring(3, 5)
  );
  const [remainingTimeS, setRemainingTimeS] = useState(
    remainingTime?.substring(6, 8)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTimeHnM(displayTime?.substring(0, 5));
      setDisplayTimeS(displayTime?.substring(6, 8));
      setRemainingTimeH(remainingTime?.substring(0, 2));
      setRemainingTimeM(remainingTime?.substring(3, 5));
      setRemainingTimeS(remainingTime?.substring(6, 8));
    }, 1000);
    return () => clearInterval(interval);
  }, [remainingTime]);

  useEffect(() => {
    if (parseInt(remainingTimeH) <= 0 && parseInt(remainingTimeM) <= 0) {
      setGetReady(true);
    }
  }, [remainingTimeH, remainingTimeM, remainingTimeS]);

  const [getReady, setGetReady] = useState(false);

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (dark)
    return (
      <NightCard
        displayTime={displayTime}
        remainingTimeH={remainingTimeH}
        remainingTimeM={remainingTimeM}
        remainingTimeS={remainingTimeS}
      />
    );

  return active && morning ? (
    <MorningActiveCard
      getReady={getReady}
      displayTimeHnM={displayTimeHnM}
      displayTimeS={displayTimeS}
      remainingTimeH={remainingTimeH}
      remainingTimeM={remainingTimeM}
      remainingTimeS={remainingTimeS}
    />
  ) : active && !morning ? (
    <EveningActiveCard
      getReady={getReady}
      displayTimeHnM={displayTimeHnM}
      displayTimeS={displayTimeS}
      remainingTimeH={remainingTimeH}
      remainingTimeM={remainingTimeM}
      remainingTimeS={remainingTimeS}
    />
  ) : !active && morning ? (
    <MorningInactiveCard
      displayTimeHnM={displayTimeHnM}
      displayTimeS={displayTimeS}
      remainingTimeH={remainingTimeH}
      remainingTimeM={remainingTimeM}
      remainingTimeS={remainingTimeS}
    />
  ) : (
    <EveningInactiveCard
      displayTimeHnM={displayTimeHnM}
      displayTimeS={displayTimeS}
      remainingTimeH={remainingTimeH}
      remainingTimeM={remainingTimeM}
      remainingTimeS={remainingTimeS}
    />
  );
}

const EveningActiveCard = ({
  getReady,
  displayTimeHnM,
  displayTimeS,
  remainingTimeH,
  remainingTimeM,
  remainingTimeS,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.aCardContainer}>
        <LinearGradient colors={["#fdff88", "#c28c00"]} style={styles.aCard}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Evening Agnihotra Time</Text>
          </View>
          <View style={styles.time}>
            <Text style={styles.timeTextBig}>{displayTimeHnM}</Text>
            <Text style={styles.timeTextSmall}>:{displayTimeS}s</Text>
          </View>
          <View style={styles.remainingTime}>
            <Text style={styles.activeRemainingTimeText}>
              {remainingTimeH}h : {remainingTimeM}m : {remainingTimeS}s {"\n"}
              remaining
            </Text>
          </View>
        </LinearGradient>
      </View>
      {getReady && (
        <View style={styles.getReadyContainer}>
          <View style={styles.getReady}>
            <Text style={styles.getReadyText}>Get Ready</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const MorningActiveCard = ({
  getReady,
  displayTimeHnM,
  displayTimeS,
  remainingTimeH,
  remainingTimeM,
  remainingTimeS,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.aCardContainer}>
        <LinearGradient colors={["#fdff88", "#c28c00"]} style={styles.aCard}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Morning Agnihotra Time</Text>
          </View>
          <View style={styles.time}>
            <Text style={styles.timeTextBig}>{displayTimeHnM}</Text>
            <Text style={styles.timeTextSmall}>:{displayTimeS}s</Text>
          </View>
          <View style={styles.remainingTime}>
            <Text style={styles.activeRemainingTimeText}>
              {remainingTimeH}h : {remainingTimeM}m : {remainingTimeS}s {"\n"}
              remaining
            </Text>
          </View>
        </LinearGradient>
      </View>
      {getReady && (
        <View style={styles.getReadyContainer}>
          <View style={styles.getReady}>
            <Text style={styles.getReadyText}>Get Ready</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const MorningInactiveCard = ({
  displayTimeHnM,
  displayTimeS,
  remainingTimeH,
  remainingTimeM,
  remainingTimeS,
}) => {
  return (
    <View style={styles.micardContainer}>
      <View style={styles.miCard}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Morning Agnihotra Time</Text>
        </View>
        <View style={styles.time}>
          <Text style={styles.timeTextBig}>{displayTimeHnM}</Text>
          <Text style={styles.timeTextSmall}>:{displayTimeS}s</Text>
        </View>
      </View>
    </View>
  );
};

const EveningInactiveCard = ({
  displayTimeHnM,
  displayTimeS,
  remainingTimeH,
  remainingTimeM,
  remainingTimeS,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.eiCard}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Evening Agnihotra Time</Text>
        </View>
        <View style={styles.time}>
          <Text style={styles.timeTextBig}>{displayTimeHnM}</Text>
          <Text style={styles.timeTextSmall}>:{displayTimeS}s</Text>
        </View>
        <View style={styles.remainingTime}>
          <Text style={styles.remainingTimeText}>
            {remainingTimeH}h : {remainingTimeM}m : {remainingTimeS}s {"\n"}
            remaining
          </Text>
        </View>
      </View>
    </View>
  );
};

const NightCard = ({
  displayTime,
  remainingTimeH,
  remainingTimeM,
  remainingTimeS,
}) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Define options for formatting the date
  const options = { year: "numeric", month: "long", day: "2-digit" };
  const formattedDate = tomorrow.toLocaleString("en-US", options);

  // Function to add ordinal suffix to the day
  const addOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  // Get the formatted date with the ordinal suffix
  const dayWithOrdinal = addOrdinalSuffix(tomorrow.getDate());
  const formattedTomorrowDate = `${dayWithOrdinal} ${formattedDate}`;
  const [tommorow, setTommorow] = useState(formattedDate);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.nightCard}>
        <View style={styles.title}>
          <Text style={styles.nightTitleText}>Next Agnihotra Time</Text>
        </View>
        <View style={styles.date}>
          <Text style={styles.nightDateText}>Tommorow {tommorow}</Text>
        </View>
        <View style={styles.time}>
          <Text style={styles.nightTimeTextSmall}>
            Morning{"\n"}
            {displayTime}
          </Text>
        </View>
        <View style={styles.remainingTime}>
          <Text style={styles.nightRemainingTimeText}>
            {remainingTimeH}h : {remainingTimeM}m : {remainingTimeS}s {"\n"}
            remaining
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 260,
    marginTop: 40,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  micardContainer: {
    height: 160,
    marginTop: 40,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  miCard: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    opacity: 0.6,
    gap: 10,
  },
  eiCard: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 10,
  },
  aCardContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 230,
    borderRadius: 20,
    width: "100%",
    shadowColor: "#00000040",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  aCard: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 230,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 20,
    shadowOpacity: 1,
    zIndex: 999,
    width: "100%",
  },
  nightCard: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 10,
  },
  time: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  titleText: {
    fontFamily: "Montserrat_400Regular",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
    color: "#003d60",
  },
  timeTextBig: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 48,
    lineHeight: 59,
    letterSpacing: 0,
    color: "#003d60",
  },
  timeTextSmall: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 32,
    lineHeight: 50,
    letterSpacing: 0,
    color: "#003d60",
  },
  remainingTime: {
    textAlign: "center",
    alignItems: "center",
  },
  remainingTimeText: {
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0,
    textShadowColor: "#00000030",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 15,
  },
  nightTitleText: {
    fontFamily: "Montserrat_400Regular",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
    color: "#ffffff",
  },
  nightTimeTextBig: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 48,
    lineHeight: 59,
    letterSpacing: 0,
    color: "#ffffff",
  },
  nightTimeTextSmall: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 32,
    lineHeight: 39,
    letterSpacing: 0,
    color: "#ffffff",
  },
  nightRemainingTimeText: {
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0,
    color: "#ffffff",
  },
  nightDateText: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
    color: "#ffffff",
    textAlign: "center",
  },
  activeRemainingTimeText: {
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0,
    color: "#ffffff",
    textShadowColor: "#00000030",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 15,
  },
  getReadyContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
    shadowColor: "#00000040",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  getReady: {
    height: 50,
    width: "100%",
    borderRadius: 50,
    backgroundColor: "#faff00",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    shadowRadius: 10,
    elevation: 20,
  },
  getReadyText: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    lineHeight: 24,
    textTransform: "uppercase",
    letterSpacing: 4,
    textAlign: "center",
  },
});
