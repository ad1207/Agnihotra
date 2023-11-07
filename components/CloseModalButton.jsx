import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Close from "../assets/Close";
import Back from "../assets/Back";

export default function CloseModalButton({ state, goBack, closeModal }) {
  return (
    <View style={styles.closeModalContainer}>
      {state === "mainMenu" ? (
        <View></View>
      ) : (
        <TouchableOpacity style={styles.close} onPress={() => goBack()}>
          <Back />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.close} onPress={() => closeModal()}>
        <Close />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  closeModalContainer: {
    height: 56,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 10,
  },
  close: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    marginHorizontal: 20,
  },
});
