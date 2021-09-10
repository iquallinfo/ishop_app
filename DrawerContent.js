import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView,DrawerItem  } from '@react-navigation/drawer';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme,Avatar,Title,Caption,Paragraph,Drawer,Text,TouchableRipple,Switch} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { ToastAndroid } from 'react-native';



export function DrawerContent(props) {

    const [user_id,setUserID] = useState();
    const [fname,setFname] = useState();
    const [lname,setLname] = useState();
    const [email,setEmail] = useState();
    const [isLoggedIn,setIsLoggedIn] = useState(false);


    useEffect(()=>{
        _retrieveData();
    });
   

   


    _retrieveData = async () => {
       
        
        try {
          const user_id = await AsyncStorage.getItem('user_id');
          const email = await AsyncStorage.getItem('email');
          const fname = await AsyncStorage.getItem('fname');
          const lname = await AsyncStorage.getItem('lname');

         

          if(user_id!=null)
          {
                setIsLoggedIn(true);
                setUserID(user_id);
                setFname(fname);
                setLname(lname);
                setEmail(email);
          }
          else
          {
            setIsLoggedIn(false);
          }
         
            
          
        } catch (error) {
          // Error retrieving data
        }
      };

     


      

      logout=()=>{
        try {
            AsyncStorage.clear();
            console.log('Storage successfully cleared!') 
  
            _retrieveData();


            props.navigation.toggleDrawer()

            setIsLoggedIn(false);

            props.navigation.reset({
              routes: [{name: 'IQ Shoppinng App'}],
            }); 
  
            
            ToastAndroid.show("Logout Success...", ToastAndroid.SHORT);
  
  
          } catch (e) {
            console.log('Failed to clear the async storage.')
          }
      }






      return(
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>



                    <View style={styles.head_section}>
                        <Icon name="cart-outline" color='#fff' size={40} />

                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.head_title}>IShop</Title>
                               
                            </View>
                        </View>



                        {
                            isLoggedIn ? 
                            <View style={styles.user_section}>
                            <Icon name="person-outline" color='#0395fc' size={50} />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{fname+' '+lname}</Title>
                                <Caption style={styles.caption}>{email}</Caption>
                            </View>
                        </View>
                            :
                            <View style={styles.user_section}>
                            <Icon name="lock-closed-outline" color='#0395fc' size={30} />
                            <View style={{marginLeft:15, flexDirection:'row'}}>
                                <Title 
                                onPress={()=>props.navigation.navigate('Login')}
                                style={styles.login_title}>Login   |   </Title>
                                
                                <Title 
                                onPress={()=>props.navigation.navigate('Sign Up')}
                                style={styles.login_title}>Register</Title>
                               
                            </View>
                            </View>
                        }

                        


                        </View>

                    <Drawer.Section style={styles.drawerSection}>

                       

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon name="home-outline" color='#fff' size={25} />
                            )}
                            label="Home"
                            labelStyle={styles.item_text}
                            onPress={() => {
                                 isLoggedIn ?
                                props.navigation.navigate('IShop', {screen: 'Home'})
                                :
                                props.navigation.navigate('IShop', {screen: 'Home'})
                                }}
                        />

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon name="grid-outline" color='#fff' size={size} />
                            )}
                            labelStyle={styles.item_text}
                            label="Prodcuts"
                            onPress={() => {props.navigation.navigate('Products')}}
                        />
                        {
                            isLoggedIn ? 
                                <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon name="person-outline" color='#fff' size={size} />
                                )}
                                labelStyle={styles.item_text}
                                label="My Account"
                                onPress={() => {props.navigation.navigate('My Account')}}
                                />
                            :
                            null
                        }

                        {
                            isLoggedIn ? 
                            <DrawerItem 
                            icon={({color, size}) => (
                                <Icon name="checkmark-circle-outline" color='#fff' size={size} />
                            )}
                            labelStyle={styles.item_text}
                            label="My Orders"
                            onPress={() => {props.navigation.navigate('My Orders')}}
                            />
                            :
                            null
                        }


                       
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon name="information-circle-outline" color='#fff' size={size} />
                            )}
                            labelStyle={styles.item_text}
                            label="About Us"
                            onPress={() => {props.navigation.navigate('About Us')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon name="chatbox-ellipses-outline" color='#fff' size={size} />
                            )}
                            labelStyle={styles.item_text}
                            label="Contact Us"
                            onPress={() => {props.navigation.navigate('Contact Us')}}
                        />
                        
                    </Drawer.Section>
                    
                </View>
            </DrawerContentScrollView>

            {
                isLoggedIn ?

                <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon name="log-out"  color='#fff' size={size}/>
                    )}
                    label="Logout"
                    labelStyle={styles.item_text}
                    onPress={() => logout()}
                />
            </Drawer.Section> 
                
                :
                null
            }

            
        </View>
    );
  
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#0395fc',
        overflow:'hidden'
    },
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      color:'#0395fc',
      fontWeight: 'bold',
    },
    login_title: {
        fontSize: 18,
        marginTop: 3,
        color:'#0395fc',
        fontWeight: 'bold',
      },
    caption: {
      fontSize: 13,
      color:'#0395fc',
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    item_text:{
        color:'#fff',
        fontSize:17,
        fontWeight:'bold'
    },
    icon_color:{
        color:'#fff'
    },
    user_section:{
        flexDirection:'row',
        marginTop: 15,
        padding:20,
        backgroundColor:'#fff',
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20
        
    },
    head_section:{
        flexDirection:'row',
        marginTop: 8,
        padding:10,
    },
    head_title: {
        fontSize: 23,
        marginTop: 3,
        color:'#fff',
        fontWeight: 'bold',
      },
  });

