import React, { Component } from 'react';
import { View, Text, Platform, Dimensions } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { MainColor } from '../components';
import axios from 'axios';

import SearchList from '../components/SearchList';
import { SERVER_URL, PROJECT_NAME } from 'react-native-dotenv';

const { width: SCREEN_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

class SearchScreen extends Component {
   state = { 
     value: '', 
     loading: false, 
     results: [],
     newResults: [],
     loaded: 0,
     start: 0
   };

   onPressEnter = () => {
      this.setState({ loading: true });
      this.searchHandler();
   }

   async searchHandler() {
      const { value } = this.state;

      // Get data from API then save to state
      await axios.get(SERVER_URL, {
        params: {
          p: "restaurants",
          type: "search",
          value,
          start: this.state.start,
          limit: 10
        }
      })
        .then((response) => {
          this.setState({ results: response.data, loading: false });
        });

   }

   static navigationOptions = ({ navigation }) => {
      return {
         tabBarIcon: ({ tintColor }) => (
            <Icon
               name="compass"
               type="entypo"
               color={tintColor}
            />
         )
      }
   };

   render() {
      const { loading, value, results } = this.state;

      return(
         <View style={styles.container}>
            <SearchBar
              onChangeText={value => this.setState({ value })}
              placeholder='Cari...'
              containerStyle={{ width: SCREEN_WIDTH }}
              onSubmitEditing={() => this.onPressEnter()}
              showLoadingIcon={loading}
              autoFocus={true}
              value={value}
           />

           <SearchList results={results} navigation={this.props.navigation} />
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
