import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ToastAndroid } from 'react-native';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';




class Profile extends React.Component {


  state = {
    user_id:'',
    fname: '',
    lname:'',
    email:'',
    list : [
      {
        name: 'My Account',
        icon: 'person',
      },
      {
        name: 'Change Password',
        icon: 'lock-closed',
      },
      {
        name: 'My Orders',
        icon: 'checkmark-circle-outline',
      },
      {
        name: 'Logout',
        icon: 'log-out',
      },
    ]
 }


async componentDidMount() {
    try {
       const id = await AsyncStorage.getItem('user_id');
       const email = await AsyncStorage.getItem('email');
       const fname = await AsyncStorage.getItem('fname');
       const lname = await AsyncStorage.getItem('lname');

       this.setState({user_id:id,email:email,fname:fname,lname:lname})

       console.log(this.state)
       
       } catch (error) {
        console.log(error); 
       }
    }

    onPress=(item)=>{

      if(item==='My Orders')
      {
        this.props.navigation.navigate('My Orders');
      }
      else if(item==='My Account')
      {
        this.props.navigation.navigate('My Account');
      }
      else if(item==='Change Password')
      {
        this.props.navigation.navigate('Change Password');
      }
      else if(item==='Logout')
      {
        this.logout();
      }
    }

  logout()
  {
        try {
          AsyncStorage.clear();
          console.log('Storage successfully cleared!') 

          this.props.navigation.reset({
            routes: [{name: 'IShop'}],
          }); 

          ToastAndroid.show("Logout Success...", ToastAndroid.SHORT);


        } catch (e) {
          console.log('Failed to clear the async storage.')
        } 
        
  }
  render() {
    return (
      <View style={styles.container}>   
                      <View style={styles.header}>                  
                            <Text style={styles.wl_text}>Welcome</Text>
                            <Text style={styles.wl_usertext}>{this.state.fname.toUpperCase()+' '+this.state.lname.toUpperCase()}</Text>
                       </View>

                       
                       <View style={styles.footer}> 
                        <FlatList
                          style={styles.flatlist}
                          data={this.state.list}
                          renderItem={({item})=>(
                          <TouchableOpacity style={styles.list} onPress={()=> this.onPress(item.name)}>
                              <Ionicons style={styles.item_icon} name={item.icon} size={32}/>
                              <Text style={styles.list_item}>{item.name}</Text>
                          </TouchableOpacity>
                          )}
                          numColumns={1}
                          keyExtractor={(item, index) => index.toString()}
                        />        
                         </View>                                   
                                
              
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
   marginTop:30,
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
  headText:{
    textAlign:'center',
    fontSize:20,
    padding:13
  },
  desctext:{
    alignItems:'center'
  },
  wl_text:{
    fontSize:20,
    color:'white',
    textAlign:'center'
  },
  wl_usertext:{
    fontSize:35,
    color:'white',
  },
  list:{
    flexDirection:'row',
    width:Dimensions.get('window').width,
    borderBottomColor:'grey',
    borderBottomWidth:0.3,
    padding:8
  },
  list_item:{
    width:Dimensions.get('window').width,
    color:'black',
    textAlignVertical:'center',
    padding:5
  },
  item_icon:{
    color:'black'
  },
  flatlist:{
    width:Dimensions.get('window').width,
  }

});
export default Profile;
