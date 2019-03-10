import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
export default class DetailStop extends Component {

    render() {
        const durakId = this.props.navigation.getParam('id', null);
        console.log('DURAK_ID', durakId);
        return <View>
            <Text>HOBAA</Text>
        </View>
    }
}