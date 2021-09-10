import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, Alert, Button, Dimensions,FlatList, Image, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Global } from './Global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import HTML from "react-native-render-html";
import { SliderBox } from 'react-native-image-slider-box';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Modal } from 'react-native';
import { Picker } from '@react-native-community/picker';




class ProductDetails extends React.Component {

   state = 
  {
    data: [],
    product_options:[],

    avl_qty:'',
    p_price:'',
    select_qty:1,
    t_price:'',
    user_id:'',
    loading:true,
    btncolor:'#0395fc',
    btnText:'Add To Cart',
    btnDisable:false,
    isWishListed:false,
    image_path:'',
    product_images:[],
    full_product_images:[],
    modalVisible:false,

    sel_product_option:[]
  }


  handleSelectQty = (text) => {
    this.setState({select_qty: text })
    this.setState({t_price:this.state.p_price*text})
  }



  

 componentDidMount = () => {

  AsyncStorage.getItem('user_id').then(value =>
    this.setState({user_id: value })
  );

  const pid = this.props.route.params.id;
  
   const url_GetProduct=Global.active_server2+'api/GetProduct/'+pid

  fetch(url_GetProduct, {
     method: 'GET'
  })
  .then((response) => response.json())
  .then((responseJson) => {

    

    var imgs = responseJson.product_data[0].image.split(",");
    var product_images=[];
    var full_product_images=[];
   
    imgs.map(function(item){
      product_images.push(responseJson.image_path+item);
      full_product_images.push({url:responseJson.image_path+item,props:{}})
    });

    responseJson.product_options.map((item,index)=>
    {

      this.setState({[item.label]:item.value.split(",")[0].trim()})
      this.state.sel_product_option.push({[item.label]:item.value.split(",")[0].trim()});
    }
    )

   
      this.setState({
        data: responseJson.product_data,
        product_options:responseJson.product_options,       
        avl_qty:10,
        p_price:responseJson.product_data[0].price,
        select_qty:1,
        t_price:responseJson.product_data[0].price,
        loading:false,
        product_images:product_images,
        image_path:responseJson.image_path,

        full_product_images:full_product_images,
        zoom_image_index:0

     },this.auto_addToCart)  

  })
  .catch((error) => {
     console.error(error);
  });
 
  
}


auto_addToCart()
{
  if(this.props.route.params.afterLogin)
  {
      this.addTocart();
  }
}


  addTocart()
  {
      if(this.state.user_id!=null)
      {
        if(this.state.select_qty===null)
        {
            Alert.alert('','Select At Least 1 Qty.')
        }
        else
        {
          let prod_obj ={
            product_id:this.props.route.params.id,
            'sel_qty':this.state.select_qty,
            'product_options':this.state.sel_product_option
          }

       
          AsyncStorage.getItem('cart_data', (err, result) => {
            if (result !== null) 
            {
              
              //AsyncStorage.removeItem("cart_data")

                var result = JSON.parse(result);

                var check = result.find(item => {
                  return item.product_id == this.props.route.params.id
              })

                if(check!=null)
                {
                  ToastAndroid.show("This Product is Already in Cart...", ToastAndroid.SHORT);
                  this.props.navigation.navigate('Cart');

                }
                 else
                {
                      result.push(prod_obj);
                      AsyncStorage.setItem('cart_data',JSON.stringify(result));
                      this.props.navigation.navigate('Cart'); 
                }  
             
            } 
            else 
            {
              AsyncStorage.setItem('cart_data', JSON.stringify([prod_obj]));
              this.props.navigation.navigate('Cart');
            }
            
          });
          
        }
      }
      else
      {
        
        ToastAndroid.show("Please Login First....", ToastAndroid.SHORT);

          AsyncStorage.setItem('product_id',this.props.route.params.id.toString());
        
        this.props.navigation.navigate('IShop', {
            screen: 'Login'
          });
      }
       
  }



  share=(item)=>{
    
    var msg =item.title+'\n\n'+item.description
    let shareOptions = {
      title: 'IQ Shopping',
      message: msg,
      subject: 'Amazing Products On IQ Shopping App'
    };

    Share.open(shareOptions).then(
      res=>{
        console.log(res)
      }).catch(err=>
        {
          err&console.log(err)
        })
  }

  WishlistChange = (id)=>{
      this.setState({isWishListed:!this.state.isWishListed})
  }

  imageZoomIndex=(index)=>{

    this.setState({modalVisible:true,zoom_image_index:index})

   }


   renderHeaderOfModal=()=>{
    return(
      <View style={{margin:20,alignSelf:'flex-end'}}>
          <Ionicons onPress={()=>this.setState({modalVisible:false})} name="close-circle-outline" color='#fff' size={33}></Ionicons>
      </View> 
    )
  }

  handleSelectProductOption=(label,value,index)=>{
   

    this.setState({[label]:value})

    this.state.sel_product_option[index]={[label]:value}

    console.log(this.state.sel_product_option)



  }


  renderProductOption=()=>{
    return(
      <>
        {
          this.state.product_options.map((item,index)=>
          <View key={index} style={styles.prod_option_select}>
            <Text style={{fontSize:15}}>{item.label} : </Text>
            <Picker
            style={{ height: 40, width: 125 }}
              selectedValue={this.state[item.label]}
              onValueChange={(itemValue, itemIndex) => this.handleSelectProductOption(item.label,itemValue,index)}>
              {
                item.value.split(",").map((item_option,index_option)=>
                <Picker.Item label={item_option.trim()} value={item_option.trim()}/>
                )
              }
             
             
              </Picker>
          </View>
          )
        }
      </>
    )
  }



