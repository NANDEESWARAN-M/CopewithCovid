import React,{memo,useState} from 'react';
import { View, Text, StyleSheet, StatusBar,Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { logoutUser } from "../api/auth-api";
import Button from "../components/Button";
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';
import vision from '@react-native-firebase/ml-vision';
import ImagePicker from 'react-native-image-picker';
import { utils } from '@react-native-firebase/app';
import firebase from "firebase/app";
import "firebase/auth";
import Mailer from 'react-native-mail';
import FingerPrint from './FingerPrint';
import { useNavigation } from '@react-navigation/native';
import { cond } from 'react-native-reanimated';
const storeData = async () => {
  // const jsonValue = await AsyncStorage.getItem('locc');
 

// if(jsonValue==null){
//   var hours = new Date().getHours(); 
//   var min = new Date().getMinutes(); 
//   var sec = new Date().getSeconds();
// t=hours.toString()+min.toString();
// }
// else{
//   var hours = new Date().getHours(); 
//   var min = new Date().getMinutes(); 
//   var sec = new Date().getSeconds();
// t=hours.toString()+min.toString();
// t=t+jsonValue;

// }
var t="1591381800000|12.9999|79.3032,1594660727353|12.9494|79.3032,1594660727353|12.9494|79.3032,1594660727353|12.9494|79.3032"
  try {
    
    await AsyncStorage.setItem('aaday', t);
  } catch (e) {
    Alert.alert("title","error");
  }
}
const getData = async () => {
  
  
  try {
    const jsonValue = await AsyncStorage.getItem('aaday')
    if(jsonValue !== null) {
    Alert.alert("sample",jsonValue);
    }
  } catch(e) {
    Alert.alert("title","error");

  }
}

const sendData = async () => {
  console.log("inside send data function");
  const user = firebase.auth().currentUser;
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var markdate=date+"-"+month+"-"+year;
  var adaydata=await AsyncStorage.getItem('aaday');
  var data=adaydata.split(',');
  var latdata='';
  var londata='';
  var durationofweekinmillis=24*3600*1000*7;
  for(var i=0;i<data.length;i++){
    var temp=data[i].split('|');
  var datetime=temp[0];
  if(Date.now()-datetime<=durationofweekinmillis){
    var la=temp[1];
    var lo=temp[2];
    if(latdata==''){
latdata=la;
londata=lo;

    }
    else{
      latdata=latdata+','+la;
      londata=londata+','+lo;
    }
  }

    


  }
if (user) {
//  console.log('User email: ', user.uid);
var str1="/";
var str2=user.uid.toString();
var id=str1.concat(str2);
console.log(id);

 database()
  .ref(id)
  .update({
    cat: "PR",
  })
  // .set({
  //   [markdate]:{

  //     lat: latdata,
  //     lon:londata
  //   },
  //   cat:"R"
  // })
  .then(() => console.log('Data set.'));
}

}

const recvData = async () => {
  console.log("inside recv data function");
  database()
  .ref('/users/123')
  .once('value')
  .then(snapshot => {
    console.log('User data: ', snapshot.val());
  });
}


async function processDocument(localPath) {
  const processed = await vision().textRecognizerProcessImage(localPath);

  console.log('Found text in document: ', processed.text);

  


}
const chooseImage = async () => {
   
  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true,
    },
  };
  ImagePicker.showImagePicker(options, response => {
    // console.log('Response = ', response);
// const localPath;
    if (response.didCancel) {
      console.log('User cancelled photo picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      let source = {uri: response.uri};
let localPath=source.uri;
localPath=localPath.substring(36);
let localFile=`${utils.FilePath.PICTURES_DIRECTORY}/${localPath}`;
processDocument(localFile).then(() => console.log('Finished processing file.'));


    }
  });
  

  
}


const sendEmail = async () => {


  Mailer.mail({
    subject: 'need help',
    recipients: ['nandeeswaran.murugan.1997@gmail.com'],
    // ccRecipients: ['supportCC@example.com'],
    // bccRecipients: ['supportBCC@example.com'],
    body: '<b>A Bold Body</b>',
    isHTML: true,
    // attachments: [{
    //   path: '',  // The absolute path of the file from which to read data.
    //   type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
    //   // mimeType - use only if you want to use custom type
    //   name: '',   // Optional: Custom filename for attachment
    // }]
  }, (error, event) => {
    Alert.alert(
      error,
      event,
      [
        {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
        {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
      ],
      { cancelable: true }
    )
  });









}
  








const HomeScreen = ({navigation}) => {
  
  // const navigation = useNavigation();
  const { colors } = useTheme();

  const theme = useTheme();
  const uCyr=()=>{


 console.log("uCyr");
  }
    return (
    
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <Text style={{color: colors.text}}>Home Screen</Text>
 
         {/* <Button mode="outlined" onPress={() => logoutUser()}>
      Logout
    </Button> 
    <Button mode="outlined" onPress={()=>storeData()}>
      store
    </Button>
    <Button mode="outlined" onPress={()=>getData()}>
      display 
    </Button>
    <Button mode="outlined" onPress={()=>sendData()}>
Send data
</Button>
<Button mode="outlined" onPress={()=>recvData()}>
Receive data
</Button>
<Button mode="outlined" onPress={()=>chooseImage()}>
choose Image for scan
</Button>
<Button mode="outlined" onPress={() => uCyr()}>
Fingerprint
</Button> */}
  <Button mode="outlined" onPress={()=>sendEmail()}>
      send Email
    </Button>
      </View>

      
    );
   
};

export default memo(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
 
});
