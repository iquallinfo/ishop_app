import React, {Component} from 'react';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './pages/HomeScreen';
import ContactScreen from './pages/ContactScreen';
import AboutScreen from './pages/AboutScreen';
import ProductScreen from './pages/Product';
import Login from './pages/Login';
import { Dimensions, StyleSheet } from 'react-native';


class Tabs extends React.Component {

        
    render() {
       
        //const Tab = createBottomTabNavigator();
        const Tab = createMaterialBottomTabNavigator();

        return (
            <Tab.Navigator
                barStyle={styles.barStyle}         
                screenOptions={({route})=>({
                    tabBarIcon:({focused,color,size})=>{
                        let iconName;
    
                        if(route.name==='Home')
                        {
                            iconName=focused ? 'ios-home' : 'ios-home-outline';
                        }
                        else if(route.name==='Products')
                        {
                            iconName=focused ? 'ios-cart' : 'ios-cart-outline';
                        }
                        else if(route.name==='About Us')
                        {
                            iconName=focused ? 'ios-information-circle' : 'ios-information-circle-outline';	
                        }
                        else if(route.name==='Contact Us')
                        {
                            iconName=focused ? 'ios-chatbox' : 'ios-chatbox-outline';
                        }
                        else if(route.name==='Login')
                        {
                            iconName=focused ? 'ios-person' : 'ios-person-outline';
                        }
                        else if(route.name==='Profile')
                        {
                            iconName=focused ? 'ios-person' : 'ios-person-outline';
                        }
                        return <Ionicons name={iconName} size={25} color={color} />;  
                    }                                
                })
                }
            >
    
        

                <Tab.Screen 
                name="Home" 
                options={{title:'Home'}}
                component={HomeScreen}
                 />
                
                <Tab.Screen name="Products" component={ProductScreen} />
                <Tab.Screen name="About Us" component={AboutScreen} />

                <Tab.Screen name="Contact Us" component={ContactScreen} />

                <Tab.Screen name="Login" component={Login} />
                
                
            </Tab.Navigator>
        );
    }    
}

const dwidth=Dimensions.get('window').width
const dheight=Dimensions.get('window').height


const styles = StyleSheet.create({

    barStyle:{
       borderRadius:20,
       margin:10,
       overflow: 'hidden',
       position:'absolute',
    }

});
export default Tabs;