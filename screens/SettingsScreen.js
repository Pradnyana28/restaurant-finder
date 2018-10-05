import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { MainColor } from '../components';

class SettingsScreen extends Component {
   static navigationOptions = {
      tabBarIcon: ({ tintColor }) => (
         <Icon
            name="settings"
            color={tintColor}
         />
      )
   }

   render() {
      return(
         <View style={styles.container}>
            <Text>Settings Screen</Text>
         </View>
      );
   }
}

const styles = {
   container: {
      paddingTop: 25
   }
}

export default SettingsScreen;
