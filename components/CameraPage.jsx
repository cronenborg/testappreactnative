import React, { Component, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

class MyCamera extends Component {

    constructor(props) {
      super(props);
      this.cameraRef = React.createRef();    // initialize "this.myInput"  
      this.type = Camera.Constants.Type.back;
      this.setType = Camera.Constants.Type.back;
      this.state = {
        type: this.props.type
      }
    }
  
    takeSnapshot = async () => {
      if (this.cameraRef.current) {
        let uri = await this.cameraRef.current.takePictureAsync({
          base64: true
        }).then(async data => {
            const asset = await MediaLibrary.createAssetAsync(data.uri);
            console.log(asset);

            Alert.alert(
              'Picture Saved',
              asset.filename,
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );

        }).catch(err => {
          console.log("err", err)}
        )
      }
    }
  
    render () {
      return <Camera 
          ref={this.cameraRef}
          type={this.state.type} 
          ratio='16:9' 
          style={{ flex: 1}} 
        >
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
              <View style={{width: 60, height: 60, backgroundColor: 'transparent'}} />
              <View style={{width: '100%', height: 60, backgroundColor: 'transparent', marginBottom: 120, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', }}>
                  <TouchableOpacity 
                      style={{
                          width: 50,
                          height: 50, 
                          alignItems: 'center',
                          backgroundColor: 'transparent',
                          marginLeft: 50,
                      }}
                      onPress={() => {
                          return true;
                      }}
                  >
                      <Ionicons
                          name='md-square-outline'
                          size={50} 
                          color='rgba(255,255,255,0.5)'
                      />
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={{
                          width: 50,
                          height: 50, 
                          alignItems: 'center',
                          backgroundColor: 'transparent',
                      }}
                      onPress={() => {
                          this.takeSnapshot();
                      }}
                  >
                      <Ionicons
                          name='md-square'
                          size={50} 
                          color='rgba(255,255,255,0.5)'
                      />
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={{
                          width: 50,
                          height: 50, 
                          alignItems: 'center',
                          backgroundColor: 'transparent',
                          marginRight: 50,
                      }}
                      onPress={() => {
                        
                        if(this.state.type === Camera.Constants.Type.back) {
                          this.setState({ type: Camera.Constants.Type.front });
                        }
                        else {
                          this.setState({ type: Camera.Constants.Type.back });
                        }

                      }}
                  >
                      <Ionicons
                          name='md-refresh-circle'
                          size={50} 
                          color='rgba(255,255,255,0.5)'
                      />
                  </TouchableOpacity>
              </View>
          </View>
        </Camera>
      
    }
}

export default function CameraPage() {
    
    const [hasPermission, setHasPermission] = useState(null);
    const [hasPermission2, setHasPermission2] = useState(null);
    
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            const { filesystemp } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            setHasPermission(status === 'granted');
            setHasPermission2(filesystemp === 'granted');
            
        })();
    }, []);

    let snap = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync();
        }
    };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <MyCamera />
    </View>
  );
}


