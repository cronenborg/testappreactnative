import React from 'react';
import * as Battery from 'expo-battery';
import { Text } from 'react-native';

export default class BatteryLevel extends React.Component {
  state = {
    batteryLevel: null,
  };

  async componentDidMount() {
    let batteryLevel = await Battery.getBatteryLevelAsync();
    this.setState({ batteryLevel });
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      this.setState({ batteryLevel });
      console.log('batteryLevel changed!', batteryLevel);
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <Text>Battery Level: {Math.round(this.state.batteryLevel*100)}%</Text>
    );
  }
}
