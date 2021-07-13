import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const ResetTextAreaButton = () => {
  return (
    <TouchableOpacity>
      <MaterialCommunityIcons
        style={styles.button}
        name="refresh"
        color={"#9c1937"}
        size={30}
      />
    </TouchableOpacity>
  );
};
export default ResetTextAreaButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-end",
    top: 5,
    right: 5,
    position: "absolute",
  },
});
