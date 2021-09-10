import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert, Image, TextInput, Button, Dimensions, ToastAndroid } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Global} from './Global';

class Login extends Component {

  constructor(props)
    {
        super(props);
        this.state = {
            user_id:'',
            fname: '',
            lname:'',
            email:'',
            getEmail:'',
            getPassword:'',
            loginBtnColor:'#0395fc',
            loginBtnDisable:false,
            loginBtnTxt:'Login',
            product_id:'',
            secureTextEntry:true
            
         } 

       
        
    }

    
  
    handleEmail = (text) => {
      this.setState({ 
        getEmail:text
       })
    }
    handlePassword = (text) => {
      this.setState({ 
        getPassword:text
       })
    }
    updateSecureTextEntry = () => {
      this.setState({ secureTextEntry: !this.state.secureTextEntry })
    }

      
    sendData() {

      this.setState({ 
        loginBtnColor:'grey',
        loginBtnTxt:'Please Wait...',
        loginBtnDisable:true
       })
      
      var url_login=Global.active_server2+'api/Login'

           fetch(url_login, {
           method: 'POST',
           headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
           body:JSON.stringify({'email':this.state.getEmail,'password':this.state.getPassword}),
          
        })
        .then((response) => response.json())
        .then((responseJson) => {

          console.log(responseJson)

           this.setState({ 
            loginBtnColor:'#0395fc',
            loginBtnTxt:'Login',
            loginBtnDisable:false
           })

            if(responseJson.success==true)
            {
                try {
                   
                    AsyncStorage.setItem('user_id',responseJson.user[0].id.toString());
                    AsyncStorage.setItem('email',responseJson.user[0].email);
                    AsyncStorage.setItem('gender',responseJson.user[0].gender);
                    AsyncStorage.setItem('fname',responseJson.user[0].firstname);
                    AsyncStorage.setItem('lname',responseJson.user[0].lastname);

                    ToastAndroid.show("Login Success...", ToastAndroid.SHORT);

                    AsyncStorage.getItem('product_id').then(value =>
                      {
                          if(value!=null)
                          {
                            this.props.navigation.reset({
                              routes: [{name: 'IShop '}],
                            });
                            this.props.navigation.navigate('Product Details',{id:value,afterLogin:true})
                          }
                          else
                          {
                            this.props.navigation.reset({
                              routes: [{name: 'IShop '}],
                            });
                          }
                      }
                    );                 
                 } catch (error) {
                   console.log("Something went wrong", error);
                 }          
                 
            }
            else{
                Alert.alert('IQ Shopping','Invalid Login Details... Please Try Again..')
            } 
      
        })
        .catch((error) => {
           console.error(error);
        }); 
    }

   

  render() {

    


    return (
      <View style = {styles.container}>
        <ScrollView>

      

        <View style={styles.footer}>  

            <View style={styles.header}>
            <Ionicons name="lock-closed-outline" size={23}/>
            <Text style={styles.text_header}>Login</Text>
            </View>

        <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
            <Ionicons 
            name="mail-outline" size={22}></Ionicons>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Email Address"
               onChangeText = {this.handleEmail}/>
            </View>

            <Text style={styles.text_footer}>Password</Text>
            <View style={styles.action}>
            <Ionicons name="lock-closed-outline" size={22}></Ionicons>
             <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Password"
               secureTextEntry={this.state.secureTextEntry}
               onChangeText = {this.handlePassword}/> 

                <TouchableOpacity
                    onPress={()=>this.updateSecureTextEntry()}
                >
                    {this.state.secureTextEntry ? 
                    <Ionicons name="eye-outline" size={25}></Ionicons>
                    :
                    <Ionicons name="eye-off-outline" size={25}></Ionicons>
                    }
                </TouchableOpacity> 



            </View>


            <TouchableOpacity disabled={this.state.loginBtnDisable} onPress = {() => this.sendData()}>
                <LinearGradient
                colors={[this.state.loginBtnColor,this.state.loginBtnColor]}
                style={styles.loginBtn}>                        
               <Text style={styles.loginBtnText}>{this.state.loginBtnTxt}</Text>
                </LinearGradient>
                </TouchableOpacity>    

                <View style={{alignSelf:'flex-end',marginTop:10,marginRight:10}}>
                  <Text onPress={()=>this.props.navigation.navigate('Forgot Password')}>Forgot Password?</Text>
                </View>
            
                </View>

                <View style={styles.signupFooter}>
                    <Text style={styles.orTxt}>OR</Text>
                    <Text style={styles.orTxt}>Don't have an account ?</Text>
                    <TouchableOpacity onPress = {()=> this.props.navigation.navigate('Sign Up')}>
                    <LinearGradient
                    colors={['#0395fc', '#0395fc']}
                    style={styles.registerBtn}>                        
                    <Text style={styles.registerBtnText}>Register Now</Text>
                    </LinearGradient>
                    </TouchableOpacity> 
                </View> 

                </ScrollView>
         </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
     flex: 1,
  },
  header: {
   flexDirection:'row',
   alignSelf:'center',
   marginTop:45
  },
  footer: {
    backgroundColor: '#fff',
    marginTop:-10,
    margin:8,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    elevation:5
  },
  signupFooter: {
    backgroundColor: '#fff',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    margin:6,
    elevation:15,
    marginTop:20,
    height:240
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
  color: '#575757',
  fontSize: 22,
  marginTop:-2
  },
  input: {
    flex: 1,
    marginTop:-12,
    paddingLeft: 10,
    color: '#05375a',
  },
  submitButton: {
     backgroundColor: '#7a42f4',
     padding: 10,
     margin: 15,
     height: 40,
  },
  headText:{
    textAlign:'center',
    fontSize:20,
    padding:13
  },
  loginBtn:{
    marginTop:20,
    alignItems:'center',
    backgroundColor:'#03b000',
    borderRadius:20,
    elevation:5,
    marginBottom:10
  },
  loginBtnText:{
      fontSize:18,
      color:'#ffffff',
      fontWeight:'bold',
      padding:15
  },
  registerBtn:{
    marginTop:15,
    marginBottom:25,
    alignItems:'center',
    backgroundColor:'#03bafc',
    marginLeft:70,
    marginRight:70,
    borderRadius:25,
    elevation:3,
    marginBottom:10
  },
  registerBtnText:{
      fontSize:18,
      color:'#ffffff',
      fontWeight:'bold',
      padding:15
  },
  orTxt:{
      textAlign:'center',
      marginTop:15,
      fontSize:17,
      color:'grey',
     
  }
 
})
export default Login;
