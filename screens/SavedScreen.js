import React, { Component } from 'react';
import { View, Text, Dimensions, AsyncStorage, ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { MainColor, SecondColor } from '../components';
import axios from 'axios';
import { SERVER_URL } from 'react-native-dotenv';

import KNCard from '../components/KNCard';
import Spinner from '../components/KNSpinner';
import FooterEnd from '../components/FooterEnd';

const { width: SCREEN_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

class SavedScreen extends Component {
      state = {
            results: {},
            newResults: {},
            isReady: false,
            loading: false,
            loaded: 0,
            start: 0,
            token: '',
            email: ''
      }

      static navigationOptions = {
            title: 'Favorit',
            tabBarLabel: 'Favorit',
            headerStyle: {
                  backgroundColor: MainColor
            },
            headerTitleStyle: {
                  color: 'white'
            },
            tabBarIcon: ({ tintColor }) => (
                  <Icon
                        name="heart"
                        type="font-awesome"
                        color={tintColor}
                  />
            )
      }

      componentWillMount() {
            AsyncStorage.getItem('fb_token', (err, result) => {
                  this.setState({ token: result });
            });

            AsyncStorage.getItem('fb_data')
            .then(req => JSON.parse(req))
            .then(json => {
                  if (json !== null) {
                        axios.get(SERVER_URL, {
                              params: {
                                    p: 'restaurants',
                                    type: 'favorites',
                                    email: json.email,
                                    token: this.state.token
                              }
                        }).then(response => {
                              this.setState({
                                    results: response.data,
                                    email: json.email
                              });
                        })
                        .catch(error => {
                              alert("We can't connect to server!");
                        });
                  }
            });

            if (Object.keys(this.state.results).length > 0) {
                  console.log(this.state.results);
                  // this.setState({ loaded: this.state.results.result.data.length });
            }

            this.setState({ isReady: true });
      }
      
      renderList() {
            if (Object.keys(this.state.results).length > 0) {
                  return(
                        <View>
                        {this.state.results.result.data.map((row) => {
                              return(
                                    <KNCard 
                                          key={row.id}
                                          id={row.id}
                                          title={row.title}
                                          image={row.image}
                                          description={row.description}
                                          address={row.address}
                                          checked={true}
                                          onPress={() => this.props.navigation.navigate('detail', { id: row.id, name: row.title })}
                                    />
                              );
                        })}
                        </View>
                  );
            }

            return <View>
                        <Text>Currently we can't collect data from your Favourites.</Text>
                        <Text>Explore more and saved the restaurants to your Favourites lists.</Text>
                   </View>
      }

      async loadMoreRequest() {
            const { loaded, start, results, email } = this.state;

            //  Get more results from server
            if (email != '') {
                  await axios.get(SERVER_URL, {
                        params: {
                              p: 'restaurants',
                              type: 'favorites',
                              email: this.state.email,
                              token: this.state.token,
                              start: loaded
                        }
                  }).then(response => {
                        this.setState({
                              newResults: response.data,
                              loading: !this.state.loading
                        });
                  })
                  .catch(error => {
                        alert("We can't connect to server!");
                  });
      
                  this.getAnAction();
            }
      }
      
      getAnAction() {
            const { results } = this.state;

            if (this.state.newResults) {
                  let oldData = results.result.data;
                  let newData = this.state.newResults.result.data;

                  // Push new array
                  let newResults = oldData.concat(newData);

                  this.setState({ 
                        results: {
                              result: {
                              data: newResults
                              }
                        },
                        loaded: results.result.data.length 
                  });
            }
      }
      
      loadMore() {
            const { results } = this.state;

            if (Object.keys(this.state.results).length > 0) {
                  this.setState({ loading: !this.state.loading });
                  // Request new data
                  this.loadMoreRequest();
            }
      }
      
      loadMoreButtonToggle() {
            const { results } = this.state;

            if (Object.keys(this.state.results).length > 0) {
                  if (this.state.loaded < results.result.total) {
                        return(
                              <View
                                    style={{ marginVertical: 20 }}
                              >
                                    <Button 
                                          raised
                                          title="Muat Lagi"
                                          loading={this.state.loading}
                                          backgroundColor={SecondColor}
                                          onPress={() => this.loadMore()}
                                    />
                              </View>
                        );
                  }
            }

            return <FooterEnd />;
      }

      render() {
            if (!this.state.isReady) {
                return <Spinner />;
            }
    
            return(
                  <View style={styles.container}>
                        <ScrollView style={styles.viewWrapper} ref="scrollView">
                              {this.renderList()}

                              {/* Load more button */}
                              {this.loadMoreButtonToggle()}
                        </ScrollView>
                  </View>
            );
      }
}

const styles = {
      container: {
            flex: 1
      },
      viewWrapper: {
            width: SCREEN_WIDTH,
            height: DEVICE_HEIGHT,
            backgroundColor: '#ededed'
      }
}

export default SavedScreen;
