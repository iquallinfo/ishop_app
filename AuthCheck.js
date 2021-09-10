import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StyleSheet,  View, ActivityIndicator } from 'react-native';


class AuthCheck extends React.Component {

    componentDidMount() {

      this._retrieveData();
      
   } 

  componentDidUpdate() {

   this._retrieveData();
   
} 

_retrieveData = async () => {
    try {
        const id = await AsyncStorage.getItem('user_id');
          this.props.navigation.reset({
          routes: [{name: id ? 'IShop ' : 'IShop'}],
        }); 
        
        } catch (error) {
         console.log(error); 
        }
}

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.horizontal}>
  
      <ActivityIndicator size="large" color="#0394fc"/>
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent:'center',
    flex:1
  },
  horizontal: {
    flexDirection: "row",
    alignSelf:'center',
    alignItems: 'center',
    flex:1,
    position:'absolute',
  },
});
export default AuthCheck;
