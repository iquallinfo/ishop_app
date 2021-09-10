import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground } from 'react-native';
import { Dimensions, Image, StyleSheet, Text, View, ScrollView,Button, ActivityIndicator } from 'react-native';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {Global} from './Global';


class HomeScreen extends React.Component {


   state = 
  {
    category_data: [],
    new_arrival:[],
    loading:true,
    image_path:''
  }
  

 componentDidMount = () => {

  var home_url=Global.active_server2+'api/HomePage'
 
  fetch(home_url, {
     method: 'GET'
  })
  .then((response) => response.json())
  .then((responseJson) => {

    console.log(responseJson)

      this.setState({
        image_path:responseJson.image_path,
        category_data: responseJson.category,
        new_arrival:responseJson.new_arrival,
        loading:false
     }) 

  })
  .catch((error) => {
     console.error(error);
  });
}

GoToProductDetails = (id) =>{
  this.props.navigation.navigate('Product Details',{id:id})
}

GoToProdcutList=(category_id)=>{
  this.props.navigation.navigate('Products ',{category_id:category_id})
}


  render() {

    return (
      <ScrollView>
      <View style={styles.container}>
        {
          this.state.loading===false ?
        
        <View>
        <View style={styles.bannerSection}>
        <ImageBackground 
        style = {styles.bannerImage}
        imageStyle={styles.bannerImageStyle}
        source={{uri:'https://png.pngtree.com/thumb_back/fh260/back_our/20190619/ourmid/pngtree-shopping-mall-supermarket-selection-merchandise-poster-background-material-image_133225.jpg'}}>
           <Text style={styles.bannerWelcomeText}>Welcome To</Text>
          <Text style={styles.bannerHeadText}>IShop</Text>
        </ImageBackground>
        </View>

        <View style={styles.categorySection}>
          <Text style={styles.categorySectionTitle}>Category</Text>
          <FlatList      
         data={this.state.category_data}
         style={styles.cat_flatlist}
         scrollEnabled={true}
         contentContainerStyle={{alignSelf:'center'}}
         renderItem={({item,index})=>(
          
         <TouchableWithoutFeedback onPress={()=>this.GoToProdcutList(item.category_id)}>
         <View style={styles.cat_list_section}>
           <View style={styles.cat_img_section}>
                <Image style={styles.cat_img} source={{uri:this.state.image_path+item.image}} resizeMode="stretch"/>
           </View> 
           <View>
              <Text style={styles.cat_list_text}>{item.name}</Text>        
           </View>
         </View>
         </TouchableWithoutFeedback>
         )}
         keyExtractor={(item,index) => index.toString()}
         numColumns={2}
       />
        </View>


        <View style={styles.newArrivalSection}>
          <Text style={styles.newArrivalSectionTitle}>New Arrival</Text>
          <FlatList      
         data={this.state.new_arrival}
         style={styles.newarr_flatlist}
         contentContainerStyle={{alignSelf:'center'}}
         renderItem={({item,index})=>(
          
         <TouchableWithoutFeedback onPress={()=>this.GoToProductDetails(item.product_id)}>
         <View style={styles.cat_list_section}>
           <View style={styles.new_img_section}>
                <Image style={styles.new_img} source={{uri:this.state.image_path+item.image.split(",",1)}} resizeMode="contain"/>
           </View> 
           <View>
              <Text style={styles.prod_name_text}>{item.title}</Text>     
              <Text style={styles.prod_price_text}>${item.price}</Text>         
           </View>
         </View>
         </TouchableWithoutFeedback>
         )}
         keyExtractor={(item,index) => index.toString()}
         numColumns={2}
       />
        </View>

        </View>
        : 
          <View style={styles.horizontal}>
        <ActivityIndicator size="large" color="#0394fc"  animating={this.state.loading}/>
        
        </View>
        }


      </View>
      </ScrollView>
    );
  }
}

const dwidth=(Dimensions.get('window').width)
const dheight=Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    width:dwidth,
    justifyContent:'center',
  },
  horizontal: {
   
    flexDirection: "row",
    alignSelf:'center',
    alignItems: 'center',
    flex:1,
    marginTop:250,
    position:'relative',
  },
  loadingSpinner:{
    backgroundColor:'#e2e2e2',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height
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
  bannerWelcomeText:{
    textAlign:'center',
    fontSize:15,
    marginTop:55,
    justifyContent:'center',
    marginLeft:120,
    color:'#0e163d',
    fontWeight:'bold'
  },
  bannerHeadText:{
    textAlign:'center',
    fontSize:24,
    justifyContent:'center',
    marginLeft:120,
    color:'#0e163d',
    fontWeight:'bold'
  },
  cat_flatlist:{
    width:dwidth,
    padding:15
  },
  categorySection:{
    marginTop:5,
    
  },
  categorySectionTitle:{
    fontSize:20,
    color:'#0e163d',
    marginLeft:20,
    fontWeight:'bold'
  },
  cat_list_section:{
    margin:15,
    backgroundColor:'#fff',
    borderRadius:15,
    elevation:7,
    width:160
  },
  cat_img_section:{
    alignSelf:'center',
    padding:10,
  },
  cat_img:{
    width:120,
    height:100
  },
  cat_list_text:{
    fontSize:16,
    color:'#0e163d',
    alignSelf:'center',
    fontWeight:'bold',
    marginBottom:10
  },
  newarr_flatlist:{
    width:dwidth,
    marginBottom:60
  },
  newArrivalSection:{
    marginTop:20,
    
  },
  newArrivalSectionTitle:{
    fontSize:20,
    color:'#0e163d',
    marginLeft:20,
    fontWeight:'bold'
  },
  new_img_section:{
    alignSelf:'center',
    padding:10,
  },
  new_img:{
    width:80,
    height:100
  },
  prod_name_text:{
    fontSize:12,
    color:'#0e163d',
    alignSelf:'center',
    fontWeight:'bold',
    textAlign:'center',
    margin:5
  },
  prod_price_text:{
    fontSize:12,
    color:'#0e163d',
    alignSelf:'center',
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:10,
  }


});
export default HomeScreen;
