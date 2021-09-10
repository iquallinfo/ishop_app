import React, {Component} from 'react';
import { NavigationContainer  } from '@react-navigation/native';

import StackNavigator from './StackNavigator';
import DrawerNavigator from './DrawerNavigator';


class App extends React.Component{

	render(){
		return(
			<NavigationContainer>

			<DrawerNavigator/>
			
			</NavigationContainer>
		);
}

}
export default App;
