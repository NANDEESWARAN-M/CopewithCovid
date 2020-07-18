import React,{memo,useState} from 'react';
import { View, Text, StyleSheet,Image,Dimensions ,ScrollView, Alert} from 'react-native';
import Background from "../components/Background";
import Helper from "../components/Helper";
import Button from "../components/Button";
import Unorderedlist from 'react-native-unordered-list';
import { color, set } from 'react-native-reanimated';

import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';
import vision from '@react-native-firebase/ml-vision';
import ImagePicker from 'react-native-image-picker';
import { utils } from '@react-native-firebase/app';
import firebase from "firebase/app";

async function processDocument(localPath) {
  const isuseralreadyreported=0;
  const processed = await vision().textRecognizerProcessImage(localPath,{
    // The document contains Kurdish
    languageHints: ['EN'],
  }).catch(Alert.alert("error","error with the image"));

  console.log('Found text in document: ', processed.text);
var result=true;
if(result){
Alert.alert("Results","It is verified.Thank you for your help.Stay calm everything is gonna be alright.We will inform peole you might have been in contact with you for the past few days ");

var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();

Alert.alert(date + '-' + month + '-' + year);

database()
.ref('/')
.once('value')
.then(snapshot=>{
const user = firebase.auth().currentUser;

let data=snapshot.toJSON();
for(var u in data){
  if(user==u){
    // console.log("user already reported");
   isuseralreadyreported=1;
  }
}
});
if(isuseralreadyreported){
  const user = firebase.auth().currentUser;
  if (user) {
 
    var str1="/";
    var str2=user.uid.toString();
    var id=str1.concat(str2);
    console.log(id);
    
     database()
      .ref(id)
      .set({
        cat:"R"
      })
      .then(() => console.log('Data set.'));
    }
  
  
  console.log("user already reported");
 

}else
{
  const user = firebase.auth().currentUser;
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var markdate=date+"-"+month+"-"+year;
  var adaydata=await AsyncStorage.getItem('aaday');
  var data=adaydata.split(',');
  var latdata='';
  var londata='';
 
  for(var i=0;i<data.length;i++){
    var temp=data[i].split('|');
  var datetime=temp[0];
  
     la=temp[1];
    lo=temp[2];
    latdata=latdata+','+la;
    londata=londata+','+lo;


  }
  if (user) {
 
  var str1="/";
  var str2=user.uid.toString();
  var id=str1.concat(str2);
  console.log(id);
  
   database()
    .ref(id)
    .set({
      [markdate]:{

        lat: latdata,
        lon:londata
      },
      cat:"R"
    })
    .then(() => console.log('Data set.'));
  }

  console.log("user not reported so far");
}



// var todaysdate=Date.now();
// var last1weekdata=getlast1weekdatawithdate(todaysdate);
// var latdata=getlat(last1weekdata);
// var londata=getlon(last1weekdata);
// const user = firebase.auth().currentUser;

// if (user) {

// var str1="/";
// var str2=user.uid.toString();
// var id=str1.concat(str2);
// console.log(id);

//  database()
//   .ref(id)
//   .set({
//     lat: latdata,
//     lon: londata,
//     date:todaysdate
//   })
//   .then(() => console.log('Data set.'));
// }



}
else{

  Alert.alert("Results","It doesn't look like a test result")
}


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
const ReportScreen = () => {
  const [loading, setLoading] = useState(false);



    return (
     
          <ScrollView >
            <Background>
                <Image
                    source={require("../assets/report.jpg")}
                    style={styles.image}
                  
                />
     <Text style={styles.quote}>{" \"Be the hero! Help Others ! Be the Help this world needs!.If tested positive for Covid-19 Please Report.\""}</Text>
      <Button style={styles.b} loading={loading} mode="contained" onPress={()=>chooseImage()}>
        Report
      </Button>
   
 
 <Unorderedlist ><Text>Instruction</Text>
      <Unorderedlist><Text>Click the Report Button</Text></Unorderedlist>
      <Unorderedlist><Text>Verify the action by Finger Print Security Code</Text></Unorderedlist>
      <Unorderedlist><Text>Choose or Caputure a Picture of the Test Result</Text></Unorderedlist>
      <Unorderedlist><Text>If the Test is Verified .It will be Reported to local health center and caution signal will be sent to people you have been in contact for the past 7 days</Text></Unorderedlist>
        <Unorderedlist><Text>Thats it You have Helped many out there</Text></Unorderedlist>
         
     
  </Unorderedlist>
  <Unorderedlist ><Text>Important Note</Text>
      <Unorderedlist ><Text>Section 468 in the Indian Penal Code: Forgery for purpose of cheating—Whoever commits forgery, intending that the document or electronic record forged shall be used for the purpose of cheating, shall be punished with imprisonment of either description for a term which may extend to seven years</Text></Unorderedlist>
      <Unorderedlist ><Text>Don't Forgery the Test Result</Text></Unorderedlist>
     
  </Unorderedlist>

  </Background>
         </ScrollView>
         
     
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
image: {
  width: 200,
  height: 190,
  marginBottom: 12,
},
quote: {
  fontSize: 20,
  color:'#009387',
  fontWeight: "bold",
  fontStyle:"italic"
},
container: {
  flex: 1,
  padding: 20,
  width: "100%",
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:'white'
},
b:{
  backgroundColor:'#20B2AA',
  borderColor:"#009387",
  width:"50%"
}

});
