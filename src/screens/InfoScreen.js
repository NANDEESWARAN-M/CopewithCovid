import React,{memo} from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {WebView} from 'react-native-webview'
const InfoScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
  
    return (
      <WebView source={{ uri: 'https://www.covid19india.org/' }} />
    );
};
  
export default memo(InfoScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
