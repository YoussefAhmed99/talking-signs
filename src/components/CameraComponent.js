import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ToastAndroid } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const CameraComponent = (item) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [wait, setWait] = useState(false);

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
    var img = await camRef.current.takePictureAsync({ quality: 0.1 });
    ToastAndroid.show(img.uri, ToastAndroid.SHORT);

    const width = img.width;
    const height = img.height;
    console.log(img.width, img.height)
    manipResult = await ImageManipulator.manipulateAsync(
      img.uri,
      [{
        crop: {
          originX: 0,
          originY: (height - width) / 2,
          width: width,
          height: width
        }
      }],
      { format: 'jpeg' }
    );
    img = manipResult
    console.log(img);

    try {
      let uri = img.uri;
      let apiUrl = 'https://api.talkingsigns.cf/uploader';

      let formData = new FormData();

      formData.append('file', {
        uri,
        name: `photo.jpeg`,
        type: `image/jpeg`,
      });

      let options = {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        },
      };

      setWait(true)
      let result = await fetch(apiUrl, options);
      console.log(JSON.stringify(result));
      setWait(false)
      setOpen(false)
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
            width: 200,
            height: 350
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
  text: {
    fontSize: 18,
    color: "white",
  },
});
export default CameraComponent;
