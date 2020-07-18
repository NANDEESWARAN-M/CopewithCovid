import React, { PureComponent } from 'react';
import { StyleSheet, View, Alert, Dimensions } from 'react-native';

import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import TrackingDot from '../assets/TrackingDot.png';
import AsyncStorage from '@react-native-community/async-storage';



class MapScreen extends PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      locations: [],
      stationaries: [],
      isRunning: false
    };

  }

  componentDidMount() {
    console.log('map did mount');

    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
 
      debug: true,
      
      interval: 10000,
 
    });
    BackgroundGeolocation.getCurrentLocation(lastLocation => {
      let region = this.state.region;
      const latitudeDelta = 0.01;
      const longitudeDelta = 0.01;
      region = Object.assign({}, lastLocation, {
        latitudeDelta,
        longitudeDelta
      });
      this.setState({ locations: [lastLocation], region });
    }, (error) => {
      setTimeout(() => {
        Alert.alert('Error obtaining current location', JSON.stringify(error));
      }, 100);
    });

    BackgroundGeolocation.on('start', () => {
      // service started successfully
      // you should adjust your app UI for example change switch element to indicate
      // that service is running
      console.log('[DEBUG] BackgroundGeolocation has been started');
      this.setState({ isRunning: true });
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[DEBUG] BackgroundGeolocation has been stopped');
      this.setState({ isRunning: false });
    });

    BackgroundGeolocation.on('authorization', status => {
      console.log(
        '[INFO] BackgroundGeolocation authorization status: ' + status
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay after permission prompt or otherwise alert will not be shown
        setTimeout(() =>
          Alert.alert(
            'App requires location tracking',
            'Would you like to open app settings?',
            [
              {
                text: 'Yes',
                onPress: () => BackgroundGeolocation.showAppSettings()
              },
              {
                text: 'No',
                onPress: () => console.log('No Pressed'),
                style: 'cancel'
              }
            ]
        ), 1000);
      }
    });

    BackgroundGeolocation.on('error', ({ message }) => {
      Alert.alert('BackgroundGeolocation error', message);
    });

    BackgroundGeolocation.on('location', location => {
      console.log('[DEBUG] BackgroundGeolocation location', location);
      BackgroundGeolocation.startTask(taskKey => {
        console.log("acitivity1");
         AsyncStorage.setItem('loc',JSON.stringify(location));

        requestAnimationFrame(() => {
          const longitudeDelta = 0.01;
          const latitudeDelta = 0.01;
          const region = Object.assign({}, location, {
            latitudeDelta,
            longitudeDelta
          });
          const locations = this.state.locations.slice(0);
          locations.push(location);
          this.setState({ locations, region });
          BackgroundGeolocation.endTask(taskKey);
        });
      });
    });

    BackgroundGeolocation.on('stationary', (location) => {
      console.log('[DEBUG] BackgroundGeolocation stationary', location);
      BackgroundGeolocation.startTask(taskKey => {
        console.log("acitivity2");
        // console.log(location);
    //     AsyncStorage.getItem("tasks")
    // .then(value => {
    //   this.setState({ "tasks": value });
    // })
    // .done();
      AsyncStorage.setItem('loc',JSON.stringify(location));
      
              
        requestAnimationFrame(() => {
          const stationaries = this.state.stationaries.slice(0);
          if (location.radius) {
            const longitudeDelta = 0.01;
            const latitudeDelta = 0.01;
            const region = Object.assign({}, location, {
              latitudeDelta,
              longitudeDelta
            });
            const stationaries = this.state.stationaries.slice(0);
            stationaries.push(location);
            this.setState({ stationaries, region });
          }
          BackgroundGeolocation.endTask(taskKey);
        });
      });
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

  
        BackgroundGeolocation.start();
     
  }

  componentWillUnmount() {
    BackgroundGeolocation.events.forEach(event =>
      BackgroundGeolocation.removeAllListeners(event)
    );
  }

 

 
  render() {
    const { height, width } = Dimensions.get('window');
    const { locations, stationaries, region, isRunning } = this.state;
    return (
      <View style={styles.container}>
     
          <MapView style={{ width, height }} region={region}>
      
          </MapView>
      </View>
    );
  }
}

export default MapScreen;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
 
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});