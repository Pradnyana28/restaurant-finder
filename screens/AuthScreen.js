import React, { Component } from 'react';
import { View, Text, AsyncStorage, Dimensions, Image, TouchableHighlight } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import { Constants } from 'expo';
import * as actions from '../actions';

import { FirstColor } from '../components';
import Images from '@assets/images';
import { SERVER_URL, APP_ID } from 'react-native-dotenv';

// display
import { MainColor, SecondColor, Blue } from '../components/Colors';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class AuthScreen extends Component {
   componentDidMount() {
      this.onAuthComplete(this.props);
   }

   componentWillReceiveProps(nextProps) {
      this.onAuthComplete(nextProps);
   }

   onAuthComplete(props) {
      if (props.token) {
         AsyncStorage.getItem('fb_data')
            .then(req => JSON.parse(req))
            .then(json => {
              // If data in json is exists
              if (json !== null) {
                  //  Save token to server
                  axios.post(SERVER_URL + "?p=login", {
                    appId: APP_ID,
                    email: json.email,
                    token: props.token,
                    device: Constants.deviceName
                  })
                    .then(response => {
                      if (response.data.success == true) {
                        this.props.navigation.navigate('explore');
                      } else {
                        alert(response.data.result);
                        AsyncStorage.removeItem('fb_token');
                      }
                    })
                    .catch(error => {
                      alert("We can't connect to server!");
                      AsyncStorage.removeItem('fb_token');
                    });
              }
            });
      }
   }

   render() {
      return(
         <View style={styles.container}>
            <View style={styles.logoWrapper}>
               <Image source={Images.welcome} />
            </View>

            <View style={styles.fbWrapper}>
               <Text style={styles.title}>Kuliner Nusantara</Text>
               <SocialIcon
                 title='Masuk dengan Facebook'
                 button
                 type='facebook'
                 style={{ width: (SCREEN_WIDTH / 2) + (SCREEN_WIDTH / 4) }}
                 onPress={() => this.props.facebookLogin()}
               />
               
               <TouchableHighlight 
                 style={{ marginTop: 40 }}
                 onPress={() => this.props.navigation.navigate('explore')}
                 underlayColor="rgba(255,255,255,0.3)"
               >
                  <Text style={{ textAlign: 'center', color: '#fff' }}>Lanjutkan Tanpa Login</Text>
               </TouchableHighlight>
            </View>

            <View style={styles.copyright}>
               <Text style={{ color: FirstColor, opacity: 0.3 }}>Made with love by @kadekpradnyana</Text>
            </View>
         </View>
      );
   }
}

const styles = {
   container: {
      paddingTop: 25,
      backgroundColor: SecondColor,
      height: DEVICE_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center'
   },
   logoWrapper: {
      height: DEVICE_HEIGHT / 2,
      width: SCREEN_WIDTH,
      position: 'absolute',
      top: 80,
      alignItems: "center",
      marginBottom: 40
   },
   fbWrapper: {
      marginTop: 40,
      width: SCREEN_WIDTH,
      alignItems: "center"
   },
   title: {
      fontSize: SCREEN_WIDTH / 12,
      color: "#FFFFFF",
      fontWeight: 'bold',
      marginTop: 30,
      marginBottom: 50
   },
   copyright: {
      position: 'absolute',
      bottom: 30,
      width: SCREEN_WIDTH,
      height: 30,
      alignItems: 'center'
   }
}

function mapStateToProps({ auth }) {
   return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
