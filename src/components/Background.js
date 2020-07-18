import React, { memo } from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
 
} from "react-native";

const Background = ({ children }) => (
 
    <KeyboardAvoidingView style={styles.container} behavior="padding">
     
      {children}


    </KeyboardAvoidingView>


 
);

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'white'
  }
});

export default memo(Background);
