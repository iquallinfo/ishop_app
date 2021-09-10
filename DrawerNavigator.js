import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { createDrawerNavigator  } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import Product from './pages/Product';
import {DrawerContent} from './DrawerContent'


class DrawerNavigator extends React.Component {


  render() {

    const Drawer = createDrawerNavigator();

   

    return (

          <Drawer.Navigator drawerContent={props=><DrawerContent {... props}/>}>

          <Drawer.Screen name="Home" component={StackNavigator} />
        
          </Drawer.Navigator>
    );
  }
}


export default DrawerNavigator;
