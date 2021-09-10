import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Alert, Image, TextInput, TouchableOpacity, Button, Dimensions, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Global } from './Global';

class ContactScreen extends React.Component {

  state = {
    name: '',
    email: '',
    subject:'',
    message:'',

    isErrors:false,
    errors:[],
    btncolor:'#0395fc',
    btnText:'Submit',
    btnDisable:false

 }
    handleName = (text) => {
      this.setState({ name: text })
    }
    handleEmail = (text) => {
      this.setState({ email: text })
    }
    handleMessage = (text) => {
      this.setState({ message: text })
    }
    handleSubject = (text) => {
      this.setState({ subject: text })
    }

    sendData() {

      this.setState({
        btnDisable:true,
        btnText:"Please Wait...",
        btncolor:'grey'
      })

     

     
     

      var url_contactus=Global.active_server2+'api/InquirySend'

         fetch(url_contactus, {
          method: 'POST',
          headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json'
         },
          body:JSON.stringify({
            name:this.state.name,
            email:this.state.email,
            subject:this.state.subject,
            message:this.state.message
          }),
          
        })
        .then((response) => response.json())
        .then((responseJson) => {
        
         
          if(responseJson.success==true)
          {
            this.setState({
              isErrors:false,
              btncolor:'#0395fc',
              btnText:'Submit',
              btnDisable:false
            }); 
            
            Alert.alert(
              "",
              "Feedback Successfull Send...",
              [
                { text: "OK", onPress: () =>  
                this.setState({
                  name:'',
                  email:'',
                  message:'',
                  subject:''

                })
                }
              ],
              { cancelable: false }
            );
            console.log('success')
          }
          else if(responseJson.success==false)
          {
            var obj = responseJson.errors;
            var errors = Object.keys(obj).map(function (key) { return obj[key]; });

            this.setState({
              isErrors:true,
              errors:errors,
              btncolor:'#0395fc',
              btnText:'Submit',
              btnDisable:false
            }); 
            this.scroll.scrollTo({ x: 0 })
           console.log(responseJson)
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
           ref={(node)=>this.scroll=node}
           keyboardShouldPersistTaps='handled'
          >
         
        <View style={styles.header}>
            <Text style={styles.text_header}>Contact Us</Text>
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
               placeholder = "Enter Your Name"
               value={this.state.name}              
               autoCapitalize = "none"
               onChangeText = {this.handleName}/>
            </View>
            
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
            <Ionicons name="mail-outline" size={22}></Ionicons>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Your Email Address"
               autoCapitalize = "none"
               value={this.state.email}    
               onChangeText = {this.handleEmail}/>
            </View>

            <Text style={styles.text_footer}>Subject</Text>
            <View style={styles.action}>
            <Ionicons name="chatbubble-outline" size={22}></Ionicons>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Your Subject"
               value={this.state.subject}              
               autoCapitalize = "none"
               onChangeText = {this.handleSubject}/>
            </View>


            <Text style={styles.text_footer}>Message</Text>
            <View style={styles.action}>
            <Ionicons name="chatbox-ellipses-outline" size={22}></Ionicons>
              <TextInput style = {styles.input2}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Your Message"
               autoCapitalize = "none"
               multiline={true}
               value={this.state.message}    
               onChangeText = {this.handleMessage}/>
            </View>
          
                <TouchableOpacity disabled={this.state.btnDisable} onPress = {() => this.sendData()}>
                <LinearGradient
                colors={[this.state.btncolor,this.state.btncolor]}
                style={styles.submitBtn}>                        
                        <Text style={styles.submitBtnText}>{this.state.btnText}</Text>
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
    
    backgroundColor: '#0395fc',
 },
 horizontal: {
  position:'absolute',
  marginTop:320,
 justifyContent:'center'
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
   marginTop:20,
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
  input2:{
    flex: 1,
    marginTop:-12,
    paddingLeft: 10,
    color: '#05375a',
    height:90,
    textAlignVertical:'top'
 },
 submitBtn:{
  borderRadius:30,
  marginTop:20,
  alignItems:'center',
  backgroundColor:'green',
  elevation:5
},
submitBtnText:{
    fontSize:18,
    color:'#ffffff',
    fontWeight:'bold',
    padding:15
},
  headText:{
    textAlign:'center',
    fontSize:20,
    padding:13
  },
  submitbtn:{
    width:10
  },
  error_section:{
    backgroundColor:'#fcd2d2',
    marginLeft:20,
    marginRight:20,
    borderRadius:20,
    padding:10
  }
 
})
export default ContactScreen;
