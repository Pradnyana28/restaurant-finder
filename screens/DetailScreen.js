import React, { Component } from 'react';
import { ScrollView, View, Text, Platform, Dimensions, Animated, RefreshControl, TouchableHighlight, Linking } from 'react-native';

import { Icon, Button, List, ListItem } from 'react-native-elements';
import { MainColor, SecondColor, ThirdColor, FourthColor } from '../components';

import { Font } from 'expo';
import axios from 'axios';
import Image from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';
import Slideshow from 'react-native-slideshow';
import Carousel from '../components/Carousel';
import { TabViewAnimated, TabViewPagerScroll, TabViewPagerPan, TabBar, SceneMap } from 'react-native-tab-view';
import Spinner from 'react-native-loading-spinner-overlay';
import getDirections from 'react-native-google-maps-directions';

import { TabStyles } from '../styles';

const { width: SCREEN_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

class DetailScreen extends Component {
   state = {
      detail: [],
      images: [],
      scroll: new Animated.Value(0),
      imageLoading: false,
      id_restaurant: this.props.navigation.state.params.id,
      index: 0,
      routes: [
         { key: 'info', title: 'Info' },
         { key: 'menu', title: 'Menu' },
         { key: 'review', title: 'Ulasan' }
      ],
      isReady: false
   };

   static navigationOptions = ({ navigation }) => ({
      title: navigation.state.params.name,
      headerStyle: {
         marginTop: (Platform.OS === 'android') ? 24 : 0,
         backgroundColor: MainColor
      },
      headerTitleStyle: {
         color: 'white'
      },
      headerTintColor: "white",
      tabBarIcon: ({ tintColor }) => (
         <Icon
            name="compass"
            type="entypo"
            color={MainColor}
         />
      )
   });

   async componentWillMount() {
      /**
       * Get all List
       * @param response to get a http response
       */
      await axios.all([this.streamRestaurantData(), this.streamImagesData()])
         .then(axios.spread((detail, images) => {
            this.setState({ detail: detail.data, images: images.data });
         }));

      this.setState({ isReady: true });
   }

   handleGetDirections = (latitude, longitude) => {
      const data = {
         source: {
           latitude: -8.627666,
           longitude: 115.239225
         },
         destination: {
           latitude: latitude,
           longitude: longitude
         },
         params: [
           {
             key: "dirflg",
             value: "c"
           }
         ]
      };

      getDirections(data);
   }

   renderListView(title, data, icon) {
      const icons = icon ? <Icon name='check' /> : null;
      return(
         <View style={[styles.sectionWrapper, { marginTop: 15 }]}>
            <Text h4 style={{ color: '#d3d3d3' }}>{title.toUpperCase()}</Text>
            <View style={{ marginTop: 10 }}>
               {data.map((row) => {
                  return(
                     <View key={row} style={{ flexDirection: 'row' }}>
                        {icons}
                        <Text style={{ flex: 1, paddingLeft: 10, paddingTop: 3 }}>{row}</Text>
                     </View>
                  );
               })}
            </View>
         </View>
      );
   }

   _handleIndexChange = index => this.setState({ index });
   _renderHeader = props => <TabBar style={{ backgroundColor: MainColor }} {...props} />
   _renderScene = ({ route }) => {
      switch (route.key) {
         case 'info':
            if (this.state.detail.result) {
               return(
                  <View style={[TabStyles.tabContainer, TabStyles.tabView]}>
                     {this.state.detail.result.map((row) => {
                        return(
                           <View key={row.id} style={{ flex: 1 }}>
                              <View style={styles.sectionWrapper}>
                                 <View>
                                    <Text h4 style={{ color: '#d3d3d3' }}>Alamat</Text>
                                    <Text>{row.address}</Text>
                                    <Text>{row.city}</Text>
                                    <Text>{row.zip}</Text>
                                 </View>

                                 <View style={{ marginTop: 10 }}>
                                    <Text h4 style={{ color: '#d3d3d3' }}>Jam Buka</Text>
                                    {row.hours.map((hour) => {
                                       return(
                                          <Text key={hour}>{hour}</Text>
                                       );
                                    })}
                                 </View>

                                 <View style={{ marginTop: 10 }}>
                                    <Text h4 style={{ color: '#d3d3d3' }}>Kategori</Text>
                                    <Text>{row.category}</Text>
                                 </View>
                              </View>

                              <View style={{ marginVertical: 10 }}>
                                 <Button
                                    backgroundColor={SecondColor}
                                    iconLeft
                                    icon={{ name: 'map' }}
                                    borderRadius={4}
                                    title="Tunjukkan Arah"
                                    onPress={this.handleGetDirections.bind(this, row.location.latitude, row.location.longitude)}
                                 />
                              </View>

                              {this.renderListView("Fitur", row.features, true)}
                              {this.renderListView("Pilihan Penyajian", row.dining_options, true)}
                              {this.renderListView("Aneka Makanan", row.menus, false)}
                              {this.renderListView("Aneka Minuman", row.drinks, false)}

                              <View style={[styles.sectionWrapper, { marginTop: 15 }]}>
                                 <View style={{ flexDirection: 'row' }}>
                                    {row.socials.map((social, index) => {
                                       return(
                                          <View
                                             key={index}
                                             style={{ marginHorizontal: 5, paddingVertical: 10, paddingHorizontal: 10 }}
                                          >
                                             <Icon name={social.icon} type="font-awesome" onPress={() => Linking.openURL(social.link)} />
                                          </View>
                                       );
                                    })}
                                 </View>
                              </View>
                           </View>
                        );
                     })}
                  </View>
               );
            }
         case 'menu':
            if (this.state.detail.result) {
               return(
                  <List>
                     {this.state.detail.result.map((row) => {
                        return row.menus_detail.map((menu, index) => {
                           return(
                              <ListItem
                                 key={index}
                                 title={menu.name}
                                 subtitle={menu.ingredients}
                                 hideChevron={true}
                                 rightTitle={`Rp.${menu.price}`}
                                 rightTitleStyle={{ color: SecondColor }}
                              />
                           );
                        });
                     })}
                  </List>
               );
            }
         case 'review':
            return(
               <View style={styles.emptyView}>
                  <Icon
                     name="frown-o"
                     type="font-awesome"
                     color='#ccc'
                  />
                  <Text h2 style={[styles.alignCenter, { fontSize: SCREEN_WIDTH / 18, fontWeight: 'bold', paddingVertical: 10, color: '#ccc' }]}>Tidak Ada Ulasan</Text>
                  <Text style={[styles.alignCenter, { fontWeight: 'bold', color: '#ccc' }]}>Untuk saat ini tidak ada ulasan yang bisa ditampilkan</Text>
               </View>
            );
         default:
            return null;
      }
   };
   _renderPager = (props) => {
      return (Platform.OS === 'ios') ? <TabViewPagerScroll {...props} /> : <TabViewPagerPan   {...props} />
   };

   streamRestaurantData() {
      return axios.get('http://kuliner.nusapenidaislands.com/request', {
         params: {
            p: 'restaurants',
            type: 'get',
            value:  this.state.id_restaurant
         }
      });
   }

   streamImagesData() {
      return axios.get('http://kuliner.nusapenidaislands.com/request', {
         params: {
            p: 'restaurants',
            type: 'images',
            value:  this.state.id_restaurant
         }
      })
   }

   getRestaurantImages() {
      const position = Animated.divide(this.state.scroll, SCREEN_WIDTH);

      if (this.state.images.result) {
         return(
            <Carousel
               data={this.state.images.result.images}
               showIndicator={false}
               navigation={this.props.navigation}
            />
         );
      }
   }

   render() {
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
         <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
         >
            <View>
               {this.getRestaurantImages()}
            </View>

            <TabViewAnimated
               navigationState={this.state}
               renderScene={this._renderScene}
               renderHeader={this._renderHeader}
               onIndexChange={this._handleIndexChange}
               renderPager={this._renderPager}
            />
         </ScrollView>
      );
   }
}

const styles = {
   container: {
      flex: 1
   },
   imageView: {
      width: SCREEN_WIDTH,
      height: (SCREEN_WIDTH / 2) + 40
   },
   indicator: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 10
   },
   buttonGridWrapper: {
      flex: 1,
      flexDirection: 'row'
   },
   gridRow: {
      width: SCREEN_WIDTH,
      paddingVertical: 10
   },
   sectionWrapper: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderBottomColor: '#d3d3d3',
      borderBottomWidth: 0.7,
      borderTopColor: '#d3d3d3',
      borderTopWidth: 0.7
   },
   emptyView: {
      paddingVertical: 20,
      alignItems: 'center'
   },
   alignCenter: {
      textAlign: 'center'
   }
}

export default DetailScreen;
