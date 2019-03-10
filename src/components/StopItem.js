import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MonoText } from '../components/StyledText';

export default ({item, click}) => {
    return <TouchableOpacity onPress={click}>
        <View style={styles.container}>
            <Text style={styles.darkText}>{item.durak_adi}</Text>
            <MonoText>İlçe: {item.ilce}</MonoText>
            <MonoText>Yön: {item.durak_yonu}</MonoText>
        </View>
    </TouchableOpacity>

}
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    darkText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})