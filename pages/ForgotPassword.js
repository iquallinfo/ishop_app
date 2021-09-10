import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Alert, Image, TouchableOpacity, TextInput, Button, Dimensions, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Global } from './Global';


class ForgotPassword extends React.Component {

  state = {
    email:'',
    isErrors:false,
    errors:[],
    btncolor:'#0395fc',
    btnText:'Send Reset Link',
    btnDisable:false
 }
    
  



 sendResetLink=()=> {

      this.setState({
        btnDisable:true,
        btnText:"Please Wait...",
        btncolor:'grey'
      })
      
      var url_updateData=Global.active_server2+'api/ForgotPassword'

        fetch(url_updateData, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            email:this.state.email
        }),
        })
        .then((response) => response.json())
        .then((responseJson) => {

            console.log(responseJson)

            this.setState({
              btncolor:'#0395fc',
              btnText:'Send Reset Link',
              btnDisable:false
            }); 
        
            if(responseJson.success===true)
            {
                this.setState({
                  isErrors:false,
                }); 
              Alert.alert(
                'IQ Shopping',
                'Password Reset Link Successfully Send To Your Email Address...',[
                  {
                    text:"OK",
                    onPress:()=> this.setState({email:''})
                  }
                ]);
              
            }
            else if(responseJson.success===false){

              var obj = responseJson.errors;
              var errors = Object.keys(obj).map(function (key) { return obj[key]; });
              
                this.setState({
                isErrors:true,
                errors:errors
              }); 
  
               
              console.log(this.state.errors)
              //Alert.alert('Error','Invalid Form Details... Please Check...');
            } 
      
        })
        .catch((error) => {
           console.error(error);
        }); 
      
    }

    list = () => {
      return this.state.errors.map((element,index) => {
        return (
          <View style={{marginLeft:5}} key={index}>
            <Text>{element}</Text>
          </View>
        );
      });
    };




  render() {
    return (
      <View style = {styles.container}>
      <ScrollView
      keyboardShouldPersistTaps='handled'
      >
        <View style={styles.header}>
            <Text style={styles.text_header}>Forgot Password</Text>
        </View>
         <View style={styles.footer}> 
         
      

         <View>
          
          
         {
              this.state.isErrors===true ?(
                <View style={styles.error_section}>
                <Text style={{color:'black',fontWeight:'bold'}}>Please Correct Following Fields...</Text>
                {this.list()}
                </View>):(<View></View>)
            }   

            

            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
            <Ionicons name="mail-outline" size={22}></Ionicons>
            <TextInput 
                value={this.state.email}
               style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Registred Email Address"
               onChangeText = {(value)=>this.setState({email:value})}/>
            </View>
                

                <TouchableOpacity disabled={this.state.btnDisable} onPress = {() => this.sendResetLink()}>
                <LinearGradient
                colors={[this.state.btncolor,this.state.btncolor]}
                style={styles.registerBtn}>                        
                        <Text style={styles.registerBtnText}>{this.state.btnText}</Text>
                </LinearGradient>
                </TouchableOpacity>              
                </View> 
                </View>
                </ScrollView>
         </View>
    );
  }
}
const dwidth=Dimensions.get('window').width
const dheight=Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
     flex: 1, 
     backgroundColor: '#0395fc',
  },
  horizontal: {
    flexDirection: "row",
    alignSelf:'center',
    flex:1,
    position:'absolute',
    marginTop:230
  },
  header: {
   marginTop:35,
   alignSelf:'center'
},
footer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop:50,
    height:Dimensions.get('window').height   
},
action: {
  flexDirection: 'row',
  marginTop: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#f2f2f2',
  paddingBottom: 5
},
text_footer: {
  color: '#05375a',
  fontSize: 15,
  marginTop:10
},
text_header: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 30,
},
  input: {
    flex: 1,
    marginTop:-12,
    paddingLeft: 10,
    color: '#05375a',
  },

  registerBtn:{
    borderRadius:30,
    marginTop:20,
    alignItems:'center',
    backgroundColor:'green',
    elevation:4
  },
  registerBtnText:{
      fontSize:18,
      color:'#ffffff',
      fontWeight:'bold',
      padding:15
  },
  form:{
    marginTop:15
  },
  error_section:{
    backgroundColor:'#fcd2d2',
    marginLeft:10,
    marginRight:10,
    borderRadius:20,
    padding:10
  }
 
})
export default ForgotPassword;
