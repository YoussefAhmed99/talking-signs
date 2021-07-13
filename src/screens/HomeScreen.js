import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CameraComponent from "../components/CameraComponent";
import ResetTextAreaButton from "../components/ResetTextAreaButton";

const HomeScreen = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <CameraComponent />
      <View style={{ flex: 0.33, backgroundColor: "#fff" }}>
        <ResetTextAreaButton />
      </View>
    </View>
  );
};

export default HomeScreen;
