/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { busListOnStop } from './src/url';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export default class App extends Component {
  state = {
    success: false
  }
  onTestClick() {
    busListOnStop('134011').then(res => {
      console.log('RES', res);
      this.setState({success: true})
    }).catch(err => {
      console.log('ERR', err)
      alert(err.message)
      this.setState({success: false})
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome 12</Text>
        <Button title="TEST" onPress={this.onTestClick.bind(this)}/>
        <Text>{this.state.success ? 'oldu': 'olmadı'}</Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
