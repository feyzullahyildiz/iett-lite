import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './Home';
// import { StopSearchScreen } from '../screens/StopSearchScreen';
// import { StopDetailScreen } from '../screens/StopDetailScreen';


const navigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    // StopSearch: { screen: StopSearchScreen },
    // StopDetail: { screen: StopDetailScreen },
  },
  {
    initialRouteName: "Home"
  });

export default createAppContainer(navigator);