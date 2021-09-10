import React, {Component} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native'


import MyTabs from './Tabs'
import LoggedIn_Tabs from './LoggedIn_Tabs'
import SignUp from './pages/SignUp';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Chekout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import OrderDetails from './pages/OrderDetails';
import AuthCheck from './AuthCheck';
import ProductsByCategory from './pages/ProductByCategory';

import MyAccount from './pages/EditAccount';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import HomeScreen from './pages/HomeScreen';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';



class StackNavigator extends React.Component{


	constructor(props) {  
		super(props);  
		this.state = {  		 
			user_id:''
		}; 
	
	}  

	async componentDidMount(){

		try {
			const id = await AsyncStorage.getItem('user_id');
		
			this.setState({user_id:id})
	
			} 
			catch (error) 
			{
			 console.log(error); 
			}
	}



	render(){


		const Stack = createStackNavigator();
		
		
		function getHeaderTitle(route) 
		{
			const routeName = getFocusedRouteNameFromRoute(route) ?? 'IShop';
			switch (routeName) {
			  case 'Home':
				return 'IShop';
			  case 'Products':
				return 'Products';
			  case 'Contact Us':
				return 'Contact Us';
			  case 'About Us':
				return 'About Us';
			  case 'Profile':
				return 'Profile';
			  case 'Login':
				return 'Login';
			}
		  }




		return(
			

			
			<Stack.Navigator 
			initialRouteName='AuthCheck'
			screenOptions={{
				headerStyle: 
				{backgroundColor: '#0394fc'},
					headerTintColor: '#fff',
					headerTitleAlign:'center'					
				}}
			>

		
					<Stack.Screen 
					name="AuthCheck" 
					component={AuthCheck}
					options={{headerShown:false}}
					/>

						<Stack.Screen 
						name="IShop " 
						component={LoggedIn_Tabs}
						options={({ route,navigation }) => 
						({
							headerTitle: getHeaderTitle(route),
							headerLeft:()=>(
							<Ionicons name='menu' 
							size={30}
							color='#fff'
							style={{marginLeft:10}}
							onPress={() => navigation.toggleDrawer()	} />
							),
							headerRight:()=>(
							<Ionicons name='cart' 
							size={30}
							color='#fff'
							style={{marginRight:10}}
							onPress={() => navigation.navigate('Cart',{uid:this.state.user_id})	} />
							)
						})} />
				
				

					<Stack.Screen 
				name="IShop" 
				component={MyTabs}
				options={({ route,navigation }) => ({
					headerTitle: getHeaderTitle(route),
					headerLeft:()=>(
							<Ionicons name='menu' 
							size={30}
							color='#fff'
							style={{marginLeft:10}}
							onPress={() => navigation.toggleDrawer()	} />
							),
					headerRight:()=>(
							<Ionicons name='cart' 
							size={30}
							color='#fff'
							style={{marginRight:10}}
							onPress={() => 
									{
									navigation.navigate('Login')
									ToastAndroid.show("Please Login First...", ToastAndroid.SHORT);
									}
							} />
							)
				})} />
			

					<Stack.Screen 
					name="Products " 
					component={ProductsByCategory}
					options={{ title: 'Products' }}
					/>


        		<Stack.Screen 
				name="Product Details" 
				component={ProductDetails}
				options={{ title: 'Product' }}
				 />


				

				<Stack.Screen 
				name="Sign Up" 
				component={SignUp}
				options={{ title: 'Registration' }}
				 />


				<Stack.Screen 
				name="My Account" 
				component={MyAccount}
				options={{ title: 'My Account' }}
				 />

				<Stack.Screen 
				name="Change Password" 
				component={ChangePassword}
				options={{ title: 'Change Password' }}
				 />

				<Stack.Screen 
				name="Forgot Password" 
				component={ForgotPassword}
				options={{ title: 'Forgot Password' }}
				 />

				<Stack.Screen 
				name="Order Details" 
				component={OrderDetails}
				options={{ title: 'Order Details' }}
				 />

				<Stack.Screen 
				name="Checkout" 
				component={Chekout}
				options={{ title: 'Checkout' }}
				 />

			</Stack.Navigator>
		
		);
}

}
export default StackNavigator;
