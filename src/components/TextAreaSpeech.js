import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";


const TextAreaSpeech = (props) => {
    const speech = () => {
        props.onSpeech();
    }

    return (
        <TouchableWithoutFeedback onPress={speech}>
            <MaterialCommunityIcons
                style={styles.button}
                name="cellphone-sound"
                color={"#9c1937"}
                size={30}
            />
        </TouchableWithoutFeedback>
    );
};
export default TextAreaSpeech;

const styles = StyleSheet.create({
    button: {
        bottom: 5,
        left: 5,
        position: "absolute",
    },
});
