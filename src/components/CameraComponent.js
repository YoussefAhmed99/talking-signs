import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ToastAndroid } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from 'axios'


const CameraComponent = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const camRef = useRef(null);
  const width_proportion = '50%';
  const height_proportion = '67%';
  var square = 300;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const sendFrame = async () => {
    Camera.Constants.FlashMode = 'on';
    var img = await camRef.current.takePictureAsync({ quality: 1 });
    //ToastAndroid.show(img.uri, ToastAndroid.SHORT);

    let width = img.width;
    square = width * 0.67
    //console.log(img.width, img.height)
    //console.log(type);
    if (type === 0) {
      var manipResult = await ImageManipulator.manipulateAsync(
        img.uri,
        [{
          crop: {
            originX: width * 0.33,
            originY: 0,
            width: width * 0.67,
            height: width * 0.67
          }
        }]//,
        //{ format: 'png' }
      );
    } else if (type === 1) {
      manipResult = await ImageManipulator.manipulateAsync(
        img.uri,
        [{
          crop: {
            originX: 0,
            originY: 0,
            width: width * 0.67,
            height: width * 0.67
          }
        }]//,
        //{ format: 'png' }
      );
    }
    img = manipResult
    //console.log(img);

    try {
      ToastAndroid.show("Processing data", ToastAndroid.SHORT);
      let uri = img.uri;
      let apiUrl = 'https://api.talkingsigns.cf/uploader';

      let formData = new FormData();

      formData.append('file', {
        uri,
        name: `photo.jpg`,
        type: `image/jpg`,
      });

      let result = await axios.post(apiUrl, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
      props.onSubmit(result.data);

      ToastAndroid.show("Api response: " + result.data, ToastAndroid.SHORT);
    }
    catch (e) {
      console.log(e)
      ToastAndroid.show("image was not sent", ToastAndroid.SHORT);
    }
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}
        ref={camRef}
      >
        <View
          pointerEvents={"none"}
          style={{
            borderWidth: 4,
            borderColor: 'yellow',
            position: 'absolute',
            right: 0,
            top: 0,
            width: square,
            height: square
          }} />
        <View style={styles.buttonContainer}>

          <TouchableWithoutFeedback
            style={styles.switch}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>

            <MaterialCommunityIcons
              style={styles.switch}
              name="camera-switch"
              color={"#9c1937"}
              size={30}
            />

          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback style={styles.snap}
            onPress={() => { sendFrame() }}
          >
            <MaterialCommunityIcons
              style={styles.snap}
              name="circle"
              color={"#9c1937"}
              size={50}
            />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback style={styles.flash}
            onPress={() => {
              setFlash(
                flash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.torch
                  : Camera.Constants.FlashMode.off);
            }}>
            <MaterialCommunityIcons
              style={styles.flash}
              name="flash"
              color={"#9c1937"}
              size={50}
            />
          </TouchableWithoutFeedback>

        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    margin: 0,
    alignSelf: "stretch",
  },
  switch: {
    position: "absolute",
    left: 10,
    bottom: 10,
  },
  snap: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  flash: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
export default CameraComponent;
