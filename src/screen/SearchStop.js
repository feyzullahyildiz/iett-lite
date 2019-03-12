
import React, { Component } from 'react';
import { View, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native';
import { searchStopByText } from '../url';
import StopItem from '../components/StopItem';
import { addStop_DB } from '../db';
export default class SearchStop extends React.Component {
    static navigationOptions = (props) => {
        return {
            title: 'Duraklar Ara',
        }
    }
    state = {
        stopList: []
    }
    timeoutId;
    onSearchChange = (text) => {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            searchStopByText(encodeURI(text)).then(response => {
                this.setState({ stopList: response })
            })
        }, 700)
    }
    onStopPress = (item) => {
        this.props.navigation.push('DetailStop', { stop: item})
    }
    render() {
        return (
            <View>
                <View style={styles.searchContainer}>
                    <TextInput placeholder="Durak Adını Yazınız..." autoFocus={true} onChangeText={this.onSearchChange} />
                </View>
                <FlatList
                    data={this.state.stopList}
                    keyExtractor={(item) => item.durak_kodu}
                    renderItem={({ item }) => <StopItem item={item} click={() => this.onStopPress(item)} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    searchContainer: {
        margin: 10,
        padding: 10,
        borderBottomColor: 'rgba(0,0,0, 0.1)',
        borderBottomWidth: 1,
    },
    // searchListContainer: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     marginBottom: 10,
    // },
})