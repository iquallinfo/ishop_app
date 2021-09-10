import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';


class TestScreen extends React.Component {



  render() {
    return (
      <View style={styles.container}>
                <Text>Test Screen</Text>
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
    backgroundColor: '#fff',
    flex:1
  },
 
});
export default TestScreen;
