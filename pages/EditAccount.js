import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-community/picker';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Alert, Image, TouchableOpacity, TextInput, Button, Dimensions, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Global } from './Global';


class EditAccount extends React.Component {

  state = {
    user_id:'',
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    
    isErrors:false,
    errors:[],
    secureTextEntry: true,
    display:'none',
    loading:true,
    btncolor:'#0395fc',
    btnText:'Update',
    btnDisable:false
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



    async componentDidMount() {
        try {
           
           const uid = await AsyncStorage.getItem('user_id');
           const gender = await AsyncStorage.getItem('gender');
           this.setState({user_id:uid,'gender':gender})
           
           } catch (error) {
            console.log(error); 
           }
    
           this.getData();
        }




    getData=()=>
    {
        var url_editAccount=Global.active_server2+'api/GetUserData'
        
        fetch(url_editAccount, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body:JSON.stringify({user_id:this.state.user_id}),
            })
            .then((response) => response.json())
            .then((responseJson) => {

              console.log(responseJson)
                           
                if(responseJson.success===true)
                {
                    this.setState({
                        loading:false,
                        display:'flex',
                        firstname:responseJson.user.firstname,
                        lastname:responseJson.user.lastname,
                        email:responseJson.user.email,
                       
                    })
                }
                else if(responseJson.success===false)
                {
                    Alert.alert('Error','Something Went Wrong... Try Again...');
                }  
          
            })
            .catch((error) => {
               console.error(error);
            }); 

    }

    refresh=()=>{
      this.props.navigation.reset({
        routes: [{name: 'IShop '}],
      });
      this.props.navigation.navigate('IShop ', {
        screen: 'Profile'
      });
    }


    updateData=()=> {

      this.setState({
        btnDisable:true,
        btnText:"Please Wait...",
        btncolor:'grey'
      })
      
      var url_updateData=Global.active_server2+'api/UpdateUserData'

        fetch(url_updateData, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          customer_id:this.state.user_id,
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            gender:this.state.gender,
            email:this.state.email,
        }),
        })
        .then((response) => response.json())
        .then((responseJson) => {

            console.log(responseJson)

            this.setState({
              btncolor:'#0395fc',
              btnText:'Update',
              btnDisable:false
            }); 
        
            if(responseJson.success===true)
            {
                try {
                   
                    //AsyncStorage.setItem('user_id',responseJson.user.customer_id.toString());
                    AsyncStorage.setItem('email',responseJson.user.email);
                    AsyncStorage.setItem('fname',responseJson.user.firstname);
                    AsyncStorage.setItem('lname',responseJson.user.lastname);
                    AsyncStorage.setItem('gender',responseJson.user.gender);
                                    
                 } catch (error) {
                   console.log("Something went wrong", error);
                 }          

                this.setState({
                  isErrors:false,
                }); 
              Alert.alert(
                'Account Updated',
                'Your Account Details Successfully Updated...',[
                  {
                    text:"OK",
                    onPress:()=> this.refresh()
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
      
      <ScrollView>
        <View style={styles.header}>
            <Text style={styles.text_header}>My Account</Text>
        </View>
         <View style={styles.footer}> 
         
         <View style={styles.horizontal}>
          <ActivityIndicator size="large" color="#0394fc" animating={this.state.loading}/>
          </View>

         <View style={{display:this.state.display}}>
          
          
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
               value={this.state.firstname}
               underlineColorAndroid = "transparent"
               placeholder = "Enter First Name"
               onChangeText = {this.handleFname}/>

            <TextInput style = {styles.input}
               value={this.state.lastname}
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
               value={this.state.email}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Email Address"
               onChangeText = {this.handleEmail}/>
            </View>

            {/* <Text style={styles.text_footer}>Mobile No.</Text>
            <View style={styles.action}>
            <Ionicons name="call-outline" size={22}></Ionicons>
              <TextInput style = {styles.input}
               value={this.state.mobileno}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Mobile No."
               keyboardType='numeric'
               maxLength={10}
               onChangeText = {this.handleMobileno}/>
            </View> */}

          {/*   <Text style={styles.text_footer}>Password</Text>
            <View style={styles.action}>
            <Ionicons name="lock-closed-outline" size={22}></Ionicons>
             <TextInput style = {styles.input}
               value={this.state.password}
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
            </View> */}
                

                <TouchableOpacity disabled={this.state.btnDisable} onPress = {() => this.updateData()}>
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
export default EditAccount;
