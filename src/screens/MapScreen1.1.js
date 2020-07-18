import React,{memo,useEffect} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';



const MapScreen=({navigation})=>{
  const { colors } = useTheme();
 
  const theme = useTheme();
const[latitude,setLat]=React.useState(0);
const[longitude,setLon]=React.useState(0);
const[latitudeDelta,setLatd]=React.useState(0);
const[longitudeDelta,setLond]=React.useState(0);


React.useEffect(() => {
 
		Geolocation.getCurrentPosition(
			position => {
       console.log(position.latitude);
        setLat(position.latitude);
        setLon(position.longitude);
        setLatd(position.latitudeDelta);
        setLond(position.longitudeDelta);
      
		
			},
			error => Alert.alert('Error', JSON.stringify(error)),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);

}, [])







    return (
  
      <View style={styles.container}>
             <MapView
             
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta:longitudeDelta,
   
       }}
     >
       <Marker coordinate={{ latitude:latitude, longitude: longitude }} />
     </MapView>
   
      </View>
    );

}

export default memo(MapScreen);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
 
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
 