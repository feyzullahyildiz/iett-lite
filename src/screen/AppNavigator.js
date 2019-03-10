import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './Home';
import SearchStopScreen from './SearchStop';
import DetailStopScreen from './DetailStop';
// import { StopSearchScreen } from '../screens/StopSearchScreen';
// import { StopDetailScreen } from '../screens/StopDetailScreen';


const navigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    SearchStop: { screen: SearchStopScreen },
    DetailStop: { screen: DetailStopScreen },
    // StopSearch: { screen: StopSearchScreen },
    // StopDetail: { screen: StopDetailScreen },
  },
  {
    initialRouteName: "Home"
  });

export default createAppContainer(navigator);