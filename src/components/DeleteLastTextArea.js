import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";


const DeleteLastTextArea = (props) => {
    const backSpace = () => {
        props.onBackSpace();
    }

    return (
        <TouchableWithoutFeedback onPress={backSpace}>
            <MaterialCommunityIcons
                style={styles.button}
                name="backspace"
                color={"#9c1937"}
                size={30}
            />
        </TouchableWithoutFeedback>
    );
};
export default DeleteLastTextArea;

const styles = StyleSheet.create({
    button: {
        top: 5,
        right: 5,
        position: "absolute",
    },
});
