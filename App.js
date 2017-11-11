import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { MainColor, SecondColor, FourthColor } from './components/Colors';

import store from './store';

// Import Screens
import AuthScreen from './screens/AuthScreen';
import DetailScreen from './screens/DetailScreen';
import ExploreScreen from './screens/ExploreScreen';
import SavedScreen from './screens/SavedScreen';
import SettingsScreen from './screens/SettingsScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SearchScreen from './screens/SearchScreen';
import CategoryScreen from './screens/CategoryScreen';

export default class App extends React.Component {
   render() {
      const MainNavigator = TabNavigator({
         welcome: { screen: WelcomeScreen },
         auth: { screen: AuthScreen },
         main: {
            screen: TabNavigator({
               explore: {
                  screen: StackNavigator({
                     exploreMain: { screen: ExploreScreen },
                     detail: { screen: DetailScreen },
                     search: { screen: SearchScreen, navigationOptions: { header: false } },
                     category: { screen: CategoryScreen }
                  })
               },
               saved: { screen: SavedScreen },
               settings: { screen: SettingsScreen }
            }, {
               tabBarOptions: {
                  showIcon: true,
                  labelStyle: {
                     fontSize: 8,
                     fontWeight: 'bold',
                     color: MainColor,
                     paddingTop: 1,
                     marginTop: 1
                  },
                  style: {
                     paddingTop: 0,
                     paddingBottom: 0,
                     backgroundColor: "#FFFFFF",
                     elevation: 10,
                  }
               },
               tabBarPosition: 'bottom',
               swipeEnabled: false,
               animationEnabled: false
            })
         }
      }, {
         tabBarPosition: 'bottom',
         swipeEnabled: false,
         animationEnabled: false,
         navigationOptions: {
            tabBarVisible: false
         }
      });

      return(
         <Provider store={store}>
            <View style={styles.container}>
               <MainNavigator />
            </View>
         </Provider>
      );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MainColor,
    justifyContent: 'center',
  },
});
