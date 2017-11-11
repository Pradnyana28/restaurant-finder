import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { MainColor } from '../components';

class SavedScreen extends Component {
   static navigationOptions = {
      tabBarIcon: ({ tintColor }) => (
         <Icon
            name="flag"
            type="feather"
            color={MainColor}
         />
      )
   }

   render() {
      return(
         <View style={styles.container}>
            <Text>Saved Screen</Text>
         </View>
      );
   }
}

const styles = {
   container: {
      paddingTop: 25
   }
}

export default SavedScreen;
