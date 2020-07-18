import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Button from "../components/Button";
import AsyncStorage from '@react-native-community/async-storage';

export default class GeolocationExample extends Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
 
  };



  watchID: ?number = null;

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    this.watchID = Geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }


  render() {
    const getData = async () => {
  
    Alert.alert("sample",this.state.lastPosition)
    }
    return (
      <View>

    <Button mode="outlined" onPress={()=>getData()}>
      display 
    </Button>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});