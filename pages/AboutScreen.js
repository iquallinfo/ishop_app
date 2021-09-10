import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, ScrollView } from 'react-native';
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Global } from './Global';
import HTML from "react-native-render-html";

class AboutScreen extends React.Component {

   state = 
  {
    data: [],
    loading:true
  }

 componentDidMount = () => {

  var url_about=Global.active_server2+'api/AboutUs'

  fetch(url_about, {
     method: 'GET'
  })
  .then((response) => response.json())
  .then((responseJson) => {
     this.setState({
        data: responseJson,
        loading:false
     })

  })
  .catch((error) => {
     console.error(error);
  });
}

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
      <View style={styles.horizontal}>
      <ActivityIndicator size="large" color="#0394fc" animating={this.state.loading}/>
      </View>
       {
                   this.state.data.map((item,index)=>(
                    <View key={index}>
                    <View style={styles.bannerSection}>
                    <ImageBackground 
                    style = {styles.bannerImage}
                    imageStyle={styles.bannerImageStyle}
                    source={{uri:'https://png.pngtree.com/thumb_back/fh260/back_our/20190619/ourmid/pngtree-shopping-mall-supermarket-selection-merchandise-poster-background-material-image_133225.jpg'}}>
                      <Text style={styles.bannerHeadText}>{item.title}</Text>
                    </ImageBackground>
                    </View>
                    <View style={{margin:8}}>
                    <HTML source={{ html: item.content }} />
                    </View>
                    </View>        
                   ))
               }
      </View>
      </ScrollView>
    );
  }
}
const dwidth=Dimensions.get('window').width
const dheight=Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    width:dwidth,
    height:dheight,
    backgroundColor: '#fff',
    flex:1,
    marginBottom:170
  },
  bannerSection:{
    margin:10,
    marginRight:10,
  },
  bannerImage:{
    width: dwidth/1.05, 
    height: 170,
    
  },
  bannerImageStyle:{
    borderRadius:20,
   
  },

  bannerHeadText:{
    textAlign:'center',
    fontSize:30,
    marginTop:65,
    justifyContent:'center',
    marginLeft:120,
    color:'#0e163d',
    fontWeight:'bold'
  },
  horizontal: {
    width:dwidth,
    height:600,
    justifyContent:'center',
    flexDirection: "row",
    alignSelf:'center',
    alignItems: 'center',
    flex:1,
    position:'absolute',
  },
  textContent:{
    margin:10,
    fontSize:13,
    alignItems:'center',
    textAlign:'justify'
  }
});
export default AboutScreen;
