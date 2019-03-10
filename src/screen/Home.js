import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Button,
} from 'react-native';
// import { searchStop } from '../url.js';
// import { MonoText } from '../components/StyledText';
// import { getStopList } from '../db';
export default class Home extends React.Component {
  static navigationOptions = (props) => {
    return {
      title: 'Duraklar',
      headerRight: (
        <Button
          onPress={() => { props.navigation.push('SearchStop') }}
          title="Ekle"
          style={styles.headerButton}
        />
      )
    }
  }

//   componentWillMount() {
//     getStopList().then(data => {
//       this.setState({ searchResultList: data })
//     })
//   }
  state = {
    stopTextSearch: '',
    searchResultList: [],
  }
  searchSetTimeoutId;
//   onStopTextChange = (value) => {
//     this.setState({ stopTextSearch: value })
//     clearTimeout(this.searchSetTimeoutId);
//     if (value.length > 1) {
//       this.searchSetTimeoutId = setTimeout(() => {
//         fetch(searchStop(value)).then(x => x.json()).then(result => {
//           // console.log('result', result.length);
//           if (result !== false) {
//             this.setState({ searchResultList: result.slice(0, 20) })
//           }
//         }).catch(err => {
//           console.log('err', err);
//         })
//       }, 700);
//     }
//   }
  componentDidMount() {
    // this.props.navigation.addListener('didFocus', payload => {
    //   // this.forceUpdate();
    //   getStopList().then(data => {
    //     this.setState({ searchResultList: data })
    //   })
    // })
  }
  onStopPress = (stop) => {
    this.props.navigation.push('StopDetail', { stop });
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.searchListContainer}>
            {this.state.searchResultList.map(stop =>
              <TouchableOpacity key={stop.durak_kodu} style={styles.searchListItem} onPress={() => this.onStopPress(stop)}>
                <Text>{stop.durak_adi}</Text>
                <MonoText style={styles.codeHighlightText}>İlçe: {stop.ilce}</MonoText>
                <MonoText style={styles.codeHighlightText}>Yön: {stop.durak_yonu}</MonoText>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView> */}
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