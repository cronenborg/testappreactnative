import React from 'react';
import { View, StyleSheet, Dimensions  } from 'react-native';
import CameraPage from '../components/CameraPage';
const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default function VideoScreen() {
  return (
    <View style={styles.previewcamera}>
      <CameraPage style={styles.previewcamera} />
    </View>
  );
}

VideoScreen.navigationOptions = {
  title: 'Video',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  previewcamera: {
    height: winHeight,
    width: winWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});
