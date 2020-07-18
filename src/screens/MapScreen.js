import React, { PureComponent } from 'react';
import { StyleSheet, View, Alert, Dimensions } from 'react-native';
import MapView from "react-native-map-clustering";
import  { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import TrackingDot from '../assets/TrackingDot.png';
import AsyncStorage from '@react-native-community/async-storage';

import database from '@react-native-firebase/database';
import { color, cond } from 'react-native-reanimated';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';
import { getActiveChildNavigationOptions } from 'react-navigation';

class MapScreen extends PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      // INITIAL_REGION:null,
      currentlat:0.0,
      currentlon:0.0,
      reports:[],
      region: null,
      locations: [],
      stationaries: [],
   
    };

  }

  componentDidMount() {

    console.log('map did mount');

    const handleHistoricLocations = locations => {
      let region = null;
      const now = Date.now();
      const latitudeDelta = 0.01;
      const longitudeDelta = 0.01;
      const durationOfDayInMillis = 24 * 3600 * 1000;

      const locationsPast24Hours = locations.filter(location => {
        return now - location.time <= durationOfDayInMillis;
      });

      if (locationsPast24Hours.length > 0) {
        // asume locations are already sorted
        const lastLocation =
          locationsPast24Hours[locationsPast24Hours.length - 1];
        region = Object.assign({}, lastLocation, {
          latitudeDelta,
          longitudeDelta
        });
      }
      this.setState({ locations: locationsPast24Hours, region });
    };

requestAnimationFrame(()=>{

  database()
  .ref('/')
  .once('value')
  .then(snapshot=>{
   
      let data=snapshot.toJSON();
       
          for(var u in data){
            var lat=data[u]["lat"];
            var lon=data[u]["lon"];
            lat=lat.split(',');
            lon=lon.split(',');
           
            for (var i = 0; i < lat.length; i++) {
             let r={"lat":parseFloat(lat[i]),"lon":parseFloat(lon[i])};
          
             const newarray = this.state.reports.slice(0);
            
             newarray.push(r);
             this.setState({reports:newarray});
            
           }
      
        
           }
      
     

      })

   
});




    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
     interval:60000,
 
    });

    BackgroundGeolocation.getCurrentLocation(lastLocation => {
            this.setState({ currentlat:lastLocation.latitude, currentlon:lastLocation.longitude });
            

    }, (error) => {
      setTimeout(() => {
        Alert.alert('Error obtaining current location', JSON.stringify(error));
      }, 100);
    });

    BackgroundGeolocation.on('start', () => {
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



        var lat=location.latitude;
        var lon=location.longitude;
        var time=location.time;
        // lat=lat.toString();
        // lon=lon.toString();
        // time=time.toString();
        var values =  AsyncStorage.getItem('aaday');
        console.log("--");
        console.log(values);
        // values=values.toString();
        if(values !== null) {
          console.log("if");

         var newvalue=values.toString()+','+lat.toString()+'|'+lon.toString()+'|'+time.toString();
         console.log(newvalue)
        AsyncStorage.setItem('aaday',newvalue);

        }
        else{
          console.log("else");
          var v=lat.toString()+'|'+lon.toString()+'|'+time.toString();
          console.log(v);
          AsyncStorage.setItem('aaday',v);
        }






 





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


    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

  
        // BackgroundGeolocation.start();
     
  }

  componentWillUnmount() {
    BackgroundGeolocation.events.forEach(event =>
      BackgroundGeolocation.removeAllListeners(event)
    );
  }


 
  render() {
    const{reports,currentlat,currentlon,locations,stationaries,region}=this.state;

    const INITIAL_REGION = {
      latitude: currentlat,
      longitude: currentlon,
      latitudeDelta: 5,
      longitudeDelta:5,
    };
  
// console.log(reports);
// console.log(stationaries);
// console.log(region);
    return (
      <MapView initialRegion={INITIAL_REGION} style={{ flex: 1 }} clusterColor="#FF0000">
    <Marker coordinate={{ latitude: this.state.currentlat, longitude: this.state.currentlon}} pinColor="#228B22" />
    {reports.map((report, idx) => (
              <Marker
                key={idx}
                coordinate={{ latitude: report.lat, longitude: report.lon }}
           
              />
            ))}
  </MapView>
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