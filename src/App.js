import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import BackgroundJob from 'react-native-background-job';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import React from 'react';

import {
  MainScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  AuthLoadingScreen,
  Dashboard,
  BgTracking,
  FingerPrint,
  ReportScreen
} from "./screens";

// const myJobKey = "testing";



// BackgroundJob.register({
//   jobKey: myJobKey,
//   job:async () =>  {
//     state = {
//       initialPosition: 'unknown',
     
//     };
//     Geolocation.getCurrentPosition(
//       position => {
//         const initialPosition = JSON.stringify(position);
//         this.setState({initialPosition});
//       },
//       error => Alert.alert('Error', JSON.stringify(error)),
//       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
//     );
    


//     const jsonValue = await AsyncStorage.getItem('location1');
         
        
//     if(jsonValue==null){
      
//      t=this.state.initialPosition;
//     }
//     else{
//   t=this.state.initialPosition;
//   t=t+jsonValue;
    
//     }
//        await AsyncStorage.setItem('location1', t);
  
//    }
// });


 
//  BackgroundJob.schedule({
//    jobKey:myJobKey,
//    period: 300000,
   
//  });
 
 



const Router = createStackNavigator(
  {
    MainScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
    AuthLoadingScreen,
    BgTracking,
    ReportScreen,
  
    FingerPrint
  },
  {
    initialRouteName: "AuthLoadingScreen",
    headerMode: "none"
  }
);

export default createAppContainer(Router);
