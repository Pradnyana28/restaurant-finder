import React, { Component } from 'react';
import { View, Text, Platform, Dimensions } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { MainColor } from '../components';
import axios from 'axios';

const { width: SCREEN_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

class SearchScreen extends Component {
   state = { value: '', loading: false, results: [] };

   onPressEnter = () => {
      this.setState({ loading: true })
   }

   searchHandler() {
      const { value } = this.state;

      // Get data from API then save to state
      
   }

   static navigationOptions = ({ navigation }) => {
      return {
         tabBarIcon: ({ tintColor }) => (
            <Icon
               name="compass"
               type="entypo"
               color={MainColor}
            />
         )
      }
   };

   render() {
      return(
         <View style={styles.container}>
            <SearchBar
              onChangeText={value => this.setState({ value })}
              placeholder='Cari...'
              containerStyle={{ width: SCREEN_WIDTH }}
              onSubmitEditing={() => this.searchHandler()}
              showLoadingIcon={this.state.loading}
              autoFocus={true}
              value={this.state.value}
           />
         </View>
      );
   }
}

const styles = {
   container: {
      paddingTop: 25
   }
}

export default SearchScreen;
