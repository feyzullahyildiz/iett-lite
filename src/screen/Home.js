import React from 'react';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';

import { getStopList_DB } from '../db';
import { FlatList } from 'react-native-gesture-handler';
import StopItem from '../components/StopItem';
export default class Home extends React.Component {
  static navigationOptions = (props) => {
    return {
      title: 'Duraklar',
      headerRight: (
        <Button
          onPress={() => { props.navigation.push('SearchStop') }}
          title="Ara"
          style={styles.headerButton}
        />
      )
    }
  }

  state = {
    stopList: [],
  }
  componentDidMount() {
    this.props.navigation.addListener('didFocus', payload => {
      getStopList_DB().then(data => {
        this.setState({stopList: data})
      })
    })
    getStopList_DB().then(data => {
      this.setState({stopList: data})
    }).catch(err => {
      console.log('DB_LIST ERROR', err)
    })
  }
  onStopPress = (stop) => {
    const _stop = {
      durak_kodu: stop.durak_kodu,
      durak_adi: stop.durak_adi,
      durak_yonu: stop.durak_yonu,
      x_koordinat: stop.x_koordinat,
      y_koordinat: stop.y_koordinat,
      enerji: stop.enerji,
      durak_tipi: stop.durak_tipi,
      akilli_durak_tipi: stop.akilli_durak_tipi,
      isletme: stop.isletme,
      ilce: stop.ilce,
    }
    this.props.navigation.push('DetailStop', { stop: _stop });
  }
  render() {
    return (
      <View style={styles.container}>
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
  headerButton: {
    margin: 5
  },
  searchListContainer: {
    margin: 10,
  },
  searchListItem: {
    // height: 40,
    // borderRadius: 5,
    padding: 4,
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: 5,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
})