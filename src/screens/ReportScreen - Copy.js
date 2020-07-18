import React,{memo} from 'react';
import { View, Text, Button, StyleSheet,Image,Dimensions } from 'react-native';


const ReportScreen = () => {
    return (
      
           <View style={styles.body}>
                <Image
                    source={require("../assets/report.jpg")}
                    style={styles.image}
                    resizeMode={"stretch"}
                />
           </View>
         
     
    );
};

export default memo(ReportScreen);
const {width, height}=Dimensions.get("screen");
const height_image=height*0.5*0.8;
const width_image=height_image*1.1;
const styles = StyleSheet.create({
  body:{
    flex:2,
    justifyContent:"center",
    alignItems:"flex-end"
   

},
image:{
  height:height_image,
  width:width_image
}
});
