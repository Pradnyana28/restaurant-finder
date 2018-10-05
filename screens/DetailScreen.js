import React, { Component } from 'react';
import { ScrollView, View, Text, Platform, Dimensions, Animated, Linking } from 'react-native';

import { Icon, Button, List, ListItem } from 'react-native-elements';
import { MainColor, SecondColor } from '../components';

import axios from 'axios';
import Carousel from '../components/Carousel';
import { TabViewAnimated, TabViewPagerScroll, TabViewPagerPan, TabBar } from 'react-native-tab-view';
import Spinner from '../components/KNSpinner';
import getDirections from 'react-native-google-maps-directions';

import { SERVER_URL, PROJECT_NAME } from 'react-native-dotenv';

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
      tabBarLabel: 'Explore',
      headerStyle: {
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
         destination: {
           latitude: Number(latitude),
           longitude: Number(longitude)
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

    renderRestoSocials(data) {
        if (data) {
          return(
            <View style={[styles.sectionWrapper, { marginTop: 15 }]}>
                <View style={{ flexDirection: 'row' }}>
                  {data.map((social, index) => {
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
          );
        }
    }

    renderNoDataView(title, description) {
      return(
        <View style={styles.emptyView}>
           <Icon
              name="frown-o"
              type="font-awesome"
              color='#ccc'
           />
           <Text h2 style={[styles.alignCenter, { fontSize: SCREEN_WIDTH / 18, fontWeight: 'bold', paddingVertical: 10, color: '#ccc' }]}>{title}</Text>
           <Text style={[styles.alignCenter, { fontWeight: 'bold', color: '#ccc' }]}>{description}</Text>
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
                      {this.state.detail.result.data.map((row) => {
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
                                {this.renderRestoSocials(row.socials)}
                            </View>
                          );
                      })}
                    </View>
                );
              }
          case 'menu':
              if (this.state.detail.result) {
                return this.state.detail.result.data.map((row) => {
                  if (row.menus_detail != '') {
                      return(
                        <List>
                          {row.menus_detail.map((menu, index) => {
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
                          })}
                        </List>
                      );
                  }
                  
                  return this.renderNoDataView('Tidak Ada Menu', 'Untuk saat ini tidak ada menu yang bisa ditampilkan');
                })
              }
          case 'review':
              return this.renderNoDataView('Tidak Ada Ulasan', 'Untuk saat ini tidak ada ulasan yang bisa ditampilkan');
          default:
              return null;
      }
    };
    _renderPager = (props) => {
      return (Platform.OS === 'ios') ? <TabViewPagerScroll {...props} /> : <TabViewPagerPan   {...props} />
    };

    streamRestaurantData() {
      return axios.get(SERVER_URL, {
         params: {
            p: 'restaurants',
            type: 'get',
            value:  this.state.id_restaurant
         }
      });
    }

    streamImagesData() {
      return axios.get(SERVER_URL, {
         params: {
            p: 'restaurants',
            type: 'images',
            value:  this.state.id_restaurant
         }
      })
    }

    getRestaurantImages() {
      if (this.state.images.result.images) {
         return(
            <Carousel
               data={this.state.images.result.images}
               showIndicator={false}
            />
         );
      }

      return <View />;
    }

   render() {
      if (!this.state.isReady) {
         return <Spinner />;
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