  render() {
    return (
      <View style={styles.container}>
    
       <View style={styles.horizontal}>
      <ActivityIndicator size="large" color="#0394fc" animating={this.state.loading}/>
      </View>

       <ScrollView>

    <FlatList
         data={this.state.data}
         keyExtractor={item => item.product_id.toString()}
         renderItem={({item})=>(
          
         <View onPress={()=>this.onItemClick(item)}>
              <View style={styles.flatView}>
                    <View>
                    
                    <SliderBox
                    resizeMethod={'resize'}
                    resizeMode={'contain'}
                    autoplay
                    onCurrentImagePressed={(value)=>this.imageZoomIndex(value)}
                    sliderBoxHeight={250}
                    images={this.state.product_images}
                    />
                   
                    <View style={styles.share_section}>
                              <TouchableOpacity onPress={()=>this.share(item)}>
                                    <View style={styles.sharebtnView}>                        
                                        <Ionicons color='grey' name="arrow-redo" size={28} style={{alignSelf:'center'}}></Ionicons>
                                    </View>
                                </TouchableOpacity>  

                               {/*  <TouchableOpacity onPress={()=>this.WishlistChange(item.id)}>
                                    <View style={styles.wishlistbtnView}>   

                                      {
                                        this.state.isWishListed===false ? 
                                        <Ionicons color='grey' name="heart" size={28} style={{alignSelf:'center'}}></Ionicons>
                                        :
                                        <Ionicons color='red' name="heart" size={28} style={{alignSelf:'center'}}></Ionicons>
                                      }                     
                                    </View>
                                </TouchableOpacity> */}
                        </View>
                    </View>
                <View>
               
                    <View>
                      <Text style={styles.ptext}>{item.title}</Text>           
                      <Text style={styles.priceText}>${item.price}</Text>
                    </View>

                   

     <View style={styles.qty_select}>
       <Text style={{fontSize:15}}>Select Quantity </Text>
        <NumericInput 
            onChange={value=>{this.handleSelectQty(value)}} 
            onLimitReached={(isMax,msg) => console.log(msg)}
            value={this.state.select_qty}
            totalWidth={120} 
            totalHeight={40}
            editable={false}
            minValue={1}
            maxValue={parseInt(this.state.avl_qty)}
            iconSize={25}
            valueType='integer'
            rounded 
            step={1}
            textColor='black'
            validateOnBlur={false}
            reachMaxIncIconStyle={{display:'none'}}
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='#0395fc' 
            leftButtonBackgroundColor='#0395fc'/>

            </View>

            {
              this.state.product_options.length>0 ? 
              this.renderProductOption()
              :<></>
            }
               <HTML style={styles.pdesccription} source={{ html: item.description }} />


           

                </View>
              </View>
         </View>
         )}
         numColumns={1}
       /> 

            </ScrollView>
           


            <Modal
              visible={this.state.modalVisible}
              transparent={true}
              onRequestClose={() => this.setState({ modalVisible: false })}
            >
                <ImageViewer 
                renderHeader={this.renderHeaderOfModal}
                index={this.state.zoom_image_index} 
                imageUrls={this.state.full_product_images}/>
          
        </Modal>

          
      

      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height/1.13
  },
  horizontal: {
    flexDirection: "row",
    alignSelf:'center',
    alignItems: 'center',
    flex:1,
    position:'absolute',
  },
  flatView:{
    width:Dimensions.get('window').width/1.02,
    borderRadius:10,
    margin:10,
    textAlign:'center',
  },
  Pimage:{
    width: Dimensions.get('window').width, 
    height: 200,
    marginTop:5
  },
  ptext:{
    fontSize:20,
    marginTop:5,
    color:'black'
  },
  priceText:{
    fontSize:20,
    marginTop:10,
    fontWeight:'bold',
    color:'black',
    width:120,
    borderRadius:10
  },
  pdesc_title:{
    fontSize:16,
    marginTop:20,
    color:'black',
    fontWeight:'bold',
    textDecorationLine:'underline'
  },
  pdesc_text:{
    marginTop:5,
    marginRight:10,
    textAlign:'justify',
  },
  pdesccription:{
    padding:35,
    backgroundColor: 'red',
    textAlign:'justify'
  },
  qtyinput: {
    margin: 5,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
 },
 cartbtnView:{
  position:'absolute',
  margin:0,
  backgroundColor:'green',
  padding:15,
  position: 'relative',
 },
 sharebtnView:{
  backgroundColor:'#fff',
  width:50,
  height:50,
  marginTop:2,
  justifyContent:'center',
  borderRadius:40,
  margin:15,
  elevation:5,
  borderColor:'grey',
  borderWidth:1
 },
 wishlistbtnView:{
  backgroundColor:'#fff',
  width:50,
  height:50,
  marginTop:2,
  justifyContent:'center',
  borderRadius:40,
  margin:15,
  elevation:5,
  borderColor:'grey',
  borderWidth:1
 },
 share_section:{
  position:'absolute',
  alignSelf:'flex-end',
  paddingRight:10
 },
 btntext:{
   color:'white',
   fontSize:18,
   textAlign:'center',
   fontWeight:'bold'
 },
 qty_select:{
   flexDirection:'row', 
   flexWrap:'wrap', 
   alignItems:'center', 
   marginTop:15},
   input: {
    flex: 1,
    width:100,
    marginTop:-12,
    paddingLeft: 10,
    color: '#05375a',
  },
  prod_option_select:{
    flexDirection:'row', 
    flexWrap:'wrap', 
    alignItems:'center', 
    marginTop:5
  }
});
export default ProductDetails;
