import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import { Camera } from 'expo-camera';

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

  const sendFrame = async () =>
  {
      const data = await camRef.current.takePictureAsync({ quality: 0.1 });
      //ToastAndroid.show(data.toString(), ToastAndroid.SHORT);
      let uri = data;
      let apiUrl = 'api.talkingsigns.cf'

      let name = item.navigation.state.params.name
    let id = item.navigation.state.params._id
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();

    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        name,
        id

      },
    };

    setWait(true)
    let result = await fetch(apiUrl, options);
    console.log(result.status)
    setWait(false)
    setOpen(false)

  }

  setInterval(sendFrame, 1000);

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}
        ref = {camRef}
        >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
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
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
export default CameraComponent;
