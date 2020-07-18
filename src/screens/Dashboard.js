import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { logoutUser } from "../api/auth-api";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Icon from 'react-native-vector-icons/FontAwesome';

import ReportScreen from './ReportScreen';
import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';
import InfoScreen from './InfoScreen';
import FingerPrint from './FingerPrint';
const Tab = createMaterialBottomTabNavigator();

const MapStack =createStackNavigator();
const HomeStack = createStackNavigator();
const Dashboards = () => (
<Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Report"
        component={FingerPrint}
        options={{
          tabBarLabel: 'Report',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Info"
        component={InfoScreen}
        options={{
          tabBarLabel: 'Info',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
           <Tab.Screen
        name="Maps"
        component={MapStackScreen}
        options={{
          tabBarLabel: 'Maps',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />

          ),
        }}
      />
      
    </Tab.Navigator>
    /* <Button mode="outlined" onPress={() => logoutUser()}>
      Logout
    </Button> */
 
);
const MapStackScreen = ({navigation}) => (
  <MapStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#d02860',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <MapStack.Screen name="MapScreen" component={MapScreen} options={{
          title:'Overview'
          }} />
  </MapStack.Navigator>
  );



const Dashboard = () => {
  return (
    <NavigationContainer>
      <Dashboards />
    </NavigationContainer>
  );
};
export default memo(Dashboard);
