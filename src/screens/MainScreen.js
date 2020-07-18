import React from 'react';
import { View,Text,StyleSheet,Image, Dimensions,TouchableOpacity} from "react-native";
import 'react-native-gesture-handler';
import Swiper from "react-native-swiper";
import * as Animatable from "react-native-animatable";
export default class MainScreen extends React.Component{
constructor(props){
    super(props);
    this.state={
        animation_signup:null,
        animation_login:null,
        show:false
    }
}


onIndexChanged(index){
    if(index==3){
        this.setState({
            animation_signup:"bounceInLeft",
            animation_login:"bounceInRight",
            show:true
        });
    }
    else{
        this.setState({
            animation_login:null,
            animation_login:null,
            show:false
        });
    }
    
}
render(){

return(

   <Swiper
   loop={false}
   dot={<View style={styles.dot} />}
   activeDot={<View style={styles.activeDot} />}
   
   onIndexChanged={(index)=>this.onIndexChanged(index)}
   >
       <View style={styles.sildes}>
           <View style={styles.headerr}>
                <Image
                    source={require("../assets/asset1.png")}
                    style={styles.image}
                    resizeMode={"stretch"}
                />
           </View>
           <View style={styles.footer}>
                <Text style={styles.title}>Cloud storage</Text>
                <Text style={styles.text}>Cloud storage some text</Text>

           </View>
       </View>

 



       <View style={styles.sildes}>
           <View style={styles.headerr}>
                <Image
                    source={require("../assets/asset2.png")}
                    style={styles.image}
                    resizeMode={"stretch"}
                />
           </View>
           <View style={styles.footer}>
                <Text style={styles.title}>Cure For Covid</Text>
                <Text style={styles.text}>It is an mobile that helps in controlling the spread of corona</Text>

           </View>
       </View>
       
      
       <View style={styles.sildes}>
           <View style={styles.headerr}>
                <Image
                    source={require("../assets/asset3.png")}
                    style={styles.image}
                    resizeMode={"stretch"}
                />
           </View>
           <View style={styles.footer}>
                <Text style={styles.title}>Cloud storage</Text>
                <Text style={styles.text}>Cloud storage some text</Text>

           </View>
       </View>

       <View style={styles.sildes}>
           <View style={styles.headerr}>
                <Image
                    source={require("../assets/asset4.png")}
                    style={styles.image}
                    resizeMode={"stretch"}
                />
           </View>
           <View style={styles.footer}>
                <Text style={styles.title}>Cloud storage</Text>
                <Text style={styles.text}>Cloud storage some text</Text>
           
           
           {this.state.show ?

            <View style={{flexDirection:"row"}}>
                <Animatable.View
                animation={this.state.animation_signup}
                delay={0}
                duration={1500}
                userNativeDriver>
                    <TouchableOpacity 
                    onPress={()=>this.props.navigation.navigate("RegisterScreen")}
                    style={[styles.button,{
                            borderColor:'#3465d9',
                            borderRadius:50,
                            borderWidth:1,
                            marginTop:15
                    }]}>
                        <Text style={{color:'#3465d9'}}>Sign Up</Text>

                    </TouchableOpacity>
                    </Animatable.View>
                    <Animatable.View
                animation={this.state.animation_login}
                delay={0}
                duration={1500}
                userNativeDriver>
                    <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate("LoginScreen")}
                  
                    style={[styles.button,{
                            borderColor:'#3465d9',
                            borderRadius:50,
                            marginTop:15,
                            marginLeft:20,
                            backgroundColor:"#3465d9"
                    }]}>
                        <Text style={{color:'white'}}>Login</Text>

                    </TouchableOpacity>
                    </Animatable.View>
                 
                </View>
                :null}
           </View>
       </View>
   </Swiper>
)

}


}

const {width, height}=Dimensions.get("screen");
const height_image=height*0.5*0.8;
const width_image=height_image*1.1;
const width_button=width*0.3;
var styles=StyleSheet.create({
    sildes:
    {
        flex:1,
        backgroundColor:'white'
    },
    headerr:{
        flex:2,
        justifyContent:"center",
        alignItems:"center"

    },
    footer:{
        flex:1,
        alignItems:"center",
        paddingHorizontal:20
    },
    image:{
        height:height_image,
        width:width_image
    },
    title:{
        fontSize:25,
        fontWeight:"bold",
        color:"#3465d9",
        textAlign:'center'
    },
    text:{
        marginTop:20,
        color:"gray",
        textAlign:'center'
    },
    dot:{
        backgroundColor:'rgba(52,101,217,.4)',
        width:8,
        height:8,
        borderRadius:5,
        marginHorizontal:5,
        marginVertical:3
    },
    activeDot:{
        backgroundColor:'#3465d9',
        width:8,
        height:8,
        borderRadius:5,
        marginHorizontal:5,
        marginVertical:3
    },
    button:{
        width:width_button,
        height:40,
        justifyContent:"center",
        alignItems:"center"

    }
});