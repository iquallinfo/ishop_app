import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ToastAndroid } from 'react-native';
import { Dimensions,FlatList, Image, StyleSheet, Text, View,Alert, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Global } from './Global';



class Product extends React.Component {

  constructor(props) {  
    super(props);  
    this.state = {  
      data: [],
      price_filter:[
        {label:"Sort By Price",value:"",seletected:true,disabled:true},
        {label:"Low To High",value:"lth"},
        {label:"High To Low",value:"htl"}],
      sel_price_filter:'',
      category:[],
      sel_category_filter:'',
      loading:true,
      current_page:1,
      last_page:0,
      isMoreProduct:true,
      isLoadMore:false,
      image_path:''
     

    };  

  


}  



filterByCategory(value)
{
  this.getProducts(value);
      this.setState({
        sel_price_filter:'',
        sel_category_filter: value,
      },this.getProducts(value));
}

handlePriceSort(value)
{ 

   this.setState({
    data: [],
    loading: true,
  }) 

  if(value=='lth')
  {
      this.setState({
        sel_price_filter: value
      },this.getProducts(this.state.sel_category_filter,value))
  }
  else if(value=='htl')
  {
    this.setState({
      sel_price_filter: value
    },this.getProducts(this.state.sel_category_filter,value))
  }
}


componentDidMount(){

 
     this.getProducts();
  

}





getProducts=(value,value2)=>
{
  this.setState({
    data: [],
    loading: true,
    current_page:1
  })
  
  var url_getAllProducts=Global.active_server2+'api/GetAllProducts'


  fetch(url_getAllProducts, {
     method: 'post',
     headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
     body:JSON.stringify({'category_id':value,page:1,'price_sort':value2}),
  })
  .then((response) => response.json())
  .then((responseJson) => {

   //console.log(responseJson.current_page)

   console.log(responseJson.products)
     
     this.setState({
      image_path:responseJson.image_path,
        data: responseJson.products,
        loading: false,
        current_page:responseJson.current_page,
        //last_page:responseJson.products.last_page,
     }) 

     this.setState({category:[]})
     this.state.category.push({label:'All Products',value:''})
     responseJson.category.map((item,index)=>
     this.state.category.push({label:item.name,value:item.category_id})
     );

  })
  .catch((error) => {
     console.error(error);
  });

}

loadMoreDataApiRequest=()=>{

  console.log('load more called')

   this.setState({
    isLoadMore:true
  })

  var url_loadMore=Global.active_server2+'api/GetAllProducts'

  fetch(url_loadMore, {
     method: 'post',
     headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
     body:JSON.stringify({'category_id':this.state.sel_category_filter,page:this.state.current_page,'price_sort':this.state.sel_price_filter}),
  })
  .then((response) => response.json())
  .then((responseJson) => {


    //console.log(responseJson.current_page)

  
        this.setState({
          isLoadMore:false,
          //data: this.state.data.concat(Object.values(responseJson.products.data)),
          data: this.state.data.concat(responseJson.products), 
          current_page:responseJson.current_page,
      })  
    
    

  })
  .catch((error) => {
     console.error(error);
  }); 

}

handleLoadMore =()=>{

    if(this.state.data.length>=10)
    {
      this.setState({current_page:this.state.current_page+1}, this.loadMoreDataApiRequest);
     
    }
      
}

GoToProductDetails = (id) =>{
  this.props.navigation.navigate('Product Details',{id:id})
}


renderFooter=()=>{
  return(
    this.state.isLoadMore ?
    <View style={styles.loadMore}>
      <ActivityIndicator size="large" color="#0394fc"/>
    </View> :null
  )
}


  render() {

    const { navigate } = this.props.navigation;  

    return (
      <View style={styles.container}>

      <View style={styles.horizontal}>
      <ActivityIndicator size="large" color="#0394fc" animating={this.state.loading}/>
      </View>

      <View style={styles.filter_section}>

      <DropDownPicker
          items={this.state.category}
          defaultValue={this.state.sel_category_filter}
          placeholder="Filter By Category"
          containerStyle={styles.category_dropdwon}
          itemStyle={{justifyContent: 'flex-start'}}
          onChangeItem={item => this.filterByCategory(item.value) }
        />  

       <DropDownPicker
          items={this.state.price_filter}
          defaultValue={this.state.sel_price_filter}
          placeholder="Sort By Price"
          containerStyle={styles.price_dropdwon}
          onChangeItem={item => this.handlePriceSort(item.value)}
        />       
      </View>
      
     
       <FlatList   
          style={{marginBottom:150}}
         data={this.state.data}         
         contentContainerStyle={{alignSelf:'center'}}
         onEndReached={()=>this.handleLoadMore()}
         onEndReachedThreshold={1}
         ListFooterComponent={this.renderFooter}
         renderItem={({item,index})=>(
         <TouchableWithoutFeedback onPress={()=>this.GoToProductDetails(item.product_id)}>
         <View style={styles.FlatView}>
           <View style={styles.img_section}>
                <Image style={styles.Pimage} source={{uri:this.state.image_path+item.image.split(",",1)}} resizeMode="contain"/>
           </View> 
           <View>
            {
              item.title.length>=20 ?
              <Text style={styles.ptext}>{item.title.substring(0,20)}...</Text>    
              :
              <Text style={styles.ptext}>{item.title}</Text>    
            }
              <Text style={styles.priceText}>${item.price}</Text>
           </View>
         </View>

         </TouchableWithoutFeedback>
         )}
         keyExtractor={(item,index) => index.toString()}
         numColumns={2}
       />
      </View>
    );
  }
}
const dwidth=Dimensions.get('window').width
const dheight=Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    width:dwidth,
    height:dheight,
    justifyContent:'center',
    backgroundColor:'#f5f5f5',
    
  },
  horizontal: {
    flexDirection: "row",
    alignSelf:'center',
    alignItems: 'center',
    flex:1,
    position:'absolute',
  },
  FlatView:{
    margin:8,
    backgroundColor:'#fff',
    borderRadius:15,
    elevation:7,
    width:dwidth/2.3,
    height:190,
  },
  img_section:{
    alignSelf:'center',
    marginTop:15
  },
  Pimage:{
    width: 100, 
    height: 100,
  },
  ptext:{
    fontSize:14,
    textAlign:'center',
    marginTop:8,
    color:'black',
    fontWeight:'800'
  },
  priceText:{
    fontSize:18,
    marginTop:5,
    fontWeight:'bold',
    color:'black',
    alignSelf:'center'
  },
  filter_section:{
    flexDirection:'row',
    padding:6,
    width:Dimensions.get('window').width,
  },
  price_dropdwon:{
    height:40,
    width:Dimensions.get('window').width/2.1,
    marginLeft:5,
  },
  category_dropdwon:{
    height:40,
   
    width:Dimensions.get('window').width/2.1
  },
  loadMore:{
    marginTop:10,
    alignItems:'center'
  }
});
export default Product;
