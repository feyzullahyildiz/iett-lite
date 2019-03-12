import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';
import { MonoText } from '../components/StyledText';
import { addStop_DB, isStopAdded_DB, deleteStopById } from '../db';
import { busListOnStop } from '../url';
// import { FlatList } from 'react-native-gesture-handler';
export default class DetailStop extends Component {
    static navigationOptions = (props) => {
        const stop = props.navigation.getParam('stop', null);
        return {
            title: stop.durak_adi || 'Bilinmiyor',
        }
    }
    state = {
        busList: null,
        refreshing: false,
        isStopAdded: false,
    }
    refreshBusList = () => {
        this.setState({ busList: null, refreshing: true });
        const stop = this.props.navigation.getParam('stop', null);
        if (stop) {
            busListOnStop(stop.durak_kodu).then(stopInfo => {
                const liveData = stopInfo.filter(d => d.dataType === 'LIVE')
                const others = stopInfo.filter(d => d.dataType !== 'LIVE')
                others.forEach((offlineData) => {
                    // console.log('OFFLINE', offlineData)
                    offlineData.doorNo = offlineData.line.id + offlineData.line.code;
                })
                console.log('STOPINFO', stopInfo);
                this.setState({ busList: [...liveData, ...others], refreshing: false })
            }).catch(err => {
                this.setState({ refreshing: false, busList: null })
            })
        } else {
            console.log('Durak Bulunamadı', stop);
        }
    }
    componentDidMount() {
        this.refreshBusList();
        this.isTheStopInFavoriteList();
    }
    isTheStopInFavoriteList = () => {
        const stop = this.props.navigation.getParam('stop', null);
        if (stop) {
            isStopAdded_DB(stop.durak_kodu).then(stop => {
                if (stop) {
                    this.setState({ isStopAdded: true })
                } else {
                    this.setState({ isStopAdded: false })
                }
                console.log('isStopAdded_DB', stop)
            }).catch(err => {
                console.log('ERROR isStopAdded_DB', err)

            })
        }
    }
    busList = () => {
        if (this.state.busList && this.state.busList.length > 0) {
            // return this.state.busList.map(bus => {

            const _Row = ({ item }) => <View style={styles.container} key={item.line.id}>
                <View style={styles.itemHeader}>
                    {
                        item.dataType === 'LIVE' ?
                            <>
                                <Text style={styles.darkText}>{item.line.code}</Text>
                                <Text style={styles.darkText}>{item.timeToStop} DK</Text>
                            </>
                            :
                            <>
                                <Text style={styles.lightText} >{item.line.code}</Text>
                            </>
                    }
                </View>
                <MonoText>{item.line.name}</MonoText>
            </View>
            return <FlatList
                onRefresh={this.refreshBusList}
                data={this.state.busList}
                renderItem={_Row}
                keyExtractor={(item) => item.doorNo}
                refreshing={this.state.refreshing}
                contentContainerStyle={{ paddingBottom: 300 }}
            />
        }
        return null;
    }
    addStopToFavList = () => {
        const stop = this.props.navigation.getParam('stop', null);
        if (stop) {
            addStop_DB(stop).then(result => {
                // console.log('EKLENDI GALİBA', result);
                this.isTheStopInFavoriteList();
            }).catch(err => {
                this.isTheStopInFavoriteList();
            })
        } else {
            console.warn('DURAK BULUNAMADI')
        }
    }
    removeStopFromFavList = () => {
        const stop = this.props.navigation.getParam('stop', null);
        if (stop) {
            console.log('stop.id', stop.durak_kodu)
            deleteStopById(stop.durak_kodu).then(() => {
                this.isTheStopInFavoriteList();
            }).catch(err => {
                this.isTheStopInFavoriteList();
            })
        } else {
            console.warn('DURAK BULUNAMADI')
        }
    }
    render() {
        const stop = this.props.navigation.getParam('stop', null);
        return <View style={styles.container}>
            <View style={styles.bodyPartContainer}>
                <Text style={[styles.darkText]}>Durak Detayları</Text>
                <MonoText>Yön: {stop.durak_yonu}</MonoText>
                {this.state.isStopAdded ?
                    <Button onPress={this.removeStopFromFavList} title="Favoriden Çıkart" />
                    :
                    <Button onPress={this.addStopToFavList} title="Favoriye Ekle" />
                }
            </View>
            <View style={styles.bodyPartContainer}>
                <Text style={[styles.darkText]}>Yaklaşan Otobüsler</Text>
            </View>
            <View>
                {this.busList()}
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    bodyPartContainer: {
        paddingBottom: 10,
        paddingTop: 10,
    },
    darkText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    lightText: {
        fontSize: 19,
        fontWeight: 'normal',
    },
    textCenter: {
        textAlign: 'center',
    },
    itemHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
})