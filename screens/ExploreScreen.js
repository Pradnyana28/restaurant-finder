import React, { Component } from 'react';
import { View, ScrollView, Text, Dimensions, TouchableHighlight, AsyncStorage, StatusBar, Platform } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { MainColor, SecondColor, ThirdColor, FourthColor } from '../components';
import { Font } from 'expo';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

import Image from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';
import Carousel from '../components/Carousel';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class ExploreScreen extends Component {
   state = { featured: [], seafood: [], local: [], isReady: false };

   static navigationOptions = ({ navigation }) => ({
      title: 'Kuliner Nusantara',
      headerStyle: {
         marginTop: (Platform.OS === 'android') ? 24 : 0,
         backgroundColor: MainColor
      },
      headerTitleStyle: {
         color: 'white'
      },
      headerRight: (
         <View style={{ marginHorizontal: 10 }}>
            <Icon
               name="ios-search"
               type="ionicon"
               color='#FFF'
               onPress={() => navigation.navigate('search')}
            />
         </View>
      ),
      tabBarIcon: ({ tintColor }) => (
         <Icon
            name="compass"
            type="entypo"
            color={MainColor}
         />
      )
   });

   async componentWillMount() {
      await Font.loadAsync({
         'Roboto': require('../assets/fonts/Roboto-Regular.ttf'),
         'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
      });

      /**
       * Get all List
       * @param response to get a http response
       */
      await axios.all([this.streamFeaturedData(), this.streamCategoryData("Seafood"), this.streamCategoryData("Local Restaurant")])
         .then(axios.spread((featured, seafood, local) => {
            this.setState({
               featured: featured.data,
               seafood: seafood.data,
               local: local.data
            });
         }));

      this.setState({ isReady: true });
   }

   // HTTP request from server
   streamFeaturedData() {
      return axios.get('http://kuliner.nusapenidaislands.com/request', {
         params: { p: "restaurants", type: "featured" }
      });
   }

   streamCategoryData(type) {
      return axios.get('http://kuliner.nusapenidaislands.com/request', {
         params: { p: "restaurants", type: "getByCategory", value: type }
      });
   }

   // Get Featured data
   getFeaturedData() {
      if (this.state.featured.result) {
         return <Carousel data={this.state.featured.result} />;
      }
   };

   getContentView(name, data) {
      const title_detail = SCREEN_WIDTH / 2;

      return(
         <View style={styles.categoryWrapperView}>
            <View style={{ width: SCREEN_WIDTH }}>
               <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={[styles.categoryNameView, { width: title_detail }]}>{name.toUpperCase()}</Text>
                  <TouchableHighlight
                     onPress={() => this.props.navigation.navigate('category', { name: name })}
                     underlayColor='transparent'
                     activeOpacity={6}
                  >
                     <Text style={{ width: title_detail, textAlign: 'right', paddingRight: 20, color: SecondColor }}>Lihat Semua</Text>
                  </TouchableHighlight>
               </View>
            </View>

            <ScrollView
               showsHorizontalScrollIndicator={false}
               horizontal={true}
               style={{ paddingLeft: 20 }}
            >
               {data.map((row, index) => {
                  return(
                     <TouchableHighlight
                        key={row.id}
                        onPress={() => this.props.navigation.navigate('detail', { id: row.id, name: row.title })}
                        underlayColor="white"
                     >
                        <View
                           style={styles.categoryView}
                        >
                           <Image
                              source={{ uri: row.image }}
                              style={[styles.categoryImageView, { borderRadius: 8 }]}
                           />
                           <Text style={[styles.categoryTitleView, { color: SecondColor }]}>{row.title}</Text>
                           <Text style={styles.categoryDescriptionView}>{row.description}</Text>
                        </View>
                     </TouchableHighlight>
                  );
               })}
            </ScrollView>
         </View>
      );
   }

   // Get seafood data
   getSeafoodData() {
      if (this.state.seafood.result) {
         return this.getContentView('Seafood', this.state.seafood.result);
      }
   }

   getLocalRestaurantData() {
      if (this.state.local.result) {
         return this.getContentView('Local Restaurants', this.state.local.result);
      }
   }

   render() {
      const getStatusBar = Platform.OS === 'android' ? (
         <StatusBar translucent={false} barStyle="default" />
      ) : (
         <StatusBar translucent={false} barStyle="light-content" />
      );

      if (!this.state.isReady) {
         return <Spinner
                  visible={true}
                  textContent={"Loading..."}
                  textStyle={{color: '#FFF'}}
                  cancellable={false}
                  animation={'fade'}
                  overlayColor={"rgba(0,0,0,1)"}
               />;
      }

      return(
         <View>
            {getStatusBar}
            <View style={styles.container}>
               <ScrollView
                  style={styles.content}
                  showsVerticalScrollIndicator={false}
               >
                  <View style={styles.featured}>
                     {this.getFeaturedData()}
                  </View>

                  {/* Show Seafood Category */}
                  <View>{this.getSeafoodData()}</View>
                  {/* Show Local Restaurants Category */}
                  <View>{this.getLocalRestaurantData()}</View>
               </ScrollView>
            </View>
         </View>
      );
   }
}

const styles = {
   container: {
      backgroundColor: "#FFF",
      width: SCREEN_WIDTH,
      height: DEVICE_HEIGHT
   },
   content: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: SCREEN_WIDTH,
      height: DEVICE_HEIGHT - 130
   },
   featured: {
      position: 'relative',
      width: SCREEN_WIDTH,
      height: (DEVICE_HEIGHT / 2) - 50,
      top: 0,
      left: 0,
      backgroundColor: "#000"
   },
   categoryWrapperView: {
      paddingTop: 20,
      paddingBottom: 20
   },
   categoryNameView: {
      fontSize: SCREEN_WIDTH / 24,
      fontWeight: 'bold',
      color: 'grey',
      paddingBottom: 15,
      paddingLeft: 20
   },
   categoryView: {
      flex: 1,
      width: SCREEN_WIDTH - 50,
      paddingRight: 10
   },
   categoryImageView: {
      width: SCREEN_WIDTH - 90,
      height: SCREEN_WIDTH / 2
   },
   categoryTitleView: {
      fontSize: (SCREEN_WIDTH / 12) - 5,
      fontWeight: 'bold',
      paddingTop: 5,
      paddingBottom: 5,
      fontFamily: 'Roboto-Medium'
   },
   categoryDescriptionView: {
      fontFamily: 'Roboto-Medium',
      width: SCREEN_WIDTH - 70
   }
}

export default ExploreScreen;
