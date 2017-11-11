import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { MainColor } from '../components';

class CategoryScreen extends Component {
   static navigationOptions = ({ navigation }) => ({
      title: navigation.state.params.name,
      tabBarIcon: ({ tintColor }) => (
         <Icon
            name="settings"
            type="feather"
            color={MainColor}
         />
      )
   });

   render() {
      return(
         <View style={styles.container}>
            <Text>Category Screen</Text>
         </View>
      );
   }
}

const styles = {
   container: {
      paddingTop: 25
   }
}

export default CategoryScreen;
