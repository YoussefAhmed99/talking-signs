import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CameraComponent from "../components/CameraComponent";
import ResetTextAreaButton from "../components/ResetTextAreaButton";
import * as Speech from 'expo-speech';
import TextAreaSpeech from "../components/TextAreaSpeech";
import DeleteLastTextArea from "../components/DeleteLastTextArea";

const HomeScreen = (props) => {
  const [result, setResult] = useState("");
  //console.log(props);
  const handleText = (data) => {
    if (data === 'nothing') {

    } else if (data === 'del') {
      var deleted = "";
      for (var i = 0; i < result.length - 1; i++) {
        deleted += result[i];
      }
      setResult(deleted);
    } else if (data === 'space') {
      setResult(result + " ");
    }
    else {
      setResult(result + data);
    }
  }

  const resetHandler = () => {
    setResult("");
    //console.log("X");
  }

  const speechHandler = () => {
    Speech.speak(result);
  }

  const backSpaceHandler = () => {
    var txt = "";
    for (var i = 0; i < result.length - 1; i++) {
      txt += result[i];
    }
    setResult(txt);
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraComponent onSubmit={handleText} />
      <View style={{ flex: 0.33, backgroundColor: "#fff" }}>
        <ResetTextAreaButton onReset={resetHandler} />
        <TextAreaSpeech onSpeech={speechHandler} />
        <DeleteLastTextArea onBackSpace={backSpaceHandler} />
        <Text style={styles.response}>{result}</Text>
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  response: {
    width: "100%",
    height: "40%",
    textAlignVertical: "center",
    fontSize: 24,
    left: 0,
    top: "30%",
    padding: 10,
  }
})
export default HomeScreen;
