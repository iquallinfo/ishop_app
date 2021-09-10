import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-community/picker';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Alert, Image, TouchableOpacity, TextInput, Button, Dimensions, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Global} from './Global';


class SignUp extends React.Component {

  state = {
    firstname: '',
    lastname: '',
    email: '',
    gender:'',
    
    password:'',
    isErrors:false,
    errors:[],
    secureTextEntry:true
 }
    handleFname = (text) => {
      this.setState({ firstname: text })
    }
    handleLname = (text) => {
        this.setState({ lastname: text })
      }
    handleEmail = (text) => {
      this.setState({ email: text })
    }
    handleMobileno = (text) => {
      this.setState({ mobileno: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
      }
      updateSecureTextEntry = () => {
        this.setState({ secureTextEntry: !this.state.secureTextEntry })
      }

    sendData() {

     
      
      var url_signup=Global.active_server2+'api/UserSignUp'

           fetch(url_signup, {
           method: 'POST',
           headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
           body:JSON.stringify({
             firstname:this.state.firstname,
             lastname:this.state.lastname,
             gender:this.state.gender,
             email:this.state.email,
             password:this.state.password
           }),
          
        })
        .then((response) => response.json())
        .then((responseJson) => {

         
        
           if(responseJson.success===true)
          {
            this.setState({
              isErrors:false,
            }); 
            Alert.alert(
              'Registration Success',
              'Your Account Successfully Created.',[
                {
                  text:"Login Now",
                  //onPress:()=>this.props.navigation.goBack()
                  onPress:()=>this.AutoLogin(responseJson.user_id)
                }
              ]);
            console.log('success')
          }
          else if(responseJson.success===false){

            var obj = responseJson.errors;
            var errors = Object.keys(obj).map(function (key) { return obj[key]; });
            
              this.setState({
              isErrors:true,
              errors:errors
            }); 
            this.scroll.scrollTo({ x: 0 }) 
           
          }  
      
        })
        .catch((error) => {
           console.error(error);
        }); 
      
    }

    AutoLogin=(user_id)=>{

      try {
              
        AsyncStorage.setItem('user_id',user_id.toString());
        AsyncStorage.setItem('email',this.state.email);
        AsyncStorage.setItem('gender',this.state.gender);
        AsyncStorage.setItem('fname',this.state.firstname);
        AsyncStorage.setItem('lname',this.state.lastname);

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
                this.props.navigation.navigate('IShop ', {
                  screen: 'Profile'
                });
              }
          }
        );                 
     } catch (error) {
       console.log("Something went wrong", error);
     }   
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
       ref={(node)=>this.scroll=node}
       keyboardShouldPersistTaps='handled'>
      
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
         <View style={styles.footer}>  
            {
              this.state.isErrors===true ?(
                <View style={styles.error_section}>
                <Text style={{color:'black',fontWeight:'bold'}}>Please Correct Following Fields...</Text>
                {this.list()}
                </View>):(<View></View>)
            }      


            <Text style={styles.text_footer}>Name</Text>
            <View style={styles.action}>
            <Ionicons name="person-outline" size={22}></Ionicons>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter First Name"
               onChangeText = {this.handleFname}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Last Name"
               onChangeText = {this.handleLname}/>
            </View>  


            <Text style={styles.text_footer}>Gender</Text>
            <View style={styles.action}>
            <Ionicons name="male-female-outline" size={22}></Ionicons>
            <Picker style={styles.input}
              selectedValue={this.state.gender}
              onValueChange={(itemValue, itemIndex) => this.setState({gender:itemValue})}>
              <Picker.Item color='grey' label="Select Gender" value=""/>
              <Picker.Item label="Male" value="male"/>
              <Picker.Item label="Female" value="female"/>
             
            </Picker>
              </View>

            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
            <Ionicons name="mail-outline" size={22}></Ionicons>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Email Address"
               onChangeText = {this.handleEmail}/>
            </View>

           {/*  <Text style={styles.text_footer}>Mobile No.</Text>
            <View style={styles.action}>
            <Ionicons name="call-outline" size={22}></Ionicons>
              <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Mobile No."
               keyboardType='numeric'
               maxLength={10}
               onChangeText = {this.handleMobileno}/>
            </View> */}

            <Text style={styles.text_footer}>Password</Text>
            <View style={styles.action}>
            <Ionicons name="lock-closed-outline" size={22}></Ionicons>
             <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Password"
               secureTextEntry={this.state.secureTextEntry}
               onChangeText = {this.handlePassword}/> 

                <TouchableOpacity
                    onPress={()=>this.updateSecureTextEntry()}>
                    {this.state.secureTextEntry ? 
                    <Ionicons name="eye-outline" size={25}></Ionicons>
                    :
                    <Ionicons name="eye-off-outline" size={25}></Ionicons>
                    }
                </TouchableOpacity> 

            </View>
                

                <TouchableOpacity onPress = {() => this.sendData()}>
                <LinearGradient
                colors={['#0395fc', '#0395fc']}
                style={styles.registerBtn}>                        
                        <Text style={styles.registerBtnText}>Register</Text>
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
     backgroundColor: '#0395fc'
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
export default SignUp;
